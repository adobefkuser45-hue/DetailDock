process.env.NODE_ENV = 'test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import app from '../server.js';
import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const runAuthAndAdminTests = async () => {
  console.log('====================================================');
  console.log('   DETAILDOCK AUTH & ADMIN OPERATIONS API TEST      ');
  console.log('====================================================\n');

  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  const TEST_PORT = 5097;
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

  let adminToken = '';
  let customerToken = '';
  let testBookingId = '';
  let testBookingCode = '';

  try {
    // 1. Admin Login
    console.log('--- 1. POST /api/v1/auth/login (Admin Credentials) ---');
    const adminLoginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@detaildock.com',
        password: 'DetailDockAdmin2026!'
      })
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, 'Admin login returns 200 OK');
    assert(adminLoginData.token && adminLoginData.token.length > 20, 'Admin JWT token received');
    assert(adminLoginData.data.user.role === 'admin', 'User role is admin');
    adminToken = adminLoginData.token;

    // 2. Customer Login
    console.log('\n--- 2. POST /api/v1/auth/login (Customer Credentials) ---');
    const custLoginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'alex@example.com',
        password: 'CustomerPass2026!'
      })
    });
    const custLoginData = await custLoginRes.json();
    assert(custLoginRes.status === 200, 'Customer login returns 200 OK');
    assert(custLoginData.data.user.role === 'customer', 'User role is customer');
    customerToken = custLoginData.token;

    // 3. Incorrect Password Rejection
    console.log('\n--- 3. POST /api/v1/auth/login (Bad Password) ---');
    const badLoginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@detaildock.com',
        password: 'WrongPassword999!'
      })
    });
    const badLoginData = await badLoginRes.json();
    assert(badLoginRes.status === 401, 'Bad credentials rejected with 401 Unauthorized');
    assert(badLoginData.error.code === 'INVALID_CREDENTIALS', 'Error code is INVALID_CREDENTIALS');

    // 4. Authenticated Profile (GET /api/v1/auth/me)
    console.log('\n--- 4. GET /api/v1/auth/me (Protected Route) ---');
    const meRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, 'Protected profile check returns 200 OK');
    assert(meData.data.user.email === 'admin@detaildock.com', 'Returns logged in admin profile');

    // 5. Role-Based Authorization Guard on Admin Endpoints
    console.log('\n--- 5. RBAC Protection on Admin Endpoints ---');
    // Without token -> 401
    const noTokenRes = await fetch(`${baseUrl}/api/v1/admin/bookings`);
    assert(noTokenRes.status === 401, 'Request without token rejected with 401 Unauthorized');

    // With customer token -> 403 Forbidden
    const custRbacRes = await fetch(`${baseUrl}/api/v1/admin/bookings`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const custRbacData = await custRbacRes.json();
    assert(custRbacRes.status === 403, 'Customer token accessing admin route rejected with 403 Forbidden');
    assert(custRbacData.error.code === 'FORBIDDEN', 'Error code is FORBIDDEN');

    // 6. Admin Booking Creation for Lifecycle Test
    console.log('\n--- 6. Setting Up Test Booking for Pipeline Workflow ---');
    const bookingRes = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'David Sterling',
          email: 'david.sterling@luxurytest.com',
          phone: '+1 555-4433'
        },
        vehicle: {
          make: 'Aston Martin',
          model: 'DB12',
          year: 2025,
          categorySlug: 'executive-coupe'
        },
        packageSlug: 'signature-detail',
        scheduledDate: '2026-10-23',
        scheduledTimeSlot: '01:00 PM'
      })
    });
    const bookingData = await bookingRes.json();
    assert(bookingRes.status === 201, 'Test booking created successfully');
    testBookingId = bookingData.data.id;
    testBookingCode = bookingData.data.bookingCode;

    // 7. Admin List Bookings with Status Badges
    console.log('\n--- 7. GET /api/v1/admin/bookings (Admin Authorized) ---');
    const adminBookingsRes = await fetch(`${baseUrl}/api/v1/admin/bookings`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminBookingsData = await adminBookingsRes.json();
    assert(adminBookingsRes.status === 200, 'Admin can list bookings');
    assert(adminBookingsData.statusCounts !== undefined, 'Status counts summary present for Kanban header');
    assert(adminBookingsData.statusCounts.Pending >= 1, `Pending status count is ${adminBookingsData.statusCounts.Pending}`);
    assert(adminBookingsData.data.some(b => b.bookingCode === testBookingCode), 'Created test booking found in list');

    // 8. Admin Status Transition: Pending -> Confirmed
    console.log('\n--- 8. PATCH /api/v1/admin/bookings/:id/status (Pending -> Confirmed) ---');
    const confirmRes = await fetch(`${baseUrl}/api/v1/admin/bookings/${testBookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        status: 'Confirmed',
        note: 'Deposit received. Bay 1 reserved.',
        adminNotes: 'VIP Client — provide complimentary espresso lounge access.'
      })
    });
    const confirmData = await confirmRes.json();
    assert(confirmRes.status === 200, 'Status update to Confirmed returns 200 OK');
    assert(confirmData.data.status === 'Confirmed', 'Booking status is now Confirmed');
    assert(confirmData.data.adminNotes.includes('VIP Client'), 'Admin notes updated');
    assert(confirmData.data.statusHistory.length === 2, 'Status history audit trail incremented to 2');

    // 9. Admin Status Transition: Confirmed -> In Bay
    console.log('\n--- 9. PATCH /api/v1/admin/bookings/:id/status (Confirmed -> In Bay) ---');
    const inBayRes = await fetch(`${baseUrl}/api/v1/admin/bookings/${testBookingCode}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        status: 'In Bay',
        note: 'Vehicle checked in. 2-stage paint correction commenced in Bay 1.'
      })
    });
    const inBayData = await inBayRes.json();
    assert(inBayRes.status === 200, 'Lookup by bookingCode for status update returns 200 OK');
    assert(inBayData.data.status === 'In Bay', 'Booking status is now In Bay');

    // 10. Admin Status Transition: In Bay -> Ready
    console.log('\n--- 10. PATCH /api/v1/admin/bookings/:id/status (In Bay -> Ready) ---');
    const readyRes = await fetch(`${baseUrl}/api/v1/admin/bookings/${testBookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        status: 'Ready',
        note: 'Scangrip inspection passed. Ceramic cured under IR lamps.'
      })
    });
    const readyData = await readyRes.json();
    assert(readyRes.status === 200, 'Status update to Ready returns 200 OK');
    assert(readyData.data.status === 'Ready', 'Booking status is now Ready');

    // 11. Admin Status Transition: Ready -> Completed
    console.log('\n--- 11. PATCH /api/v1/admin/bookings/:id/status (Ready -> Completed) ---');
    const completedRes = await fetch(`${baseUrl}/api/v1/admin/bookings/${testBookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        status: 'Completed',
        note: 'Customer keys handed over. Warranty package registered.'
      })
    });
    const completedData = await completedRes.json();
    assert(completedRes.status === 200, 'Status update to Completed returns 200 OK');
    assert(completedData.data.status === 'Completed', 'Booking status is now Completed');

    // 12. Invalid Status Transition Rejection
    console.log('\n--- 12. Invalid Status Rejection ---');
    const invalidStatusRes = await fetch(`${baseUrl}/api/v1/admin/bookings/${testBookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        status: 'FlyingCar'
      })
    });
    const invalidStatusData = await invalidStatusRes.json();
    assert(invalidStatusRes.status === 400, 'Invalid status rejected with 400 Bad Request');
    assert(invalidStatusData.error.code === 'INVALID_STATUS', 'Error code is INVALID_STATUS');

    // 13. Admin Dashboard Overview Statistics
    console.log('\n--- 13. GET /api/v1/admin/dashboard/stats ---');
    const statsRes = await fetch(`${baseUrl}/api/v1/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200, 'Dashboard stats returns 200 OK');
    assert(statsData.data.metrics.totalBookings >= 1, `Total bookings counted: ${statsData.data.metrics.totalBookings}`);
    assert(statsData.data.metrics.totalRevenue > 0, `Total revenue accumulated: $${statsData.data.metrics.totalRevenue}`);
    assert(statsData.data.recentBookings.length >= 1, 'Recent bookings list populated');

    // 14. Customer Self-Registration Endpoint (POST /api/v1/auth/register)
    console.log('\n--- 14. POST /api/v1/auth/register ---');
    const newCustomerEmail = `reg-test-${Date.now()}@detaildock.com`;
    const regRes = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Elena Rostova',
        email: newCustomerEmail,
        password: 'ClientSecret2026!',
        phone: '+1 555-8822'
      })
    });
    const regData = await regRes.json();
    assert(regRes.status === 201, 'Customer registration returns 201 Created');
    assert(regData.data.user.role === 'customer', 'Registered user assigned customer role');
    assert(regData.token !== undefined, 'Returns active JWT token upon registration');

    // Clean up test booking and registered test user
    await Booking.deleteMany({ 'customer.email': 'david.sterling@luxurytest.com' });
    await User.deleteMany({ email: newCustomerEmail });
    console.log('\n  Cleaned up temporary test records.');

    console.log(`\n====================================================`);
    console.log(`  AUTH & ADMIN RESULTS: ${passed} / ${total} TESTS PASSED`);
    console.log(`====================================================\n`);

  } catch (err) {
    console.error('Auth & Admin test encountered error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
};

runAuthAndAdminTests();
