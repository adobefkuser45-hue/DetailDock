import mongoose from 'mongoose';
import { Booking } from '../models/Booking.js';
import { StudioSetting } from '../models/StudioSetting.js';
import { ServicePackage } from '../models/ServicePackage.js';
import { Addon } from '../models/Addon.js';
import { VehicleCategory } from '../models/VehicleCategory.js';
import { DEFAULT_CATEGORIES, DEFAULT_PACKAGES, DEFAULT_ADDONS } from '../config/defaultCatalog.js';
import { normalizeDateRange } from '../services/availabilityService.js';
import { generateCommunicationLinks, buildCommunicationMessage } from '../services/communicationService.js';
import { warrantyService } from '../services/warrantyService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

const VALID_STATUSES = ['Pending', 'Confirmed', 'In Bay', 'Ready', 'Completed', 'Cancelled'];

/**
 * @desc Get all bookings with filtering, search, pagination, and status badge counts
 * @route GET /api/v1/admin/bookings
 * @access Admin
 */
export const getAllBookings = asyncHandler(async (req, res) => {
  const {
    status,
    date,
    search,
    bay,
    page = 1,
    limit = 20,
    sortBy = 'scheduledDate',
    sortOrder = 'asc'
  } = req.query;

  const query = {};

  // Status Filter
  if (status && status !== 'all' && VALID_STATUSES.includes(status)) {
    query.status = status;
  }

  // Date Filter
  if (date) {
    try {
      const { startOfDay, endOfDay } = normalizeDateRange(date);
      query.scheduledDate = { $gte: startOfDay, $lte: endOfDay };
    } catch {
      // Ignore if invalid date string passed in search
    }
  }

  // Bay Number Filter
  if (bay) {
    query.bayNumber = Number(bay);
  }

  // Multi-field Search Filter
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { bookingCode: searchRegex },
      { 'customer.name': searchRegex },
      { 'customer.email': searchRegex },
      { 'customer.phone': searchRegex },
      { 'vehicle.licensePlate': searchRegex },
      { 'vehicle.model': searchRegex },
      { 'vehicle.make': searchRegex }
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sortOptions = { [sortBy]: sortDirection, scheduledTimeSlot: 1 };

  // Fetch paginated bookings and total matching count
  const [bookings, totalCount] = await Promise.all([
    Booking.find(query).sort(sortOptions).skip(skip).limit(limitNum).lean(),
    Booking.countDocuments(query)
  ]);

  // Aggregate global status counts for Kanban pipeline tabs
  const statusCountsAggregate = await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const statusCounts = {
    all: 0,
    Pending: 0,
    Confirmed: 0,
    'In Bay': 0,
    Ready: 0,
    Completed: 0,
    Cancelled: 0
  };

  statusCountsAggregate.forEach((item) => {
    if (item._id && statusCounts[item._id] !== undefined) {
      statusCounts[item._id] = item.count;
      statusCounts.all += item.count;
    }
  });

  res.status(200).json({
    success: true,
    count: bookings.length,
    total: totalCount,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum) || 1,
    statusCounts,
    data: bookings,
    message: 'Bookings retrieved successfully for admin dashboard.'
  });
});

