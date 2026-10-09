import express from 'express';
import { StudioSetting } from '../models/StudioSetting.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

/**
 * @desc Get public studio branding, hours, bays & contact info
 * @route GET /api/v1/studio/settings
 * @access Public
 */
router.get('/settings', asyncHandler(async (req, res) => {
  let settings = await StudioSetting.findOne().lean();
  
  if (!settings) {
    const created = await StudioSetting.create({
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
    settings = created.toObject();
  }

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
    message: 'Studio configuration retrieved successfully.'
  });
}));

export default router;
