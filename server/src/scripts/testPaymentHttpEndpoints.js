import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Booking } from '../models/Booking.js';
import { startServer } from '../server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const bodyBuffer = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: bodyBuffer
        });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runHttpPaymentTests() {
  console.log('--- [DetailDock]: Starting Payment & Invoice HTTP API Integration Tests ---');
  const TEST_PORT = 5098;
  const server = await startServer(TEST_PORT);

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

  const testCode = `DD-HTTPAY-${Date.now().toString().slice(-4)}`;

  try {
    // 1. Create a baseline booking in DB
    const booking = await Booking.create({
      bookingCode: testCode,
      customer: {
        name: 'Victoria Hawthorne',
        email: 'victoria.hawthorne@luxurytest.com',
        phone: '+1 (555) 723-9912'
      },
      vehicle: {
        make: 'Mercedes-Benz',
        model: 'G 63 AMG',
        year: 2025,
        categoryName: 'Full-Size Luxury SUV',
        categorySlug: 'full-suv',
        multiplierApplied: 1.45,
        licensePlate: 'G63AMG',
        paintColor: 'Designo Magno Platinum'
      },
      packageSnapshot: {
        title: 'Bespoke Concours Preservation & Paint Protection',
        basePrice: 1200,
        calculatedPrice: 1740,
        durationMinutes: 480
      },
      addonsSnapshot: [
        {
          title: 'Full Wheels-Off Caliper Ceramic Shield',
          price: 250,
          durationMinutes: 60
        }
      ],
      totalPrice: 1990,
      totalDurationMinutes: 540,
      scheduledDate: new Date('2026-11-28T00:00:00Z'),
      scheduledTimeSlot: '13:00 - 17:00',
      bayNumber: 2,
      status: 'Pending',
      payment: {
        status: 'unpaid',
        method: 'unselected',
        amountPaid: 0,
        depositAmount: 0
      }
    });

    assert(booking && booking.bookingCode === testCode, 'Baseline booking created for HTTP testing');

    // 2. Test POST /api/v1/payments/create-intent
    const createIntentPayload = JSON.stringify({
      bookingCode: testCode,
      payFull: true
    });

    const intentRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/v1/payments/create-intent',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(createIntentPayload)
      }
    }, createIntentPayload);

    const intentJson = JSON.parse(intentRes.body.toString('utf8'));
    assert(intentRes.statusCode === 200, 'POST /api/v1/payments/create-intent returns 200 OK');
    assert(intentJson.success === true, 'Response contains success: true');
    assert(intentJson.data.amount === 1990, 'Response amount matches authoritative total ($1990)');
    assert(intentJson.data.clientSecret !== undefined, 'Response contains clientSecret');

    // 3. Test POST /api/v1/payments/create-checkout-session
    const checkoutPayload = JSON.stringify({
      bookingCode: testCode,
      payFull: false,
      depositAmount: 150
    });

    const checkoutRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/v1/payments/create-checkout-session',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(checkoutPayload)
      }
    }, checkoutPayload);

    const checkoutJson = JSON.parse(checkoutRes.body.toString('utf8'));
    assert(checkoutRes.statusCode === 200, 'POST /api/v1/payments/create-checkout-session returns 200 OK');
    assert(checkoutJson.data.url !== undefined, 'Checkout session URL returned');
    assert(checkoutJson.data.amount === 150, 'Checkout session deposit amount matches requested $150');

    // 4. Test POST /api/v1/payments/confirm-studio-pay
    const studioPayPayload = JSON.stringify({
      bookingCode: testCode
    });

    const studioPayRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/v1/payments/confirm-studio-pay',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(studioPayPayload)
      }
    }, studioPayPayload);

    const studioPayJson = JSON.parse(studioPayRes.body.toString('utf8'));
    assert(studioPayRes.statusCode === 200, 'POST /api/v1/payments/confirm-studio-pay returns 200 OK');
    assert(studioPayJson.data.payment.method === 'studio_pay', 'Booking payment method updated to studio_pay');
    assert(studioPayJson.data.status === 'Confirmed', 'Booking status confirmed to secure bay slot');

    // 5. Test POST /api/v1/payments/webhook with payment_intent.succeeded
    const webhookEvent = {
      id: `evt_mock_${Date.now()}`,
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: intentJson.data.paymentIntentId,
          amount: 199000,
          metadata: {
            bookingCode: testCode
          }
        }
      }
    };
    const webhookPayload = JSON.stringify(webhookEvent);

    const webhookRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/v1/payments/webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(webhookPayload),
        'stripe-signature': 'simulated_sig'
      }
    }, webhookPayload);

    const webhookJson = JSON.parse(webhookRes.body.toString('utf8'));
    assert(webhookRes.statusCode === 200, 'POST /api/v1/payments/webhook returns 200 OK');
    assert(webhookJson.received === true, 'Webhook acknowledged with { received: true }');

    // Verify booking in DB after webhook
    const verifiedBooking = await Booking.findOne({ bookingCode: testCode });
    assert(verifiedBooking.payment.status === 'paid', 'Booking payment status transitioned to "paid"');
    assert(verifiedBooking.payment.amountPaid === 1990, 'Booking payment.amountPaid recorded as 1990');

    // 6. Test GET /api/v1/bookings/:code/invoice
    const invoiceRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: `/api/v1/bookings/${testCode}/invoice`,
      method: 'GET'
    });

    assert(invoiceRes.statusCode === 200, `GET /api/v1/bookings/${testCode}/invoice returns 200 OK`);
    assert(invoiceRes.headers['content-type'] === 'application/pdf', 'Invoice Content-Type is application/pdf');
    assert(
      invoiceRes.headers['content-disposition'].includes(`DetailDock_Invoice_${testCode}.pdf`),
      'Content-Disposition attachment filename contains booking code'
    );
    assert(invoiceRes.body.toString('utf8', 0, 5) === '%PDF-', 'Downloaded content starts with %PDF-');
    assert(invoiceRes.body.length > 2000, `Downloaded PDF size is valid (${invoiceRes.body.length} bytes)`);

    // 7. Test POST /api/v1/bookings/:code/resend-receipt
    const resendRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: `/api/v1/bookings/${testCode}/resend-receipt`,
      method: 'POST'
    });

    const resendJson = JSON.parse(resendRes.body.toString('utf8'));
    assert(resendRes.statusCode === 200, 'POST /api/v1/bookings/:code/resend-receipt returns 200 OK');
    assert(resendJson.success === true, 'Receipt resend returned success');

    // Cleanup
    await Booking.deleteOne({ bookingCode: testCode });
    console.log('  ✓ Cleaned up HTTP test booking record.');

  } catch (err) {
    console.error('  ✗ Unexpected HTTP test error:', err);
    failed++;
  } finally {
    server.close();
    await mongoose.disconnect();
  }

  console.log(`\n--- HTTP Test Results: ${passed} passed, ${failed} failed ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runHttpPaymentTests();
