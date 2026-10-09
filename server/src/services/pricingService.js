import mongoose from 'mongoose';
import { VehicleCategory } from '../models/VehicleCategory.js';
import { ServicePackage } from '../models/ServicePackage.js';
import { Addon } from '../models/Addon.js';
import { AppError } from '../utils/AppError.js';

/**
 * Format total minutes into a human-readable duration string.
 * @param {number} totalMinutes
 * @returns {string} e.g. "2 hrs 30 mins" or "45 mins"
 */
export const formatDuration = (totalMinutes) => {
  if (!totalMinutes || totalMinutes <= 0) return '0 mins';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min${minutes > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  return `${minutes} min${minutes > 1 ? 's' : ''}`;
};

/**
 * Resolves a vehicle category by either its MongoDB _id or its slug.
 */
const resolveVehicleCategory = async (idOrSlug) => {
  if (!idOrSlug) {
    throw new AppError('Vehicle category is required for pricing calculation.', 400, 'INVALID_INPUT');
  }

  let query = { isActive: true };
  if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
    query._id = idOrSlug;
  } else {
    query.slug = idOrSlug.toString().toLowerCase().trim();
  }

  const category = await VehicleCategory.findOne(query).lean();
  if (!category) {
    throw new AppError(`Vehicle category '${idOrSlug}' not found or inactive.`, 404, 'CATEGORY_NOT_FOUND');
  }
  return category;
};

/**
 * Resolves a service package by either its MongoDB _id or its slug.
 */
const resolveServicePackage = async (idOrSlug) => {
  if (!idOrSlug) {
    throw new AppError('Service package is required for pricing calculation.', 400, 'INVALID_INPUT');
  }

  let query = { isActive: true };
  if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
    query._id = idOrSlug;
  } else {
    query.slug = idOrSlug.toString().toLowerCase().trim();
  }

  const pkg = await ServicePackage.findOne(query).lean();
  if (!pkg) {
    throw new AppError(`Service package '${idOrSlug}' not found or inactive.`, 404, 'PACKAGE_NOT_FOUND');
  }
  return pkg;
};

/**
 * Resolves an array of add-on identifiers (ObjectIds or slugs).
 */
const resolveAddons = async (addonIdentifiers = []) => {
  if (!Array.isArray(addonIdentifiers) || addonIdentifiers.length === 0) {
    return [];
  }

  const idQueries = [];
  const slugQueries = [];

  for (const item of addonIdentifiers) {
    if (!item) continue;
    if (mongoose.Types.ObjectId.isValid(item)) {
      idQueries.push(new mongoose.Types.ObjectId(item));
    } else {
      slugQueries.push(item.toString().toLowerCase().trim());
    }
  }

  const orConditions = [];
  if (idQueries.length > 0) orConditions.push({ _id: { $in: idQueries } });
  if (slugQueries.length > 0) orConditions.push({ slug: { $in: slugQueries } });

  if (orConditions.length === 0) return [];

  const addons = await Addon.find({
    isActive: true,
    $or: orConditions
  }).lean();

  if (addons.length !== addonIdentifiers.length) {
    const foundIds = addons.map(a => a._id.toString());
    const foundSlugs = addons.map(a => a.slug.toLowerCase());
    const missing = addonIdentifiers.filter(item => {
      const s = item.toString().toLowerCase().trim();
      return !foundIds.includes(s) && !foundSlugs.includes(s);
    });
    throw new AppError(`The following add-on(s) were not found or inactive: ${missing.join(', ')}`, 404, 'ADDON_NOT_FOUND');
  }

  return addons;
};

/**
 * Authoritative Server-Side Pricing Engine
 * Computes exact package price with vehicle multiplier, adds optional services,
 * and calculates total service duration.
 *
 * Formula:
 * PackagePrice = Round(BasePrice * PriceMultiplier, 2)
 * PackageDuration = Round(BaseDuration * DurationMultiplier)
 * TotalPrice = PackagePrice + Sum(AddonPrices)
 * TotalDuration = PackageDuration + Sum(AddonDurations)
 */
export const calculatePricing = async ({
  vehicleCategoryId,
  vehicleCategorySlug,
  packageId,
  packageSlug,
  addonIds = [],
  addonSlugs = []
}) => {
  const categoryIdentifier = vehicleCategoryId || vehicleCategorySlug;
  const packageIdentifier = packageId || packageSlug;
  const combinedAddons = [
    ...(Array.isArray(addonIds) ? addonIds : [addonIds].filter(Boolean)),
    ...(Array.isArray(addonSlugs) ? addonSlugs : [addonSlugs].filter(Boolean))
  ];

  // 1. Resolve Category & Package documents from database
  const category = await resolveVehicleCategory(categoryIdentifier);
  const servicePackage = await resolveServicePackage(packageIdentifier);
  const addons = await resolveAddons(combinedAddons);

  // 2. Perform authoritative calculations
  const basePrice = Number(servicePackage.basePrice);
  const priceMultiplier = Number(category.priceMultiplier || 1.0);
  const durationMultiplier = Number(category.durationMultiplier || 1.0);

  const calculatedPackagePrice = Number((basePrice * priceMultiplier).toFixed(2));
  const calculatedPackageDuration = Math.round(Number(servicePackage.baseDurationMinutes) * durationMultiplier);

  const addonsSummary = addons.map((addon) => ({
    id: addon._id,
    title: addon.title,
    slug: addon.slug,
    price: Number(addon.price),
    durationMinutes: Number(addon.durationMinutes)
  }));

  const addonsTotalPrice = Number(
    addonsSummary.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)
  );
  const addonsTotalDuration = addonsSummary.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const subtotal = Number((calculatedPackagePrice + addonsTotalPrice).toFixed(2));
  const totalDurationMinutes = calculatedPackageDuration + addonsTotalDuration;

  return {
    vehicleCategory: {
      id: category._id,
      name: category.name,
      slug: category.slug,
      priceMultiplier: priceMultiplier,
      durationMultiplier: durationMultiplier,
      iconName: category.iconName
    },
    servicePackage: {
      id: servicePackage._id,
      title: servicePackage.title,
      slug: servicePackage.slug,
      category: servicePackage.category,
      basePrice: basePrice,
      calculatedPrice: calculatedPackagePrice,
      baseDurationMinutes: servicePackage.baseDurationMinutes,
      durationMinutes: calculatedPackageDuration,
      includedFeatures: servicePackage.includedFeatures || []
    },
    addons: addonsSummary,
    summary: {
      basePackagePrice: basePrice,
      vehicleMultiplierApplied: priceMultiplier,
      packageSubtotal: calculatedPackagePrice,
      addonsSubtotal: addonsTotalPrice,
      totalPrice: subtotal,
      currency: 'USD',
      totalDurationMinutes: totalDurationMinutes,
      formattedDuration: formatDuration(totalDurationMinutes)
    }
  };
};
