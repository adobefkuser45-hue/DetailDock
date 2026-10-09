import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Booking } from '../models/Booking.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const RENDER_BASE = 'https://detaildock-api.onrender.com/api/v1';
const VERCEL_URL = 'https://client-mauve-zeta-13.vercel.app';

async function testLiveProduction() {
  console.log('====================================================');
  console.log('   DETAILDOCK LIVE CLOUD PRODUCTION SMOKE TEST      ');
  console.log('====================================================');

  let passed = 0;
  let failed = 0;

  function assert(cond, name) {
    if (cond) {
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${name}`);
      failed++;
    }
  }

  // 1. Backend Health
  try {
    console.log('\n--- 1. Testing Live Render Backend Health ---');
    const healthRes = await fetch(`${RENDER_BASE}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200, 'Render /health returns 200 OK');
    assert(healthJson.database?.connected === true, 'Database status is Connected on Atlas');
    console.log(`     Database: ${healthJson.database?.status} (Environment: ${healthJson.environment})`);
  } catch (err) {
    console.error('  ✗ Health test failed:', err.message);
    failed++;
  }

  // 2. Public Catalog
  try {
    console.log('\n--- 2. Testing Live Catalog ---');
    const servicesRes = await fetch(`${RENDER_BASE}/services`);
    const servicesJson = await servicesRes.json();
    assert(servicesRes.status === 200, 'Render /services returns 200 OK');
    assert(servicesJson.data?.length >= 3, `Found ${servicesJson.data?.length} active packages`);
  } catch (err) {
    console.error('  ✗ Services test failed:', err.message);
    failed++;
  }

  // 3. Live Booking & PDF Invoice Streaming from Render
  let liveBookingCode = null;
  try {
    console.log('\n--- 3. Testing Live Appointment Booking & PDF Invoicing ---');
    const bookingPayload = {
      customer: {
        name: 'Julian Sterling',
        email: 'julian.sterling@liveproductiontest.com',
        phone: '+1 (555) 839-2019'
      },
      vehicle: {
        make: 'Aston Martin',
        model: 'DBS Superleggera',
        year: 2024,
        categorySlug: 'executive-coupe',
        paintColor: 'Hyper Red'
      },
      packageSlug: 'signature-detail',
      addonSlugs: ['engine-bay-clean'],
      scheduledDate: '2026-11-25',
      scheduledTimeSlot: '11:00 AM',
      paymentMethod: 'studio_pay'
    };

    const bookRes = await fetch(`${RENDER_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
    });
    const bookJson = await bookRes.json();
    if (bookRes.status !== 201) {
      console.error('     Booking creation error details:', bookJson);
    }

    assert(bookRes.status === 201, 'POST /bookings on Render returns 201 Created');
    assert(bookJson.data?.bookingCode !== undefined, `Live Booking created with code: ${bookJson.data?.bookingCode}`);
    liveBookingCode = bookJson.data?.bookingCode;

    // Test downloading PDF invoice live from Render!
    const invoiceRes = await fetch(`${RENDER_BASE}/bookings/${liveBookingCode}/invoice`);
    const invoiceBuffer = Buffer.from(await invoiceRes.arrayBuffer());

    assert(invoiceRes.status === 200, `GET /bookings/${liveBookingCode}/invoice returns 200 OK`);
    assert(invoiceRes.headers.get('content-type') === 'application/pdf', 'Invoice Content-Type is application/pdf');
    assert(invoiceBuffer.toString('utf8', 0, 5) === '%PDF-', 'Live streamed PDF starts with %PDF-');
    assert(invoiceBuffer.length > 2000, `Live PDF size verified: ${invoiceBuffer.length} bytes`);
    console.log(`     Live PDF Invoice generated & streamed from Render: ${invoiceBuffer.length} bytes`);

  } catch (err) {
    console.error('  ✗ Live booking/invoice test failed:', err.message);
    failed++;
  }

  // 4. Test Vercel Production Frontend
  try {
    console.log('\n--- 4. Testing Vercel Production Frontend ---');
    const vercelRes = await fetch(VERCEL_URL);
    const vercelHtml = await vercelRes.text();
    assert(vercelRes.status === 200, `Vercel frontend returns 200 OK at ${VERCEL_URL}`);
    assert(vercelHtml.includes('DetailDock'), 'Vercel HTML contains DetailDock title/branding');
    console.log(`     Vercel Server: ${vercelRes.headers.get('server')}`);
  } catch (err) {
    console.error('  ✗ Vercel test failed:', err.message);
    failed++;
  }

  // 5. Test Live Public Studio Settings API
  try {
    console.log('\n--- 5. Testing Live Public Studio Settings API ---');
    const studioRes = await fetch(`${RENDER_BASE}/studio/settings`);
    const studioJson = await studioRes.json();
    assert(studioRes.status === 200, 'Render /studio/settings returns 200 OK');
    assert(!!studioJson.data?.studioName, `Live Studio Name: ${studioJson.data?.studioName}`);
    assert(!!studioJson.data?.contactPhone, `Live Concierge Phone: ${studioJson.data?.contactPhone}`);
  } catch (err) {
    console.error('  ✗ Studio settings test failed:', err.message);
    failed++;
  }

  // Cleanup live test booking from Atlas
  if (liveBookingCode) {
    try {
      await connectDB();
      await Booking.deleteOne({ bookingCode: liveBookingCode });
      console.log(`\n  ✓ Cleaned up live test booking record ${liveBookingCode} from MongoDB Atlas.`);
      await mongoose.disconnect();
    } catch (cleanErr) {
      console.warn('Cleanup note:', cleanErr.message);
    }
  }

  console.log('\n====================================================');
  console.log(`   LIVE SMOKE RESULTS: ${passed} passed, ${failed} failed `);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

testLiveProduction();
