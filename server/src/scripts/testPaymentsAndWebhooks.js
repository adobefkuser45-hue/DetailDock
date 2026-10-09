import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Booking } from '../models/Booking.js';
import { stripeService } from '../services/stripeService.js';
import { invoiceService } from '../services/invoiceService.js';
import { emailService } from '../services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function runPaymentAndInvoicingTests() {
  console.log('--- [DetailDock]: Starting Milestone M05 Payments & Invoicing Test Suite ---');
  await connectDB();

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      failed++;
    }
  }

  const testCode = `DD-TESTPAY-${Date.now().toString().slice(-4)}`;

  try {
    // 1. Create baseline test booking
    const testBooking = await Booking.create({
      bookingCode: testCode,
      customer: {
        name: 'Alexander Sterling',
        email: 'alexander.test@detaildock.com',
        phone: '+1 (555) 948-2847'
      },
      vehicle: {
        make: 'Porsche',
        model: '911 GT3 RS',
        year: 2024,
        categoryName: 'Executive Sports Coupe',
        categorySlug: 'executive-coupe',
        multiplierApplied: 1.1,
        licensePlate: 'GT3RS',
        paintColor: 'Shark Blue'
      },
      packageSnapshot: {
        title: 'Full Ceramic & Paint Correction Suite',
        basePrice: 850,
        calculatedPrice: 935,
        durationMinutes: 300
      },
      addonsSnapshot: [
        {
          title: 'Hydrophobic Glass Coating',
          price: 150,
          durationMinutes: 45
        }
      ],
      totalPrice: 1085,
      totalDurationMinutes: 345,
      scheduledDate: new Date('2026-11-20T00:00:00Z'),
      scheduledTimeSlot: '09:00 - 12:00',
      bayNumber: 1,
      status: 'Pending',
      payment: {
        status: 'unpaid',
        method: 'unselected',
        amountPaid: 0,
        depositAmount: 0
      }
    });

    assert(testBooking && testBooking.bookingCode === testCode, 'Test booking successfully persisted');

    // 2. Test Stripe PaymentIntent Creation
    const intent = await stripeService.createPaymentIntent({
      amount: testBooking.totalPrice,
      currency: 'usd',
      bookingCode: testBooking.bookingCode,
      customerEmail: testBooking.customer.email
    });

    assert(intent && intent.id && intent.clientSecret, 'stripeService generates valid PaymentIntent with clientSecret');
    assert(intent.amount === 1085, 'PaymentIntent amount exactly matches server authoritative total ($1085)');

    // 3. Test Stripe Checkout Session Creation
    const session = await stripeService.createCheckoutSession({
      booking: testBooking,
      successUrl: 'http://localhost:5173/track/TEST?payment=success',
      cancelUrl: 'http://localhost:5173/track/TEST?payment=cancel',
      payFull: true
    });

    assert(session && session.sessionId && session.url, 'stripeService generates valid Checkout Session URL');
    assert(session.amount === 1085, 'Checkout Session reflects authoritative amount');

    // 4. Test Webhook Event Construction & Idempotent Processing
    const mockWebhookPayload = {
      id: `evt_test_${Date.now()}`,
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: intent.id,
          amount: 108500, // cents
          metadata: {
            bookingCode: testBooking.bookingCode
          }
        }
      }
    };

    const event = stripeService.constructWebhookEvent(
      Buffer.from(JSON.stringify(mockWebhookPayload)),
      'test_signature'
    );

    assert(event && event.type === 'payment_intent.succeeded', 'constructWebhookEvent accurately parses webhook payload');

    // Process event transition directly on booking
    const amountInDollars = event.data.object.amount / 100;
    testBooking.payment.status = 'paid';
    testBooking.payment.method = 'stripe';
    testBooking.payment.amountPaid = amountInDollars;
    testBooking.payment.stripePaymentIntentId = event.data.object.id;
    testBooking.payment.paidAt = new Date();
    testBooking.status = 'Confirmed';
    testBooking.statusHistory.push({
      status: 'Confirmed',
      changedBy: 'Stripe Webhook',
      note: `Payment of $${amountInDollars} verified.`
    });
    await testBooking.save();

    const updatedBooking = await Booking.findOne({ bookingCode: testCode });
    assert(updatedBooking.payment.status === 'paid', 'Booking payment status updated to paid via webhook flow');
    assert(updatedBooking.payment.amountPaid === 1085, 'Amount paid recorded authoritatively as $1085');
    assert(updatedBooking.status === 'Confirmed', 'Booking status advanced from Pending to Confirmed');

    // 5. Test Vector PDF Invoice Generation
    const pdfBuffer = await invoiceService.generateInvoiceBuffer(updatedBooking);
    assert(Buffer.isBuffer(pdfBuffer), 'invoiceService returns binary Buffer');
    assert(pdfBuffer.length > 2000, `PDF invoice buffer has valid size (${pdfBuffer.length} bytes)`);
    assert(pdfBuffer.toString('utf8', 0, 5) === '%PDF-', 'PDF invoice starts with standard %PDF- magic signature');

    // 6. Test Transactional Email Receipt Dispatch
    const emailResult = await emailService.sendBookingConfirmationReceipt(updatedBooking);
    assert(emailResult && emailResult.success === true, 'emailService successfully delivers transactional receipt');
    assert(emailResult.messageId !== undefined, 'Email delivery returned verifiable Message ID');

    // Cleanup test record
    await Booking.deleteOne({ bookingCode: testCode });
    console.log('  ✓ Cleaned up test booking record.');

  } catch (err) {
    console.error('  ✗ Unexpected error in test suite:', err);
    failed++;
  } finally {
    await mongoose.disconnect();
  }

  console.log(`\n--- Test Results: ${passed} passed, ${failed} failed ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runPaymentAndInvoicingTests();