/**
 * @desc Get single booking by ID or bookingCode
 * @route GET /api/v1/admin/bookings/:id
 * @access Admin
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let query = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query._id = id;
  } else {
    query.bookingCode = new RegExp(`^${id.trim()}$`, 'i');
  }

  const booking = await Booking.findOne(query).lean();
  if (!booking) {
    throw new AppError(`Booking with identifier '${id}' was not found.`, 404, 'BOOKING_NOT_FOUND');
  }

  res.status(200).json({
    success: true,
    data: booking,
    message: 'Booking details retrieved successfully.'
  });
});

/**
 * @desc Update booking status, notes, or assigned bay (Kanban transition)
 * @route PATCH /api/v1/admin/bookings/:id/status
 * @access Admin
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, note, adminNotes, bayNumber, cancellationReason } = req.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    throw new AppError(
      `Invalid status provided. Must be one of: ${VALID_STATUSES.join(', ')}.`,
      400,
      'INVALID_STATUS'
    );
  }

  let query = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query._id = id;
  } else {
    query.bookingCode = new RegExp(`^${id.trim()}$`, 'i');
  }

  const booking = await Booking.findOne(query);
  if (!booking) {
    throw new AppError(`Booking with identifier '${id}' was not found.`, 404, 'BOOKING_NOT_FOUND');
  }

  const previousStatus = booking.status;
  booking.status = status;

  if (adminNotes !== undefined) {
    booking.adminNotes = adminNotes;
  }

  if (bayNumber !== undefined && [1, 2].includes(Number(bayNumber))) {
    booking.bayNumber = Number(bayNumber);
  }

  if (status === 'Cancelled' && cancellationReason) {
    booking.cancellationReason = cancellationReason;
  }

  // Handle payment status and settlement updates
  if (req.body.paymentStatus !== undefined) {
    if (['unpaid', 'deposit_paid', 'paid', 'refunded', 'waived'].includes(req.body.paymentStatus)) {
      booking.payment.status = req.body.paymentStatus;
      if (req.body.paymentStatus === 'paid') {
        booking.payment.paidAt = new Date();
        if (!booking.payment.amountPaid || booking.payment.amountPaid === 0) {
          booking.payment.amountPaid = booking.totalPrice;
        }
      }
    }
  }

  if (req.body.paymentMethod !== undefined) {
    booking.payment.method = req.body.paymentMethod;
  }

  if (req.body.amountPaid !== undefined) {
    booking.payment.amountPaid = Number(req.body.amountPaid);
  }

  // Record audit history entry
  booking.statusHistory.push({
    status: status,
    changedAt: new Date(),
    changedBy: req.user?.name || 'Studio Administrator',
    note: note || `Status transitioned from ${previousStatus} to ${status}.`
  });

  // Automatically record communication dispatch if status transitioned
  if (previousStatus !== status) {
    if (!booking.communicationsLog) booking.communicationsLog = [];
    const autoChannel = (status === 'Ready' || status === 'Completed') ? 'whatsapp' : 'sms';
    booking.communicationsLog.push({
      channel: autoChannel,
      recipient: booking.customer?.phone || booking.customer?.email,
      message: `Status transitioned to '${status}' in Cleanroom Bay ${booking.bayNumber}. Telemetry updated.`,
      dispatchedAt: new Date(),
      status: 'dispatched'
    });
  }

  await booking.save();

  res.status(200).json({
    success: true,
    data: booking,
    message: `Booking ${booking.bookingCode} status successfully updated to ${status}.`
  });
});

/**
 * @desc Get business dashboard overview statistics
 * @route GET /api/v1/admin/dashboard/stats
 * @access Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const { startOfDay, endOfDay } = normalizeDateRange(todayStr);

  const [
    totalBookings,
    todayBookings,
    activeBookings,
    revenueData,
    recentBookings
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ scheduledDate: { $gte: startOfDay, $lte: endOfDay } }),
    Booking.countDocuments({ status: { $in: ['Pending', 'Confirmed', 'In Bay'] } }),
    Booking.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]),
    Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('bookingCode customer.name vehicle.make vehicle.model scheduledDate scheduledTimeSlot totalPrice status bayNumber')
      .lean()
  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;

  res.status(200).json({
    success: true,
    data: {
      metrics: {
        totalBookings,
        todayBookingsCount: todayBookings,
        activeJobsCount: activeBookings,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        currency: 'USD'
      },
      recentBookings
    },
    message: 'Dashboard statistics retrieved successfully.'
  });
});

/**
 * @desc Update studio configuration (bays, hours, blackout dates)
 * @route PUT /api/v1/admin/settings
 * @access Admin
 */
export const updateStudioSettings = asyncHandler(async (req, res) => {
  const updateData = req.body;

  let settings = await StudioSetting.findOne();
  if (!settings) {
    settings = new StudioSetting(updateData);
  } else {
    Object.assign(settings, updateData);
  }

  await settings.save();

  res.status(200).json({
    success: true,
    data: settings,
    message: 'Studio settings updated successfully.'
  });
});

/**
 * @desc Get current studio configuration
 * @route GET /api/v1/admin/settings
 * @access Admin
 */
