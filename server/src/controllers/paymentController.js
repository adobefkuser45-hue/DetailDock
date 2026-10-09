import { Booking } from '../models/Booking.js';
import { stripeService } from '../services/stripeService.js';
import { emailService } from '../services/emailService.js';

export const paymentController = {
  /**
   * POST /api/v1/payments/create-intent
   * Create a Stripe PaymentIntent for a specific booking
   */
  async createPaymentIntent(req, res, next) {
    try {
      const { bookingCode, payFull = true, depositAmount = 50 } = req.body;

      if (!bookingCode) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Booking code is required to initiate a payment intent.'
          }
        });
      }

      const booking = await Booking.findOne({ bookingCode: bookingCode.toUpperCase().trim() });
      if (!booking) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Booking with code "${bookingCode}" was not found.`
          }
        });
      }

      if (booking.payment?.status === 'paid') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'ALREADY_PAID',
            message: 'This booking has already been fully paid.'
          }
        });
      }

      const chargeAmount = payFull ? booking.totalPrice : Math.min(depositAmount, booking.totalPrice);

      const intent = await stripeService.createPaymentIntent({
        amount: chargeAmount,
        currency: 'usd',
        bookingCode: booking.bookingCode,
        customerEmail: booking.customer.email,
        metadata: {
          bookingId: booking._id.toString(),
          payFull: payFull ? 'true' : 'false'
        }
      });

      // Update booking payment tracking
      booking.payment.stripePaymentIntentId = intent.id;
      booking.payment.method = 'stripe';
      await booking.save();

      return res.status(200).json({
        success: true,
        data: {
          clientSecret: intent.clientSecret,
          paymentIntentId: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          mode: intent.mode,
          bookingCode: booking.bookingCode
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/v1/payments/create-checkout-session
   * Create a hosted Stripe Checkout Session
   */
  async createCheckoutSession(req, res, next) {
    try {
      const { bookingCode, payFull = true, depositAmount = 50 } = req.body;

      if (!bookingCode) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Booking code is required.'
          }
        });
      }

      const booking = await Booking.findOne({ bookingCode: bookingCode.toUpperCase().trim() });
      if (!booking) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Booking with code "${bookingCode}" was not found.`
          }
        });
      }

      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      const successUrl = `${clientUrl}/track/${booking.bookingCode}?payment_status=success`;
      const cancelUrl = `${clientUrl}/track/${booking.bookingCode}?payment_status=cancelled`;

      const session = await stripeService.createCheckoutSession({
        booking,
        successUrl,
        cancelUrl,
        payFull,
        depositAmount
      });

      booking.payment.stripeCheckoutSessionId = session.sessionId;
      booking.payment.method = 'stripe';
      await booking.save();

      return res.status(200).json({
        success: true,
        data: {
          sessionId: session.sessionId,
          url: session.url,
          amount: session.amount,
          mode: session.mode
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/v1/payments/confirm-studio-pay
   * Select 'Pay at Studio / On Arrival'
   */
  async confirmStudioPayment(req, res, next) {
    try {
      const { bookingCode } = req.body;

      if (!bookingCode) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Booking code is required.'
          }
        });
      }

      const booking = await Booking.findOne({ bookingCode: bookingCode.toUpperCase().trim() });
      if (!booking) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Booking with code "${bookingCode}" was not found.`
          }
        });
      }

      booking.payment.method = 'studio_pay';
      booking.payment.status = 'unpaid';

      if (booking.status === 'Pending') {
        booking.status = 'Confirmed';
      }

      booking.statusHistory.push({
        status: booking.status,
        changedAt: new Date(),
        changedBy: 'Customer',
        note: 'Customer confirmed Pay-at-Studio. Reservation bay is secured.'
      });

      await booking.save();

      // Trigger transactional receipt dispatch safely
      try {
        await emailService.sendBookingConfirmationReceipt(booking);
      } catch (emailErr) {
        console.warn(`[PaymentController]: Non-blocking receipt dispatch error: ${emailErr.message}`);
      }

      return res.status(200).json({
        success: true,
        message: 'Payment choice saved. Bay reservation secured for payment at studio arrival.',
        data: {
          bookingCode: booking.bookingCode,
          status: booking.status,
          payment: booking.payment
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/v1/payments/webhook
   * Cryptographically verified Stripe webhook listener
   */
  async handleWebhook(req, res, next) {
    try {
      const signature = req.headers['stripe-signature'];
      const rawBody = req.rawBody || req.body;

      let event;
      try {
        event = stripeService.constructWebhookEvent(rawBody, signature);
      } catch (err) {
        console.error(`[Stripe Webhook]: Signature verification failed: ${err.message}`);
        return res.status(400).json({
          success: false,
          error: {
            code: 'WEBHOOK_SIGNATURE_ERROR',
            message: `Webhook signature verification failed: ${err.message}`
          }
        });
      }

      // Process event types idempotently
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;
          const bookingCode = paymentIntent.metadata?.bookingCode;
          if (bookingCode) {
            const booking = await Booking.findOne({ bookingCode: bookingCode.toUpperCase() });
            if (booking && booking.payment.status !== 'paid') {
              const amountPaidInDollars = (paymentIntent.amount || 0) / 100;
              const isFullPayment = amountPaidInDollars >= booking.totalPrice;

              booking.payment.status = isFullPayment ? 'paid' : 'deposit_paid';
              booking.payment.method = 'stripe';
              booking.payment.amountPaid = (booking.payment.amountPaid || 0) + amountPaidInDollars;
              booking.payment.stripePaymentIntentId = paymentIntent.id;
              booking.payment.paidAt = new Date();

              if (booking.status === 'Pending') {
                booking.status = 'Confirmed';
              }

              booking.statusHistory.push({
                status: booking.status,
                changedAt: new Date(),
                changedBy: 'Stripe Webhook',
                note: `Stripe PaymentIntent ${paymentIntent.id} succeeded for $${amountPaidInDollars}. Status: ${booking.payment.status}.`
              });

              await booking.save();

              try {
                await emailService.sendBookingConfirmationReceipt(booking);
              } catch (emailErr) {
                console.warn(`[Stripe Webhook]: Email delivery warning: ${emailErr.message}`);
              }
            }
          }
          break;
        }

        case 'checkout.session.completed': {
          const session = event.data.object;
          const bookingCode = session.client_reference_id || session.metadata?.bookingCode;
          if (bookingCode) {
            const booking = await Booking.findOne({ bookingCode: bookingCode.toUpperCase() });
            if (booking && booking.payment.status !== 'paid') {
              const amountPaidInDollars = (session.amount_total || 0) / 100;
              const isFullPayment = amountPaidInDollars >= booking.totalPrice;

              booking.payment.status = isFullPayment ? 'paid' : 'deposit_paid';
              booking.payment.method = 'stripe';
              booking.payment.amountPaid = (booking.payment.amountPaid || 0) + amountPaidInDollars;
              booking.payment.stripeCheckoutSessionId = session.id;
              booking.payment.paidAt = new Date();

              if (booking.status === 'Pending') {
                booking.status = 'Confirmed';
              }

              booking.statusHistory.push({
                status: booking.status,
                changedAt: new Date(),
                changedBy: 'Stripe Webhook',
                note: `Stripe Checkout Session ${session.id} completed for $${amountPaidInDollars}.`
              });

              await booking.save();

              try {
                await emailService.sendBookingConfirmationReceipt(booking);
              } catch (emailErr) {
                console.warn(`[Stripe Webhook]: Email delivery warning: ${emailErr.message}`);
              }
            }
          }
          break;
        }

        default:
          // Unhandled event type, acknowledge gracefully
          break;
      }

      return res.status(200).json({ received: true });
    } catch (err) {
      next(err);
    }
  }
};
