import { Booking } from '../models/Booking.js';
import { calculatePricing } from '../services/pricingService.js';
import { 
  verifySlotAvailability, 
  normalizeDateRange 
} from '../services/availabilityService.js';
import { 
  generateUniqueBookingCode, 
  maskEmail, 
  maskPhone 
} from '../utils/bookingCode.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { invoiceService } from '../services/invoiceService.js';
import { emailService } from '../services/emailService.js';

const STATUS_PROGRESSION = {
  'Pending': { step: 1, label: 'Appointment Requested', percentage: 20 },
  'Confirmed': { step: 2, label: 'Confirmed & Bay Reserved', percentage: 40 },
  'In Bay': { step: 3, label: 'In Studio Bay — Detailing in Progress', percentage: 60 },
  'Ready': { step: 4, label: 'Quality Inspected & Ready for Pick-Up', percentage: 80 },
  'Completed': { step: 5, label: 'Service Completed & Vehicle Released', percentage: 100 },
  'Cancelled': { step: 0, label: 'Booking Cancelled', percentage: 0 }
};

/**
 * @desc Create new detailing appointment booking
 * @route POST /api/v1/bookings
 * @access Public / Guest
 */
export const createBooking = asyncHandler(async (req, res) => {
  const {
    customer,
    vehicle,
    packageId,
    packageSlug,
    addonIds = [],
    addonSlugs = [],
    scheduledDate,
    scheduledTimeSlot,
    paymentMethod = 'studio_pay',
    notes
  } = req.body;

  // 1. Validate Customer Information
  if (!customer?.name || !customer?.email || !customer?.phone) {
    throw new AppError('Customer full name, email, and phone number are required.', 400, 'INVALID_CUSTOMER_DATA');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customer.email.trim())) {
    throw new AppError('Please provide a valid email address.', 400, 'INVALID_EMAIL_FORMAT');
  }

  // 2. Validate Vehicle Information
  if (!vehicle?.make || !vehicle?.model || !vehicle?.year) {
    throw new AppError('Vehicle make, model, and manufacturing year are required.', 400, 'INVALID_VEHICLE_DATA');
  }

  const currentYear = new Date().getFullYear();
  const vehicleYear = Number(vehicle.year);
  if (isNaN(vehicleYear) || vehicleYear < 1920 || vehicleYear > currentYear + 2) {
    throw new AppError(`Vehicle year must be between 1920 and ${currentYear + 2}.`, 400, 'INVALID_VEHICLE_YEAR');
  }

  const vehicleCategoryIdentifier = vehicle.categorySlug || vehicle.categoryId || vehicle.category;
  if (!vehicleCategoryIdentifier) {
    throw new AppError('Vehicle category classification is required.', 400, 'MISSING_VEHICLE_CATEGORY');
  }

  // 3. Validate Scheduling & Time Slot
  if (!scheduledDate || !scheduledTimeSlot) {
    throw new AppError('Appointment date (scheduledDate) and time slot (scheduledTimeSlot) are required.', 400, 'MISSING_SCHEDULE');
  }

  const { dateStr, startOfDay } = normalizeDateRange(scheduledDate);

  // 4. Verify Bay Slot Availability & Obtain Bay Assignment
  const slotStatus = await verifySlotAvailability(dateStr, scheduledTimeSlot);
  const assignedBay = slotStatus.assignedBayNumber;

  // 5. Authoritatively Calculate Pricing & Snapshot
  const pricingResult = await calculatePricing({
    vehicleCategoryId: vehicle.categoryId,
    vehicleCategorySlug: vehicle.categorySlug || vehicleCategoryIdentifier,
    packageId,
    packageSlug,
    addonIds,
    addonSlugs
  });

  // 6. Generate Unique Tracking Code
  const bookingCode = await generateUniqueBookingCode();

  // 7. Persist Booking Document
  const newBooking = await Booking.create({
    bookingCode,
    customer: {
      userId: req.user?._id || null,
      name: customer.name.trim(),
      email: customer.email.toLowerCase().trim(),
      phone: customer.phone.trim()
    },
    vehicle: {
      make: vehicle.make.trim(),
      model: vehicle.model.trim(),
      year: vehicleYear,
      categoryName: pricingResult.vehicleCategory.name,
      categorySlug: pricingResult.vehicleCategory.slug,
      multiplierApplied: pricingResult.vehicleCategory.priceMultiplier,
      licensePlate: vehicle.licensePlate ? vehicle.licensePlate.trim().toUpperCase() : '',
      paintColor: vehicle.paintColor ? vehicle.paintColor.trim() : ''
    },
    packageSnapshot: {
      packageId: pricingResult.servicePackage.id,
      title: pricingResult.servicePackage.title,
      basePrice: pricingResult.servicePackage.basePrice,
      calculatedPrice: pricingResult.servicePackage.calculatedPrice,
      durationMinutes: pricingResult.servicePackage.durationMinutes
    },
    addonsSnapshot: pricingResult.addons.map((a) => ({
      addonId: a.id,
      title: a.title,
      price: a.price,
      durationMinutes: a.durationMinutes
    })),
    totalPrice: pricingResult.summary.totalPrice,
    totalDurationMinutes: pricingResult.summary.totalDurationMinutes,
    scheduledDate: startOfDay,
    scheduledTimeSlot: scheduledTimeSlot.trim(),
    bayNumber: assignedBay,
    status: 'Pending',
    payment: {
      status: 'unpaid',
      method: paymentMethod || 'studio_pay',
      amountPaid: 0,
      depositAmount: 0
    },
    notes: notes ? notes.trim() : '',
    statusHistory: [
      {
        status: 'Pending',
        changedAt: new Date(),
        changedBy: customer.name.trim(),
        note: `Appointment booking requested online via DetailDock Atelier. Payment option: ${paymentMethod || 'Pay at Studio'}.`
      }
    ]
  });

  // Non-blocking transactional email receipt dispatch
  emailService.sendBookingConfirmationReceipt(newBooking).catch((emailErr) => {
    console.warn(`[BookingController]: Receipt email warning: ${emailErr.message}`);
  });

  res.status(201).json({
    success: true,
    data: {
      bookingCode: newBooking.bookingCode,
      id: newBooking._id,
      status: newBooking.status,
      payment: newBooking.payment,
      assignedBayNumber: newBooking.bayNumber,
      scheduledDate: dateStr,
      scheduledTimeSlot: newBooking.scheduledTimeSlot,
      totalPrice: newBooking.totalPrice,
      totalDurationMinutes: newBooking.totalDurationMinutes,
      formattedDuration: pricingResult.summary.formattedDuration,
      vehicle: {
        make: newBooking.vehicle.make,
        model: newBooking.vehicle.model,
        year: newBooking.vehicle.year,
        category: newBooking.vehicle.categoryName
      },
      packageTitle: newBooking.packageSnapshot.title,
      addonsCount: newBooking.addonsSnapshot.length
    },
    message: `Appointment successfully scheduled! Your tracking code is ${newBooking.bookingCode}.`
  });
});

