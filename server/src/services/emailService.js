import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || '"DetailDock Atelier" <reservations@detaildock.com>';

let transporter = null;

if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

/**
 * Format currency for luxury presentation
 */
const fmt = (num) => `$${Number(num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Generates an executive dark-themed luxury HTML email receipt template
 */
const buildReceiptHtml = (booking, clientUrl) => {
  const trackingUrl = `${clientUrl}/track/${booking.bookingCode}`;
  const dateStr = new Date(booking.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const paymentStatusBadge = booking.payment?.status === 'paid' 
    ? '<span style="background-color: #065f46; color: #34d399; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 0.05em;">PAID IN FULL</span>'
    : booking.payment?.status === 'deposit_paid'
    ? '<span style="background-color: #1e3a8a; color: #60a5fa; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 0.05em;">DEPOSIT RECEIVED</span>'
    : '<span style="background-color: #78350f; color: #fbbf24; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 0.05em;">DUE AT STUDIO ARRIVAL</span>';

  const addonsList = (booking.addonsSnapshot || []).map(addon => `
    <tr>
      <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b; font-size: 14px;">+ ${addon.title}</td>
      <td style="padding: 10px 0; color: #f8fafc; text-align: right; border-bottom: 1px solid #1e293b; font-size: 14px; font-weight: 600;">${fmt(addon.price)}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DetailDock Atelier Reservation Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #090d16; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
          
          <!-- Header Bar with Cyan Glow Accent -->
          <tr>
            <td style="background: linear-gradient(90deg, #0284c7, #38bdf8, #818cf8); height: 4px;"></td>
          </tr>

          <!-- Branding & Title Header -->
          <tr>
            <td style="padding: 36px 40px 24px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">
                DETAILDOCK <span style="color: #38bdf8; font-weight: 300;">ATELIER</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">
                Automotive Aesthetics & Preservation Studio
              </p>
            </td>
          </tr>

          <!-- Confirmation Hero Card -->
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 12px; border: 1px solid #475569; padding: 24px; text-align: center;">
                <tr>
                  <td>
                    <p style="margin: 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Reservation Reference Code</p>
                    <h2 style="margin: 8px 0; font-size: 32px; font-weight: 900; letter-spacing: 0.15em; color: #38bdf8; font-family: monospace;">
                      ${booking.bookingCode}
                    </h2>
                    <div style="margin-top: 10px;">
                      ${paymentStatusBadge}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Schedule & Vehicle Details -->
          <tr>
            <td style="padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="vertical-align: top; padding-right: 12px;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700;">Scheduled Appointment</p>
                    <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 15px; font-weight: 600;">${dateStr}</p>
                    <p style="margin: 2px 0 0 0; color: #38bdf8; font-size: 14px; font-weight: 500;">Slot: ${booking.scheduledTimeSlot} (Bay #${booking.bayNumber || 1})</p>
                  </td>
                  <td width="50%" style="vertical-align: top; padding-left: 12px;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700;">Intake Vehicle Spec</p>
                    <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 15px; font-weight: 600;">
                      ${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model}
                    </p>
                    <p style="margin: 2px 0 0 0; color: #94a3b8; font-size: 13px;">
                      Class: ${booking.vehicle.categoryName} (${booking.vehicle.multiplierApplied}x)
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Itemized Financial Breakdown -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
                <tr>
                  <td style="padding: 16px 0 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700;">Service Item</td>
                  <td style="padding: 16px 0 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700; text-align: right;">Amount</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #f8fafc; border-bottom: 1px solid #1e293b; font-size: 14px; font-weight: 600;">
                    ${booking.packageSnapshot.title}
                  </td>
                  <td style="padding: 10px 0; color: #f8fafc; text-align: right; border-bottom: 1px solid #1e293b; font-size: 14px; font-weight: 600;">
                    ${fmt(booking.packageSnapshot.calculatedPrice)}
                  </td>
                </tr>
                ${addonsList}
                <tr>
                  <td style="padding: 16px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 700;">Authoritative Total</td>
                  <td style="padding: 16px 0 0 0; color: #38bdf8; font-size: 20px; font-weight: 800; text-align: right;">
                    ${fmt(booking.totalPrice)}
                  </td>
                </tr>
                ${booking.payment?.amountPaid > 0 ? `
                <tr>
                  <td style="padding: 6px 0 0 0; color: #34d399; font-size: 13px;">Amount Paid Online</td>
                  <td style="padding: 6px 0 0 0; color: #34d399; font-size: 13px; text-align: right; font-weight: 600;">
                    ${fmt(booking.payment.amountPaid)}
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Live Tracking Portal CTA Button -->
          <tr>
            <td style="padding: 0 40px 36px 40px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${trackingUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);">
                      Launch Live Vehicle Telemetry & Tracking →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 14px 0 0 0; color: #64748b; font-size: 12px;">
                You can also download your formal Tax Invoice & PDF receipt anytime from your live tracking link.
              </p>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0b1120; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                DetailDock Atelier &bull; 100 Waterfront Suite 400, Seattle, WA &bull; +1 (555) 934-3625
              </p>
              <p style="margin: 6px 0 0 0; color: #475569; font-size: 11px;">
                &copy; ${new Date().getFullYear()} DetailDock Technologies Inc. Permissive Commercial License.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export const emailService = {
  /**
   * Dispatches the luxury transactional booking and payment receipt email
   */
  async sendBookingConfirmationReceipt(booking) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const htmlContent = buildReceiptHtml(booking, clientUrl);

    const mailOptions = {
      from: EMAIL_FROM,
      to: booking.customer.email,
      subject: `DetailDock Reservation Confirmed: ${booking.bookingCode} (${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model})`,
      html: htmlContent
    };

    if (transporter) {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[EmailService]: Live email dispatched to ${booking.customer.email}. Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId, mode: 'smtp_live' };
    }

    // High-fidelity fallback for local testing & development without live SMTP credentials
    const simulatedId = `msg_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    console.log(`[EmailService Simulated]: Transmitted confirmation receipt for ${booking.bookingCode} to <${booking.customer.email}>. [Message ID: ${simulatedId}]`);
    return {
      success: true,
      messageId: simulatedId,
      recipient: booking.customer.email,
      bookingCode: booking.bookingCode,
      mode: 'mock_simulated'
    };
  }
};
