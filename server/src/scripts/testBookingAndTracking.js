process.env.NODE_ENV = 'test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import app from '../server.js';
import { Booking } from '../models/Booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const runBookingTests = async () => {
  console.log('====================================================');
  console.log('   DETAILDOCK BOOKING & TRACKING ENDPOINTS TEST     ');
  console.log('====================================================\n');

  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  const TEST_PORT = 5098;
  const server = app.listen(TEST_PORT);
  const baseUrl = `http://localhost:${TEST_PORT}`;

  let passed = 0;
  let total = 0;

  const assert = (condition, title) => {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${title}`);
      process.exitCode = 1;
    }
  };

  const testEmail = 'alex.mercer@testluxury.com';
  const testDate = '2026-10-22'; // Thursday
  const testSlot = '11:00 AM';

  try {
    // Clean up any previous test bookings
    await Booking.deleteMany({ 'customer.email': testEmail });

    // 1. Create Booking (Bay 1)
    console.log('--- 1. POST /api/v1/bookings (Create First Booking) ---');
    const createRes1 = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'Alex Mercer',
          email: testEmail,
          phone: '+1 (555) 789-1234'
        },
        vehicle: {
          make: 'Porsche',
          model: '911 GT3 RS',
          year: 2025,
          categorySlug: 'executive-coupe',
          licensePlate: 'LUX-911',
          paintColor: 'Agate Grey Metallic'
        },
        packageSlug: 'ceramic-shield',
        addonSlugs: ['engine-bay-clean', 'wheel-caliper-ceramic'],
        scheduledDate: testDate,
        scheduledTimeSlot: testSlot,
        notes: 'Please pay extra attention to front splitter clearance.'
      })
    });

    const createData1 = await createRes1.json();
    assert(createRes1.status === 201, 'Booking 1 returns 201 Created');
    assert(createData1.success === true, 'Response envelope has success: true');
    assert(/^DD-[0-9A-Z]{6}$/.test(createData1.data.bookingCode), `Generated valid tracking code format: ${createData1.data.bookingCode}`);
    assert(createData1.data.assignedBayNumber === 1, 'First booking assigned to Bay 1');
    assert(createData1.data.status === 'Pending', 'Initial status is Pending');
    // Expected price: (499 * 1.1 = 548.90) + (75 + 180 = 255.00) = 803.90
    assert(createData1.data.totalPrice === 803.90, 'Authoritative total price is accurately calculated as $803.90');

    const generatedCode1 = createData1.data.bookingCode;

    // 2. Public Status Tracking: Lookup via code
    console.log(`\n--- 2. GET /api/v1/bookings/track/${generatedCode1} ---`);
    const trackRes1 = await fetch(`${baseUrl}/api/v1/bookings/track/${generatedCode1}`);
    const trackData1 = await trackRes1.json();

    assert(trackRes1.status === 200, 'Tracking endpoint returns 200 OK');
    assert(trackData1.data.bookingCode === generatedCode1, 'Booking code matches queried code');
    assert(trackData1.data.status === 'Pending', 'Status is Pending');
    assert(trackData1.data.progress.currentStep === 1, 'Progress current step is 1 (Appointment Requested)');
    assert(trackData1.data.customer.maskedEmail === 'a***r@testluxury.com', `Customer email is privacy-masked: ${trackData1.data.customer.maskedEmail}`);
    assert(trackData1.data.customer.maskedPhone === '***-***-1234', `Customer phone is privacy-masked: ${trackData1.data.customer.maskedPhone}`);
    assert(trackData1.data.vehicle.make === 'Porsche' && trackData1.data.vehicle.model === '911 GT3 RS', 'Vehicle details present');
    assert(trackData1.data.service.totalPrice === 803.90, 'Pricing snapshot preserved at $803.90');
    assert(trackData1.data.timeline.length >= 1, 'Timeline history entry present');

    // 3. Tracking Case-Insensitive & Without DD- prefix
    console.log('\n--- 3. GET /api/v1/bookings/track/ (Prefix-agnostic lookup) ---');
    const rawCodeWithoutPrefix = generatedCode1.replace('DD-', '').toLowerCase();
    const trackResAgnostic = await fetch(`${baseUrl}/api/v1/bookings/track/${rawCodeWithoutPrefix}`);
    const trackDataAgnostic = await trackResAgnostic.json();
    assert(trackResAgnostic.status === 200, 'Case-insensitive lookup without DD- prefix returns 200 OK');
    assert(trackDataAgnostic.data.bookingCode === generatedCode1, 'Resolved exact booking record');

    // 4. Fill Bay 2 in same slot
    console.log('\n--- 4. POST /api/v1/bookings (Fill Bay 2 in Same Slot) ---');
    const createRes2 = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'Sarah Jenkins',
          email: testEmail,
          phone: '+1 (555) 234-5678'
        },
        vehicle: {
          make: 'BMW',
          model: 'M4 Competition',
          year: 2024,
          categorySlug: 'sedan'
        },
        packageSlug: 'essential-clean',
        scheduledDate: testDate,
        scheduledTimeSlot: testSlot
      })
    });

    const createData2 = await createRes2.json();
    assert(createRes2.status === 201, 'Booking 2 returns 201 Created');
    assert(createData2.data.assignedBayNumber === 2, 'Second booking assigned to Bay 2');

    // 5. Attempt 3rd Booking in same slot -> Should be Blocked with 409
    console.log('\n--- 5. POST /api/v1/bookings (Attempt 3rd Booking in Full Slot) ---');
    const createRes3 = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'Marcus Vance',
          email: testEmail,
          phone: '+1 (555) 999-0000'
        },
        vehicle: {
          make: 'Audi',
          model: 'RS6 Avant',
          year: 2023,
          categorySlug: 'sedan'
        },
        packageSlug: 'essential-clean',
        scheduledDate: testDate,
        scheduledTimeSlot: testSlot
      })
    });

    const createData3 = await createRes3.json();
    assert(createRes3.status === 409, 'Over-capacity booking rejected with HTTP 409 Conflict');
    assert(createData3.error.code === 'SLOT_CAPACITY_EXCEEDED', 'Error code matches SLOT_CAPACITY_EXCEEDED');

    // 6. Validation Error: Invalid Email Format
    console.log('\n--- 6. Error Handling: Invalid Email Format ---');
    const badEmailRes = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'Bad Email User',
          email: 'not-an-email',
          phone: '+1 555-0000'
        },
        vehicle: {
          make: 'Tesla',
          model: 'Model S',
          year: 2023,
          categorySlug: 'sedan'
        },
        packageSlug: 'essential-clean',
        scheduledDate: testDate,
        scheduledTimeSlot: '01:00 PM'
      })
    });

    const badEmailData = await badEmailRes.json();
    assert(badEmailRes.status === 400, 'Rejects invalid email with 400 Bad Request');
    assert(badEmailData.error.code === 'INVALID_EMAIL_FORMAT', 'Error code is INVALID_EMAIL_FORMAT');

    // 7. Tracking 404 on Non-existent Code
    console.log('\n--- 7. Error Handling: Non-existent Tracking Code ---');
    const notFoundTrack = await fetch(`${baseUrl}/api/v1/bookings/track/DD-DOESNOTEXIST`);
    const notFoundData = await notFoundTrack.json();
    assert(notFoundTrack.status === 404, 'Non-existent code returns 404 Not Found');
    assert(notFoundData.error.code === 'BOOKING_NOT_FOUND', 'Error code is BOOKING_NOT_FOUND');

    // Clean up test bookings
    await Booking.deleteMany({ 'customer.email': testEmail });
    console.log('\n  Cleaned up temporary test bookings.');

    console.log(`\n====================================================`);
    console.log(`  BOOKING RESULTS: ${passed} / ${total} TESTS PASSED`);
    console.log(`====================================================\n`);

  } catch (err) {
    console.error('Booking test encountered error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
};

runBookingTests();
