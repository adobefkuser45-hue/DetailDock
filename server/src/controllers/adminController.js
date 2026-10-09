import mongoose from 'mongoose';
import { Booking } from '../models/Booking.js';
import { StudioSetting } from '../models/StudioSetting.js';
import { normalizeDateRange } from '../services/availabilityService.js';
import { generateCommunicationLinks, buildCommunicationMessage } from '../services/communicationService.js';
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

