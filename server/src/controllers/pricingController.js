import { calculatePricing } from '../services/pricingService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

/**
 * @desc Authoritative Server-Side Pricing Calculation
 * @route POST /api/v1/pricing/calculate
 * @access Public
 *
 * Body payload:
 * {
 *   vehicleCategoryId?: string,
 *   vehicleCategorySlug?: string,
 *   packageId?: string,
 *   packageSlug?: string,
 *   addonIds?: string[],
 *   addonSlugs?: string[]
 * }
 */
export const calculateServicePricing = asyncHandler(async (req, res) => {
  const {
    vehicleCategoryId,
    vehicleCategorySlug,
    packageId,
    packageSlug,
    addonIds,
    addonSlugs
  } = req.body;

  if (!vehicleCategoryId && !vehicleCategorySlug) {
    throw new AppError('vehicleCategoryId or vehicleCategorySlug is required.', 400, 'MISSING_VEHICLE_CATEGORY');
  }

  if (!packageId && !packageSlug) {
    throw new AppError('packageId or packageSlug is required.', 400, 'MISSING_PACKAGE');
  }

  const result = await calculatePricing({
    vehicleCategoryId,
    vehicleCategorySlug,
    packageId,
    packageSlug,
    addonIds: addonIds || [],
    addonSlugs: addonSlugs || []
  });

  res.status(200).json({
    success: true,
    data: result,
    message: 'Authoritative pricing calculated successfully.'
  });
});
