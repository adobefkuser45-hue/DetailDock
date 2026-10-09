import { User } from '../models/User.js';
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
