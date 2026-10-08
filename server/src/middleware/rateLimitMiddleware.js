import rateLimit from 'express-rate-limit';

/**
 * Standard API rate limiter.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP address, please try again after 15 minutes.'
    }
  }
});

/**
 * Sensitive endpoints rate limiter (Auth / Login / Register).
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // Limit each IP to 15 login/register attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please wait 15 minutes before trying again.'
    }
  }
});

/**
 * Booking creation limiter to prevent reservation spam.
 */
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 booking submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'BOOKING_RATE_LIMIT_EXCEEDED',
      message: 'Too many booking attempts from this network. Please try again shortly.'
    }
  }
});