export const getStudioSettings = asyncHandler(async (req, res) => {
  let settings = await StudioSetting.findOne();
  if (!settings) {
    settings = await StudioSetting.create({
      studioName: 'DetailDock Luxury Atelier',
      contactPhone: '+1 (555) 348-2450',
      contactEmail: 'concierge@detaildock.com',
      address: {
        street: '1440 Velocity Way, Suite 100',
        city: 'Austin',
        state: 'TX',
        zip: '78701'
      },
      operatingHours: {
        openTime: '09:00 AM',
        closeTime: '06:00 PM',
        slotIntervalMinutes: 120
      },
      maxBayCapacity: 2
    });
  }

  res.status(200).json({
    success: true,
    data: settings,
    message: 'Studio settings retrieved successfully.'
  });
});

/**
 * @desc Generate real-time WhatsApp & SMS communication dispatch links for a booking
 * @route GET /api/v1/admin/bookings/:code/communication-links
 * @access Admin
 */
export const getBookingCommunicationLinks = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const booking = await Booking.findOne({ bookingCode: code.toUpperCase() });
  if (!booking) {
    throw new AppError(`Booking ${code} not found.`, 404, 'BOOKING_NOT_FOUND');
  }

  const studioSettings = await StudioSetting.findOne();
  const clientUrl = process.env.CLIENT_URL || 'https://client-mauve-zeta-13.vercel.app';
  const links = generateCommunicationLinks(booking, studioSettings, clientUrl);

  res.status(200).json({
    success: true,
    data: links,
    message: 'Communication links generated successfully.'
  });
});

/**
 * @desc Record a communication dispatch in booking history
 * @route POST /api/v1/admin/bookings/:code/dispatch-message
 * @access Admin
 */
export const recordDispatchedMessage = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const { channel, message, recipient } = req.body;

  if (!channel || !message) {
    throw new AppError('Channel and message text are required.', 400, 'MISSING_PAYLOAD');
  }

  const booking = await Booking.findOne({ bookingCode: code.toUpperCase() });
  if (!booking) {
    throw new AppError(`Booking ${code} not found.`, 404, 'BOOKING_NOT_FOUND');
  }

  const logEntry = {
    channel,
    recipient: recipient || booking.customer?.phone || booking.customer?.email,
    message,
    dispatchedAt: new Date(),
    status: 'dispatched'
  };

  if (!booking.communicationsLog) {
    booking.communicationsLog = [];
  }
  booking.communicationsLog.push(logEntry);
  await booking.save();

  res.status(200).json({
    success: true,
    data: logEntry,
    message: `Message dispatched via ${channel} and recorded in audit log.`
  });
});

/**
 * @desc Get complete service catalog (packages, addons, vehicle categories)
 * @route GET /api/v1/admin/catalog
 * @access Admin
 */
export const getCatalog = asyncHandler(async (req, res) => {
  const [packages, addons, categories] = await Promise.all([
    ServicePackage.find().sort({ displayOrder: 1, createdAt: 1 }),
    Addon.find().sort({ displayOrder: 1, createdAt: 1 }),
    VehicleCategory.find().sort({ displayOrder: 1, createdAt: 1 })
  ]);

  res.status(200).json({
    success: true,
    data: {
      packages,
      addons,
      categories
    },
    message: 'Catalog retrieved successfully.'
  });
});

/**
 * @desc Create new service package
 * @route POST /api/v1/admin/catalog/packages
 * @access Admin
 */
export const createPackage = asyncHandler(async (req, res) => {
  const { title, tagline, description, basePrice, baseDurationMinutes, category, includedFeatures, isPopular, displayOrder } = req.body;
  if (!title || basePrice === undefined || !baseDurationMinutes) {
    throw new AppError('Package title, base price, and base duration are required.', 400, 'MISSING_PACKAGE_FIELDS');
  }

  const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const existing = await ServicePackage.findOne({ slug });
  if (existing) {
    throw new AppError(`A package with slug '${slug}' already exists.`, 409, 'SLUG_CONFLICT');
  }

  const newPkg = await ServicePackage.create({
    title,
    slug,
    tagline: tagline || '',
    description: description || title,
    basePrice: Number(basePrice),
    baseDurationMinutes: Number(baseDurationMinutes),
    category: category || 'full',
    includedFeatures: Array.isArray(includedFeatures) ? includedFeatures : (includedFeatures ? [includedFeatures] : []),
    isPopular: !!isPopular,
    displayOrder: displayOrder !== undefined ? Number(displayOrder) : 10,
    isActive: true
  });

  res.status(201).json({
    success: true,
    data: newPkg,
    message: 'Service package created successfully.'
  });
});

