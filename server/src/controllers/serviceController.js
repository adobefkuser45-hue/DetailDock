import { ServicePackage } from '../models/ServicePackage.js';
import { Addon } from '../models/Addon.js';
import { VehicleCategory } from '../models/VehicleCategory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

/**
 * @desc Get all active detailing packages
 * @route GET /api/v1/services
 * @access Public
 */
export const getServicePackages = asyncHandler(async (req, res) => {
  const packages = await ServicePackage.find({ isActive: true })
    .sort({ displayOrder: 1, createdAt: 1 })
    .lean();

  res.status(200).json({
    success: true,
    count: packages.length,
    data: packages,
    message: 'Active service packages retrieved successfully.'
  });
});

/**
 * @desc Get single detailing package by slug
 * @route GET /api/v1/services/:slug
 * @access Public
 */
export const getServicePackageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const pkg = await ServicePackage.findOne({ 
    slug: slug.toLowerCase().trim(), 
    isActive: true 
  }).lean();

  if (!pkg) {
    throw new AppError(`Service package '${slug}' not found.`, 404, 'PACKAGE_NOT_FOUND');
  }

  res.status(200).json({
    success: true,
    data: pkg,
    message: 'Service package retrieved successfully.'
  });
});

/**
 * @desc Get all active optional add-ons
 * @route GET /api/v1/addons
 * @access Public
 */
export const getAddons = asyncHandler(async (req, res) => {
  const addons = await Addon.find({ isActive: true })
    .sort({ displayOrder: 1, createdAt: 1 })
    .lean();

  res.status(200).json({
    success: true,
    count: addons.length,
    data: addons,
    message: 'Active add-ons retrieved successfully.'
  });
});

/**
 * @desc Get all active vehicle categories and pricing multipliers
 * @route GET /api/v1/vehicles/categories
 * @access Public
 */
export const getVehicleCategories = asyncHandler(async (req, res) => {
  const categories = await VehicleCategory.find({ isActive: true })
    .sort({ displayOrder: 1, createdAt: 1 })
    .lean();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
    message: 'Vehicle categories retrieved successfully.'
  });
});