/**
 * @desc Publicly lookup booking status by tracking code
 * @route GET /api/v1/bookings/track/:code
 * @access Public
 */
export const trackBooking = asyncHandler(async (req, res) => {
  let { code } = req.params;
  if (!code) {
    throw new AppError('Tracking code is required.', 400, 'MISSING_TRACKING_CODE');
  }

  code = code.trim().toUpperCase();
  // Ensure code matches with or without DD- prefix
  const searchPattern = code.startsWith('DD-') ? `^${code}$` : `^(DD-)?${code}$`;

  const booking = await Booking.findOne({
    bookingCode: new RegExp(searchPattern, 'i')
  }).lean();

  if (!booking) {
    throw new AppError(`No detailing appointment found with tracking code '${code}'.`, 404, 'BOOKING_NOT_FOUND');
  }

  const progressionInfo = STATUS_PROGRESSION[booking.status] || {
    step: 1,
    label: booking.status,
    percentage: 10
  };

  const formattedDate = new Date(booking.scheduledDate).toISOString().split('T')[0];

  res.status(200).json({
    success: true,
    data: {
      bookingCode: booking.bookingCode,
      status: booking.status,
      progress: {
        currentStep: progressionInfo.step,
        maxSteps: 5,
        statusLabel: progressionInfo.label,
        percentage: progressionInfo.percentage,
        isCancelled: booking.status === 'Cancelled'
      },
      schedule: {
        date: formattedDate,
        timeSlot: booking.scheduledTimeSlot,
        bayNumber: booking.bayNumber
      },
      customer: {
        name: booking.customer.name,
        maskedEmail: maskEmail(booking.customer.email),
        maskedPhone: maskPhone(booking.customer.phone)
      },
      vehicle: {
        make: booking.vehicle.make,
        model: booking.vehicle.model,
        year: booking.vehicle.year,
        category: booking.vehicle.categoryName,
        paintColor: booking.vehicle.paintColor || 'Not specified',
        licensePlate: booking.vehicle.licensePlate ? '***' + booking.vehicle.licensePlate.slice(-3) : ''
      },
      service: {
        packageTitle: booking.packageSnapshot.title,
        packagePrice: booking.packageSnapshot.calculatedPrice,
        addons: booking.addonsSnapshot.map((a) => ({
          title: a.title,
          price: a.price,
          durationMinutes: a.durationMinutes
        })),
        totalPrice: booking.totalPrice,
        totalDurationMinutes: booking.totalDurationMinutes
      },
      payment: {
        status: booking.payment?.status || 'unpaid',
        method: booking.payment?.method || 'studio_pay',
        amountPaid: booking.payment?.amountPaid || 0,
        depositAmount: booking.payment?.depositAmount || 0,
        paidAt: booking.payment?.paidAt || null
      },
      timeline: booking.statusHistory.map((h) => ({
        status: h.status,
        changedAt: h.changedAt,
        note: h.note || ''
      })),
      createdAt: booking.createdAt
    },
    message: 'Booking details retrieved successfully.'
  });
});

