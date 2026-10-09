import express from 'express';
import { paymentController } from '../controllers/paymentController.js';

const router = express.Router();

/**
 * @route   POST /api/v1/payments/create-intent
 * @desc    Create a Stripe PaymentIntent for a booking
 * @access  Public
 */
router.post('/create-intent', paymentController.createPaymentIntent);

/**
 * @route   POST /api/v1/payments/create-checkout-session
 * @desc    Create a hosted Stripe Checkout session
 * @access  Public
 */
router.post('/create-checkout-session', paymentController.createCheckoutSession);

/**
 * @route   POST /api/v1/payments/confirm-studio-pay
 * @desc    Select pay at studio arrival and confirm reservation
 * @access  Public
 */
router.post('/confirm-studio-pay', paymentController.confirmStudioPayment);

/**
 * @route   POST /api/v1/payments/webhook
 * @desc    Handle Stripe Webhooks (signatures cryptographically validated)
 * @access  Public (Stripe servers)
 */
router.post('/webhook', paymentController.handleWebhook);

export default router;
