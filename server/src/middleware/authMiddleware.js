import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Generate a signed JSON Web Token (JWT)
 * @param {string} id User MongoDB _id
 * @param {string} role User role ('admin' | 'customer' | 'technician')
 * @returns {string}
 */
export const signToken = (id, role = 'customer') => {
  const secret = process.env.JWT_SECRET || 'detaildock_dev_super_secret_jwt_key_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id, role }, secret, { expiresIn });
};

/**
 * Authentication Middleware:
 * Verifies JWT token in Bearer header and attaches current User to request.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('You are not logged in. Please log in to gain access.', 401, 'UNAUTHORIZED');
  }

  const secret = process.env.JWT_SECRET || 'detaildock_dev_super_secret_jwt_key_2026';

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Your authentication session has expired. Please log in again.', 401, 'TOKEN_EXPIRED');
    }
    throw new AppError('Invalid authentication token. Please log in again.', 401, 'INVALID_TOKEN');
  }

  const currentUser = await User.findById(decoded.id).select('-password');
  if (!currentUser) {
    throw new AppError('The user belonging to this token no longer exists.', 401, 'USER_NOT_FOUND');
  }

  if (!currentUser.isActive) {
    throw new AppError('Your user account has been deactivated. Please contact support.', 403, 'ACCOUNT_DEACTIVATED');
  }

  req.user = currentUser;
  next();
});

/**
 * Role-Based Access Control Middleware:
 * Restricts access to specified roles (e.g. restrictTo('admin')).
 * @param  {...string} roles Allowed roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this administrative action.', 403, 'FORBIDDEN')
      );
    }
    next();
  };
};
