import { StudioSetting } from '../models/StudioSetting.js';
import { Booking } from '../models/Booking.js';
import { AppError } from '../utils/AppError.js';

/**
 * Convert 12-hour or 24-hour time string (e.g., '09:00 AM' or '14:30') to minutes from midnight.
 * @param {string} timeStr
 * @returns {number}
 */
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const cleaned = timeStr.trim().toUpperCase();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3];

  if (meridiem) {
    if (meridiem === 'AM' && hours === 12) hours = 0;
    if (meridiem === 'PM' && hours < 12) hours += 12;
  }

  return hours * 60 + minutes;
};

/**
 * Convert minutes from midnight into standard 12-hour format string (e.g., '09:00 AM').
 * @param {number} totalMinutes
 * @returns {string}
 */
const formatMinutesTo12Hour = (totalMinutes) => {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  const paddedHours = hours12.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  return `${paddedHours}:${paddedMinutes} ${meridiem}`;
};

/**
 * Generate slot time labels for a given studio setting.
 * E.g., from 09:00 AM to 06:00 PM with 120-minute interval ->
 * ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM']
 */
const generateTimeSlots = (operatingHours) => {
  const openTime = operatingHours?.openTime || '09:00 AM';
  const closeTime = operatingHours?.closeTime || '06:00 PM';
  const interval = operatingHours?.slotIntervalMinutes || 120;

  const startMin = parseTimeToMinutes(openTime);
  const endMin = parseTimeToMinutes(closeTime);

  const slots = [];
  for (let current = startMin; current + interval <= endMin; current += interval) {
    slots.push(formatMinutesTo12Hour(current));
  }

  return slots.length > 0 ? slots : ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'];
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Fetch or initialize default studio setting singleton.
 */
export const getActiveStudioSetting = async () => {
  let setting = await StudioSetting.findOne().lean();
  if (!setting) {
    setting = {
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
      maxBayCapacity: 2,
      workingDays: [1, 2, 3, 4, 5, 6],
      blackoutDates: []
    };
  }
  return setting;
};

/**
 * Normalize and parse input date string into UTC midnight boundaries.
 * @param {string|Date} dateInput YYYY-MM-DD or ISO string
 */
export const normalizeDateRange = (dateInput) => {
  let dateStr;
  if (dateInput instanceof Date) {
    dateStr = dateInput.toISOString().split('T')[0];
  } else if (typeof dateInput === 'string') {
    dateStr = dateInput.trim().split('T')[0];
  } else {
    throw new AppError('Invalid date provided. Format must be YYYY-MM-DD.', 400, 'INVALID_DATE');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new AppError('Invalid date format. Expected YYYY-MM-DD.', 400, 'INVALID_DATE_FORMAT');
  }

  const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
  const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

  if (isNaN(startOfDay.getTime())) {
    throw new AppError('Invalid calendar date value.', 400, 'INVALID_DATE_VALUE');
  }

  return { dateStr, startOfDay, endOfDay };
};

/**
 * Get bay and slot availability for a specified calendar date.
 * Returns slot availability list and remaining bay capacity.
 *
 * @param {string} dateInput YYYY-MM-DD
 */
export const getAvailabilityForDate = async (dateInput) => {
  const { dateStr, startOfDay, endOfDay } = normalizeDateRange(dateInput);
  const setting = await getActiveStudioSetting();

  const dayOfWeek = startOfDay.getUTCDay(); // 0 = Sunday, 1 = Monday, ...
  const dayName = DAY_NAMES[dayOfWeek];
  const maxBayCapacity = Number(setting.maxBayCapacity || 2);

  // 1. Check working days
  const workingDays = setting.workingDays || [1, 2, 3, 4, 5, 6];
  if (!workingDays.includes(dayOfWeek)) {
    return {
      date: dateStr,
      dayOfWeek: dayName,
      isOpen: false,
      reason: `Studio is closed on ${dayName}s.`,
      maxBayCapacity: maxBayCapacity,
      slots: []
    };
  }

  // 2. Check blackout dates
  const isBlackout = (setting.blackoutDates || []).some((bDate) => {
    const bStr = new Date(bDate).toISOString().split('T')[0];
    return bStr === dateStr;
  });

  if (isBlackout) {
    return {
      date: dateStr,
      dayOfWeek: dayName,
      isOpen: false,
      reason: 'Studio is closed for a scheduled holiday or facility maintenance.',
      maxBayCapacity: maxBayCapacity,
      slots: []
    };
  }

  // 3. Generate standard time slots
  const timeSlots = generateTimeSlots(setting.operatingHours);

  // 4. Query active bookings on that date (excluding Cancelled)
  const existingBookings = await Booking.find({
    scheduledDate: { $gte: startOfDay, $lte: endOfDay },
    status: { $nin: ['Cancelled'] }
  })
    .select('scheduledTimeSlot bayNumber status')
    .lean();

  // 5. Aggregate slot availability
  const slotAvailability = timeSlots.map((slot) => {
    const slotBookings = existingBookings.filter(
      (b) => b.scheduledTimeSlot.toUpperCase() === slot.toUpperCase()
    );
    const bookedCount = slotBookings.length;
    const availableBays = Math.max(0, maxBayCapacity - bookedCount);
    const isAvailable = availableBays > 0;

    const occupiedBays = slotBookings.map((b) => b.bayNumber).filter(Boolean);
    const availableBayNumbers = [];
    for (let bay = 1; bay <= maxBayCapacity; bay++) {
      if (!occupiedBays.includes(bay)) {
        availableBayNumbers.push(bay);
      }
    }

    return {
      timeSlot: slot,
      maxCapacity: maxBayCapacity,
      bookedCount: bookedCount,
      availableBays: availableBays,
      isAvailable: isAvailable,
      suggestedBay: availableBayNumbers[0] || (bookedCount < maxBayCapacity ? bookedCount + 1 : null)
    };
  });

  return {
    date: dateStr,
    dayOfWeek: dayName,
    isOpen: true,
    maxBayCapacity: maxBayCapacity,
    operatingHours: setting.operatingHours,
    slots: slotAvailability
  };
};

/**
 * Authoritative guard for booking creation to prevent double-booking.
 * Verifies that the requested slot on the date has at least 1 open bay.
 * Throws 409 AppError if slot capacity is exceeded.
 */
export const verifySlotAvailability = async (dateInput, timeSlot) => {
  if (!timeSlot) {
    throw new AppError('Time slot is required.', 400, 'TIME_SLOT_REQUIRED');
  }

  const { dateStr, startOfDay, endOfDay } = normalizeDateRange(dateInput);
  const setting = await getActiveStudioSetting();
  const maxBayCapacity = Number(setting.maxBayCapacity || 2);

  // Check day of week
  const dayOfWeek = startOfDay.getUTCDay();
  const workingDays = setting.workingDays || [1, 2, 3, 4, 5, 6];
  if (!workingDays.includes(dayOfWeek)) {
    throw new AppError(`The studio is closed on ${DAY_NAMES[dayOfWeek]}s.`, 400, 'STUDIO_CLOSED_DAY');
  }

  // Check blackout
  const isBlackout = (setting.blackoutDates || []).some((bDate) => {
    return new Date(bDate).toISOString().split('T')[0] === dateStr;
  });
  if (isBlackout) {
    throw new AppError('The studio is closed on this date for scheduled maintenance.', 400, 'STUDIO_BLACKOUT_DATE');
  }

  // Count active bookings for this specific slot
  const slotBookings = await Booking.find({
    scheduledDate: { $gte: startOfDay, $lte: endOfDay },
    scheduledTimeSlot: new RegExp(`^${timeSlot.trim()}$`, 'i'),
    status: { $nin: ['Cancelled'] }
  })
    .select('bayNumber status')
    .lean();

  if (slotBookings.length >= maxBayCapacity) {
    throw new AppError(
      `The selected time slot (${timeSlot}) on ${dateStr} is fully booked (Capacity: ${maxBayCapacity}/${maxBayCapacity}). Please select another slot.`,
      409,
      'SLOT_CAPACITY_EXCEEDED'
    );
  }

  // Determine assigned bay
  const occupiedBays = slotBookings.map((b) => b.bayNumber).filter(Boolean);
  let nextBayNumber = 1;
  for (let b = 1; b <= maxBayCapacity; b++) {
    if (!occupiedBays.includes(b)) {
      nextBayNumber = b;
      break;
    }
  }

  return {
    date: dateStr,
    timeSlot: timeSlot.trim(),
    isAvailable: true,
    currentBookedCount: slotBookings.length,
    maxBayCapacity: maxBayCapacity,
    assignedBayNumber: nextBayNumber
  };
};
