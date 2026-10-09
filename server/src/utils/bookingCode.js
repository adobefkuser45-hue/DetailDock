import crypto from 'crypto';
import { Booking } from '../models/Booking.js';

// Base32 character set excluding visually ambiguous characters (0, O, 1, I)
const CHARSET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

/**
 * Generate a random 6-character code with DD- prefix.
 * Example: DD-7X9W2B
 */
export const generateRandomCode = () => {
  const bytes = crypto.randomBytes(6);
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += CHARSET[bytes[i] % CHARSET.length];
  }
  return `DD-${code}`;
};

/**
 * Generate a guaranteed unique booking code by checking against the database.
 * Retries up to maxRetries times in the astronomically unlikely event of a collision.
 */
export const generateUniqueBookingCode = async (maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const candidateCode = generateRandomCode();
    const existing = await Booking.findOne({ bookingCode: candidateCode }).select('_id').lean();
    if (!existing) {
      return candidateCode;
    }
  }
  // Fallback with timestamp suffix if max retries exceeded
  return `DD-${Date.now().toString(36).toUpperCase()}`;
};

/**
 * Mask an email address for privacy on public tracking pages.
 * Example: alex.mercer@gmail.com -> a***r@gmail.com
 */
export const maskEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  const [local, domain] = email.trim().split('@');
  if (!domain) return email;
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
};

/**
 * Mask a phone number for privacy on public tracking pages.
 * Example: +1 (555) 348-2450 -> +1 (***) ***-2450
 */
export const maskPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  const cleaned = phone.trim();
  if (cleaned.length <= 4) return '***-***';
  const last4 = cleaned.slice(-4);
  return `***-***-${last4}`;
};
