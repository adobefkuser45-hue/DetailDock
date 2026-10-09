import { StudioSetting } from '../models/StudioSetting.js';

/**
 * Normalizes phone number into international digits suitable for WhatsApp/SMS links
 * E.g., "+1 (555) 348-2450" -> "15553482450"
 */
export const sanitizePhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/[^\d]/g, '');
};

/**
 * Builds standard, luxury automotive detailing communication message templates
 */
export const buildCommunicationMessage = (booking, studioSettings, clientUrl, targetStatus = null) => {
  const studioName = studioSettings?.studioName || 'DetailDock Atelier';
  const studioPhone = studioSettings?.contactPhone || '+1 (555) 348-2450';
  const customerName = booking.customer?.name || 'Valued Client';
  const vehicleName = `${booking.vehicle?.year || ''} ${booking.vehicle?.make || ''} ${booking.vehicle?.model || ''}`.trim() || 'Vehicle';
  const currentStatus = targetStatus || booking.status || 'Confirmed';
  const trackingUrl = `${clientUrl || 'https://client-mauve-zeta-13.vercel.app'}/track/${booking.bookingCode}`;

  let messageBody = '';

  switch (currentStatus) {
    case 'Confirmed':
      messageBody = `Greetings ${customerName}, your appointment at ${studioName} is confirmed for ${vehicleName}. Reference: ${booking.bookingCode}. Cleanroom Bay ${booking.bayNumber || 1} is reserved. Live telemetry: ${trackingUrl}`;
      break;

    case 'In Bay':
      messageBody = `Update from ${studioName}: Your ${vehicleName} has entered Cleanroom Bay ${booking.bayNumber || 1}. Precision paint correction & surface prep is underway. Track live progress: ${trackingUrl}`;
      break;

    case 'Ready':
      messageBody = `Excellent news ${customerName}! DetailDock finishing and multi-stage QC inspection is complete on your ${vehicleName}. Your vehicle is ready for concierge pickup at ${studioName}. Live overview: ${trackingUrl}`;
      break;

    case 'Completed':
      messageBody = `Thank you ${customerName} for entrusting ${studioName} with your ${vehicleName}. Your digital preservation warranty certificate and official tax invoice are ready for download: ${trackingUrl}`;
      break;

    default:
      messageBody = `Notice from ${studioName} regarding reservation ${booking.bookingCode} for ${vehicleName}. Current status: ${currentStatus}. Concierge contact: ${studioPhone}. Live track: ${trackingUrl}`;
      break;
  }

  return messageBody;
};

/**
 * Generates direct WhatsApp and native SMS hyperlinks
 */
export const generateCommunicationLinks = (booking, studioSettings, clientUrl, targetStatus = null) => {
  const cleanPhone = sanitizePhoneNumber(booking.customer?.phone);
  const message = buildCommunicationMessage(booking, studioSettings, clientUrl, targetStatus);
  const encodedMessage = encodeURIComponent(message);

  return {
    rawMessage: message,
    recipientPhone: booking.customer?.phone,
    cleanPhone,
    whatsappUrl: cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedMessage}` : null,
    smsUrl: cleanPhone ? `sms:${cleanPhone}?body=${encodedMessage}` : null
  };
};