/**
 * @desc Update service package
 * @route PUT /api/v1/admin/catalog/packages/:id
 * @access Admin
 */
export const updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  if (updates.basePrice !== undefined) updates.basePrice = Number(updates.basePrice);
  if (updates.baseDurationMinutes !== undefined) updates.baseDurationMinutes = Number(updates.baseDurationMinutes);
  if (updates.displayOrder !== undefined) updates.displayOrder = Number(updates.displayOrder);

  const updatedPkg = await ServicePackage.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!updatedPkg) {
    throw new AppError(`Service package with ID ${id} not found.`, 404, 'PACKAGE_NOT_FOUND');
  }

  res.status(200).json({
    success: true,
    data: updatedPkg,
    message: 'Service package updated successfully.'
  });
});

/**
 * @desc Toggle / Deactivate service package
 * @route DELETE /api/v1/admin/catalog/packages/:id
 * @access Admin
 */
export const deletePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pkg = await ServicePackage.findById(id);
  if (!pkg) {
    throw new AppError(`Service package with ID ${id} not found.`, 404, 'PACKAGE_NOT_FOUND');
  }

  pkg.isActive = !pkg.isActive;
  await pkg.save();

  res.status(200).json({
    success: true,
    data: pkg,
    message: `Package ${pkg.isActive ? 'activated' : 'deactivated'} successfully.`
  });
});

/**
 * @desc Create new add-on
 * @route POST /api/v1/admin/catalog/addons
 * @access Admin
 */
export const createAddon = asyncHandler(async (req, res) => {
  const { title, description, price, durationMinutes, iconName, displayOrder } = req.body;
  if (!title || price === undefined) {
    throw new AppError('Add-on title and price are required.', 400, 'MISSING_ADDON_FIELDS');
  }

  const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const existing = await Addon.findOne({ slug });
  if (existing) {
    throw new AppError(`An add-on with slug '${slug}' already exists.`, 409, 'SLUG_CONFLICT');
  }

  const newAddon = await Addon.create({
    title,
    slug,
    description: description || '',
    price: Number(price),
    durationMinutes: Number(durationMinutes || 30),
    iconName: iconName || 'Sparkles',
    displayOrder: displayOrder !== undefined ? Number(displayOrder) : 10,
    isActive: true
  });

  res.status(201).json({
    success: true,
    data: newAddon,
    message: 'Add-on created successfully.'
  });
});

/**
 * @desc Update add-on
 * @route PUT /api/v1/admin/catalog/addons/:id
 * @access Admin
 */
export const updateAddon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  if (updates.price !== undefined) updates.price = Number(updates.price);
  if (updates.durationMinutes !== undefined) updates.durationMinutes = Number(updates.durationMinutes);

  const updatedAddon = await Addon.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!updatedAddon) {
    throw new AppError(`Add-on with ID ${id} not found.`, 404, 'ADDON_NOT_FOUND');
  }

  res.status(200).json({
    success: true,
    data: updatedAddon,
    message: 'Add-on updated successfully.'
  });
});

/**
 * @desc Toggle / Deactivate add-on
 * @route DELETE /api/v1/admin/catalog/addons/:id
 * @access Admin
 */
export const deleteAddon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const addon = await Addon.findById(id);
  if (!addon) {
    throw new AppError(`Add-on with ID ${id} not found.`, 404, 'ADDON_NOT_FOUND');
  }

  addon.isActive = !addon.isActive;
  await addon.save();

  res.status(200).json({
    success: true,
    data: addon,
    message: `Add-on ${addon.isActive ? 'activated' : 'deactivated'} successfully.`
  });
});

/**
 * @desc Update vehicle category multipliers
 * @route PUT /api/v1/admin/catalog/categories/:id
 * @access Admin
 */
