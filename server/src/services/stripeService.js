import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Determine if live Stripe is configured with a real or valid test secret key
const isStripeConfigured = Boolean(
  STRIPE_SECRET_KEY && 
  STRIPE_SECRET_KEY.startsWith('sk_') && 
  !STRIPE_SECRET_KEY.includes('placeholder')
);

const stripe = isStripeConfigured 
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' }) 
  : null;

/**
 * Authoritative Stripe Payment Service
 * Handles PaymentIntent creation, Checkout Sessions, and Webhook verification
 * with seamless simulated fallback for local development & testing.
 */
export const stripeService = {
  isConfigured() {
    return isStripeConfigured;
  },

  /**
   * Create a Stripe PaymentIntent for inline card element processing
   */
  async createPaymentIntent({ amount, currency = 'usd', bookingCode, customerEmail, metadata = {} }) {
    const amountInCents = Math.round(Number(amount) * 100);

    if (amountInCents < 50) {
      throw new Error('Payment amount must be at least $0.50 USD.');
    }

    if (isStripeConfigured && stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: currency.toLowerCase(),
        receipt_email: customerEmail || undefined,
        description: `DetailDock Studio Reservation — Booking ${bookingCode}`,
        metadata: {
          bookingCode,
          ...metadata
        },
        automatic_payment_methods: {
          enabled: true
        }
      });

      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        mode: 'live_stripe'
      };
    }

    // High-fidelity simulated PaymentIntent for dev/testing
    const mockId = `pi_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return {
      id: mockId,
      clientSecret: `${mockId}_secret_${Math.random().toString(36).substring(2, 9)}`,
      amount: Number(amount),
      currency: currency.toLowerCase(),
      status: 'requires_payment_method',
      mode: 'mock_simulated'
    };
  },

  /**
   * Create a Stripe Checkout Session for hosted luxury checkout redirect
   */
  async createCheckoutSession({ 
    booking, 
    successUrl, 
    cancelUrl, 
    payFull = true, 
    depositAmount = 50 
  }) {
    const totalAmount = booking.totalPrice;
    const chargeAmount = payFull ? totalAmount : Math.min(depositAmount, totalAmount);
    const amountInCents = Math.round(chargeAmount * 100);

    const title = payFull
      ? `DetailDock: ${booking.packageSnapshot.title} (Full Payment)`
      : `DetailDock: ${booking.packageSnapshot.title} (Reservation Deposit)`;

    if (isStripeConfigured && stripe) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: booking.customer.email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: title,
                description: `Vehicle: ${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model} (${booking.vehicle.categoryName}). Scheduled: ${new Date(booking.scheduledDate).toISOString().split('T')[0]} @ ${booking.scheduledTimeSlot}`,
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: booking.bookingCode,
        metadata: {
          bookingId: booking._id.toString(),
          bookingCode: booking.bookingCode,
          payFull: payFull ? 'true' : 'false',
          chargeAmount: chargeAmount.toString()
        }
      });

      return {
        sessionId: session.id,
        url: session.url,
        amount: chargeAmount,
        currency: 'usd',
        mode: 'live_stripe'
      };
    }

    // Simulated Checkout Session URL redirecting to success callback
    const mockSessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const redirectUrl = successUrl.includes('?') 
      ? `${successUrl}&session_id=${mockSessionId}&mock=true`
      : `${successUrl}?session_id=${mockSessionId}&mock=true`;

    return {
      sessionId: mockSessionId,
      url: redirectUrl,
      amount: chargeAmount,
      currency: 'usd',
      mode: 'mock_simulated'
    };
  },

  /**
   * Cryptographically construct and verify a Stripe Webhook Event
   */
  constructWebhookEvent(rawBody, signatureHeader) {
    if (isStripeConfigured && stripe) {
      if (!STRIPE_WEBHOOK_SECRET) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not configured on the server.');
      }
      return stripe.webhooks.constructEvent(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET);
    }

    // In mock or development mode: parse raw body and return simulated event
    try {
      const payloadString = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody);
      const parsed = JSON.parse(payloadString);
      return {
        id: parsed.id || `evt_mock_${Date.now()}`,
        type: parsed.type || 'payment_intent.succeeded',
        data: parsed.data || { object: parsed },
        simulated: true
      };
    } catch (err) {
      throw new Error(`Invalid simulated webhook body: ${err.message}`);
    }
  }
};
