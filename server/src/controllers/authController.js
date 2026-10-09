import { User } from '../models/User.js';
import { Booking } from '../models/Booking.js';
import { signToken } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

/**
 * @desc User & Admin Login
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide both an email address and password.', 400, 'MISSING_CREDENTIALS');
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new AppError('Email and password must be valid strings.', 400, 'INVALID_CREDENTIALS_FORMAT');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Incorrect email or password.', 401, 'INVALID_CREDENTIALS');
  }

  if (!user.isActive) {
    throw new AppError('This user account has been deactivated.', 403, 'ACCOUNT_DEACTIVATED');
  }

  const token = signToken(user._id, user.role);

  res.status(200).json({
    success: true,
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    },
    message: 'Authentication successful. Welcome to DetailDock.'
  });
});

/**
 * @desc Register new customer account
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    throw new AppError('Please provide full name, email, password, and phone number.', 400, 'MISSING_FIELDS');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new AppError('Please provide a valid email address.', 400, 'INVALID_EMAIL_FORMAT');
  }

  if (password.length < 6) {
    throw new AppError('Password must contain at least 6 characters.', 400, 'PASSWORD_TOO_SHORT');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail }).lean();
  if (existingUser) {
    throw new AppError('An account with this email already exists.', 400, 'EMAIL_ALREADY_EXISTS');
  }

  const newUser = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    phone: phone.trim(),
    role: 'customer'
  });

  const token = signToken(newUser._id, newUser.role);

  res.status(201).json({
    success: true,
    token,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    },
    message: 'Account created successfully.'
  });
});

/**
 * @desc Get current authenticated user profile
 * @route GET /api/v1/auth/me
 * @access Authenticated
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        savedVehicles: req.user.savedVehicles || []
      }
    },
    message: 'Current user profile retrieved successfully.'
  });
});

/**
 * @desc Get customer personal atelier garage and booking history
 * @route GET /api/v1/auth/customer/garage
 * @access Customer / Authenticated
 */
export const getCustomerGarage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User profile not found.', 404, 'USER_NOT_FOUND');
  }

  // Find all past and active bookings matching this user's email
  const bookings = await Booking.find({
    'customer.email': user.email.toLowerCase()
  }).sort({ scheduledDate: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        savedVehicles: user.savedVehicles || []
      },
      bookings
    },
    message: 'Customer garage retrieved successfully.'
  });
});

/**
 * @desc Add vehicle to customer garage
 * @route POST /api/v1/auth/customer/vehicles
 * @access Customer / Authenticated
 */
export const addSavedVehicle = asyncHandler(async (req, res) => {
  const { make, model, year, categorySlug, licensePlate } = req.body;
  if (!make || !model || !year) {
    throw new AppError('Make, model, and year are required to save a vehicle.', 400, 'MISSING_VEHICLE_FIELDS');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
  }

  if (!user.savedVehicles) user.savedVehicles = [];
  user.savedVehicles.push({
    make: make.trim(),
    model: model.trim(),
    year: Number(year),
    categorySlug: categorySlug || 'sedan',
    licensePlate: licensePlate ? licensePlate.trim() : ''
  });

  await user.save();

  res.status(201).json({
    success: true,
    data: user.savedVehicles,
    message: 'Vehicle saved to personal garage.'
  });
});

/**
 * @desc Remove vehicle from customer garage
 * @route DELETE /api/v1/auth/customer/vehicles/:vehicleId
 * @access Customer / Authenticated
 */
export const removeSavedVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
  }

  user.savedVehicles = user.savedVehicles.filter(v => v._id.toString() !== vehicleId);
  await user.save();

  res.status(200).json({
    success: true,
    data: user.savedVehicles,
    message: 'Vehicle removed from garage.'
  });
});

