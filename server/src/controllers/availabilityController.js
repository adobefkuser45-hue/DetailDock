import { getAvailabilityForDate, getActiveStudioSetting } from '../services/availabilityService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc Get studio slot availability and remaining bay capacity for a date
 * @route GET /api/v1/availability?date=YYYY-MM-DD
 * @access Public
 */
export const getSlotAvailability = asyncHandler(async (req, res) => {
  // If date is omitted, default to tomorrow's date
  let dateQuery = req.query.date;
  if (!dateQuery) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateQuery = tomorrow.toISOString().split('T')[0];
  }

  const availability = await getAvailabilityForDate(dateQuery);

  res.status(200).json({
    success: true,
    data: availability,
    message: availability.isOpen 
      ? `Slot availability retrieved for ${availability.date}.` 
      : availability.reason
  });
});

/**
 * @desc Get studio general operating info (hours, bays, address, contact)
 * @route GET /api/v1/availability/studio-info
 * @access Public
 */
export const getStudioInformation = asyncHandler(async (req, res) => {
  const settings = await getActiveStudioSetting();

  res.status(200).json({
    success: true,
    data: {
      studioName: settings.studioName,
      contactPhone: settings.contactPhone,
      contactEmail: settings.contactEmail,
      address: settings.address,
      operatingHours: settings.operatingHours,
      maxBayCapacity: settings.maxBayCapacity,
      workingDays: settings.workingDays
    },
    message: 'Studio information retrieved successfully.'
  });
});