/**
 * @desc Stream vector PDF invoice / official receipt
 * @route GET /api/v1/bookings/:code/invoice
 * @access Public
 */
export const getBookingInvoice = asyncHandler(async (req, res) => {
  let { code } = req.params;
  if (!code) {
    throw new AppError('Booking reference code is required.', 400, 'MISSING_BOOKING_CODE');
  }

  code = code.trim().toUpperCase();
  const searchPattern = code.startsWith('DD-') ? `^${code}$` : `^(DD-)?${code}$`;

  const booking = await Booking.findOne({
    bookingCode: new RegExp(searchPattern, 'i')
  });

  if (!booking) {
    throw new AppError(`No booking found with reference code '${code}'.`, 404, 'BOOKING_NOT_FOUND');
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="DetailDock_Invoice_${booking.bookingCode}.pdf"`);

  invoiceService.generateInvoicePdf(booking, res);
});

/**
 * @desc Resend transactional email receipt to customer
 * @route POST /api/v1/bookings/:code/resend-receipt
 * @access Public
 */
export const resendBookingReceipt = asyncHandler(async (req, res) => {
  let { code } = req.params;
  if (!code) {
    throw new AppError('Booking reference code is required.', 400, 'MISSING_BOOKING_CODE');
  }

  code = code.trim().toUpperCase();
  const searchPattern = code.startsWith('DD-') ? `^${code}$` : `^(DD-)?${code}$`;

  const booking = await Booking.findOne({
    bookingCode: new RegExp(searchPattern, 'i')
  });

  if (!booking) {
    throw new AppError(`No booking found with reference code '${code}'.`, 404, 'BOOKING_NOT_FOUND');
  }

  const result = await emailService.sendBookingConfirmationReceipt(booking);

  res.status(200).json({
    success: true,
    message: `Receipt dispatched to ${booking.customer.email}.`,
    data: result
  });
});

