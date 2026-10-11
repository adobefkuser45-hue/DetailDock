import { StudioCMS } from '../models/StudioCMS.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

/**
 * Helper to ensure a CMS document exists in MongoDB
 */
const getOrCreateCMSDoc = async () => {
  let doc = await StudioCMS.findOne();
  if (!doc) {
    doc = await StudioCMS.create({});
  }
  return doc;
};

/**
 * Public: Get active website CMS content for customer frontend
 * GET /api/v1/cms/content
 */
export const getPublicCMS = asyncHandler(async (req, res) => {
  const cms = await getOrCreateCMSDoc();

  // Filter out inactive items for public customer consumption
  const publicContent = {
    announcementBanner: cms.announcementBanner?.isActive ? cms.announcementBanner : { isActive: false },
    hero: cms.hero,
    beforeAfterShowcase: (cms.beforeAfterShowcase || []).filter(item => item.isActive),
    testimonials: (cms.testimonials || []).filter(item => item.isActive),
    faqs: (cms.faqs || []).filter(item => item.isActive),
    updatedAt: cms.updatedAt
  };

  res.status(200).json({
    success: true,
    data: publicContent
  });
});

/**
 * Admin: Get full CMS content (including inactive items & metadata)
 * GET /api/v1/admin/cms/content
 */
export const getAdminCMS = asyncHandler(async (req, res) => {
  const cms = await getOrCreateCMSDoc();

  res.status(200).json({
    success: true,
    data: cms
  });
});

/**
 * Admin: Update full CMS content or specific sections
 * PUT /api/v1/admin/cms/content
 */
export const updateAdminCMS = asyncHandler(async (req, res) => {
  let cms = await getOrCreateCMSDoc();

  const { announcementBanner, hero, beforeAfterShowcase, testimonials, faqs } = req.body;

  if (announcementBanner) cms.announcementBanner = { ...cms.announcementBanner.toObject(), ...announcementBanner };
  if (hero) cms.hero = { ...cms.hero.toObject(), ...hero };
  if (Array.isArray(beforeAfterShowcase)) cms.beforeAfterShowcase = beforeAfterShowcase;
  if (Array.isArray(testimonials)) cms.testimonials = testimonials;
  if (Array.isArray(faqs)) cms.faqs = faqs;

  await cms.save();

  res.status(200).json({
    success: true,
    message: 'Studio website CMS content updated successfully.',
    data: cms
  });
});

/**
 * Admin: Reset CMS to factory atelier defaults
 * POST /api/v1/admin/cms/reset
 */
export const resetCMSToDefaults = asyncHandler(async (req, res) => {
  await StudioCMS.deleteMany({});
  const freshCMS = await StudioCMS.create({});

  res.status(200).json({
    success: true,
    message: 'Studio website CMS reset to factory defaults successfully.',
    data: freshCMS
  });
});