export const updateVehicleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  if (updates.priceMultiplier !== undefined) updates.priceMultiplier = Number(updates.priceMultiplier);
  if (updates.durationMultiplier !== undefined) updates.durationMultiplier = Number(updates.durationMultiplier);

  const updatedCat = await VehicleCategory.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!updatedCat) {
    throw new AppError(`Vehicle category with ID ${id} not found.`, 404, 'CATEGORY_NOT_FOUND');
  }

  res.status(200).json({
    success: true,
    data: updatedCat,
    message: 'Vehicle category updated successfully.'
  });
});

/**
 * @desc Reset catalog to factory defaults
 * @route POST /api/v1/admin/catalog/reset
 * @access Admin
 */
export const resetCatalogToDefaults = asyncHandler(async (req, res) => {
  await Promise.all([
    VehicleCategory.deleteMany({}),
    ServicePackage.deleteMany({}),
    Addon.deleteMany({})
  ]);

  const [categories, packages, addons] = await Promise.all([
    VehicleCategory.insertMany(DEFAULT_CATEGORIES),
    ServicePackage.insertMany(DEFAULT_PACKAGES),
    Addon.insertMany(DEFAULT_ADDONS)
  ]);

  res.status(200).json({
    success: true,
    data: { categories, packages, addons },
    message: 'Service catalog successfully reset to factory defaults.'
  });
});

/**
 * @desc Issue / Regenerate official Ceramic Coating Warranty Certificate
 * @route POST /api/v1/admin/bookings/:id/issue-warranty
 * @access Admin
 */
export const issueWarrantyCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError(`Booking ${id} not found.`, 404, 'BOOKING_NOT_FOUND');
  }

  const certificateNumber = warrantyService.generateCertificateNumber(booking.bookingCode);
  const securityHash = warrantyService.generateSecurityHash(booking);

  booking.warrantyCertificate = {
    certificateNumber,
    issuedAt: new Date(),
    coatingType: req.body.coatingType || '9H Multi-Layer Matrix Nano-Ceramic',
    hardnessRating: req.body.hardnessRating || '9H Pencil Hardness (Certified ISO 15184)',
    warrantyPeriodYears: Number(req.body.warrantyPeriodYears || 3),
    expiresAt: new Date(Date.now() + Number(req.body.warrantyPeriodYears || 3) * 365 * 24 * 60 * 60 * 1000),
    certifiedTechnicianName: req.body.certifiedTechnicianName || 'Marcus Vance (Master Specialist)',
    warrantyStatus: 'Active',
    securityHash
  };

  // Add communication log
  if (!booking.communicationsLog) booking.communicationsLog = [];
  booking.communicationsLog.push({
    channel: 'email',
    recipient: booking.customer.email,
    message: `Official Ceramic Warranty Certificate ${certificateNumber} issued for ${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model}.`,
    dispatchedAt: new Date(),
    status: 'dispatched'
  });

  await booking.save();

  res.status(200).json({
    success: true,
    data: booking.warrantyCertificate,
    message: `Ceramic Warranty Certificate ${certificateNumber} successfully issued!`
  });
});

/**
 * @desc Update Digital Vehicle Inspection (DVI) telemetry
 * @route POST /api/v1/admin/bookings/:id/inspection
 * @access Admin
 */
export const updateInspectionData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError(`Booking ${id} not found.`, 404, 'BOOKING_NOT_FOUND');
  }

  const { intakeInspection, completionInspection } = req.body;

  if (!booking.inspectionData) {
    booking.inspectionData = {};
  }

  if (intakeInspection) {
    booking.inspectionData.intakeInspection = {
      ...(booking.inspectionData.intakeInspection || {}),
      ...intakeInspection,
      inspectedAt: new Date()
    };
  }

  if (completionInspection) {
    booking.inspectionData.completionInspection = {
      ...(booking.inspectionData.completionInspection || {}),
      ...completionInspection,
      completedAt: new Date()
    };
  }

  await booking.save();

  res.status(200).json({
    success: true,
    data: booking.inspectionData,
    message: 'Digital vehicle inspection data saved successfully.'
  });
});

