/**
 * DetailDock Security & OWASP Top 10 Mitigation Verification Suite
 * Validates BOLA/IDOR, Price Tampering, Helmet Security Headers,
 * NoSQL Injection, Input Validation, and Password Hashing.
 */

process.env.NODE_ENV = 'test';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from '../server.js';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Booking } from '../models/Booking.js';
import { ServicePackage } from '../models/ServicePackage.js';
import { VehicleCategory } from '../models/VehicleCategory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

let server;
let baseUrl;

const makeRequest = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: parsed
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
};

const runSecurityTests = async () => {
  console.log('====================================================');
  console.log('  DETAILDOCK OWASP TOP 10 SECURITY AUDIT TEST SUITE');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  const assert = (condition, message) => {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
    }
  };

  try {
    await connectDB();

    server = http.createServer(app);
    await new Promise((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        console.log(`[Security Test]: Server live at ${baseUrl}\n`);
        resolve();
      });
    });

    // -------------------------------------------------------------------------
    // 1. HELMET SECURITY HEADERS VERIFICATION
    // -------------------------------------------------------------------------
    console.log('--- 1. Testing Helmet HTTP Security Headers ---');
    const healthRes = await makeRequest('GET', '/api/v1/health');
    assert(healthRes.status === 200, 'Health endpoint responds with 200 OK');
    assert(healthRes.headers['x-dns-prefetch-control'] === 'off', 'Header X-DNS-Prefetch-Control is off');
    assert(healthRes.headers['x-frame-options'] === 'SAMEORIGIN' || healthRes.headers['x-frame-options'] === 'DENY', 'Header X-Frame-Options is SAMEORIGIN / DENY (Clickjacking protection)');
    assert(healthRes.headers['x-content-type-options'] === 'nosniff', 'Header X-Content-Type-Options is nosniff (MIME sniffing prevention)');
    assert(healthRes.headers['x-download-options'] === 'noopen', 'Header X-Download-Options is noopen');
    assert(!healthRes.headers['x-powered-by'], 'Header X-Powered-By is suppressed (Fingerprinting mitigation)');

    // -------------------------------------------------------------------------
    // 2. BOLA / IDOR PREVENTION & PII SANITIZATION
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Testing BOLA / IDOR & PII Sanitization ---');
    
    // Purge any stale test bookings from prior runs
    await Booking.deleteMany({ 'customer.email': /.*@luxurytest\.com/ });

    // Seed a known test booking
    const testPkg = await ServicePackage.findOne().lean();
    const testCat = await VehicleCategory.findOne().lean();

    const createSampleRes = await makeRequest('POST', '/api/v1/bookings', {
      customer: {
        name: 'Private Client',
        email: 'private.client@luxurytest.com',
        phone: '+1 (555) 948-2201'
      },
      vehicle: {
        categorySlug: testCat?.slug || 'executive-coupe',
        make: 'Porsche',
        model: 'Taycan Turbo S',
        year: 2024,
        licensePlate: 'SECRET99'
      },
      packageSlug: testPkg?.slug || 'ceramic-shield',
      addonSlugs: [],
      scheduledDate: '2026-11-20',
      scheduledTimeSlot: '09:00 - 13:00'
    });

    const sampleBooking = createSampleRes.data?.data || {};
    const testCode = sampleBooking.bookingCode;

    // Public tracking query
    const publicTrackRes = await makeRequest('GET', `/api/v1/bookings/track/${testCode}`);
    assert(publicTrackRes.status === 200, 'Public tracking endpoint returns 200 for valid code');
    assert(publicTrackRes.data?.data?.bookingCode === testCode, 'Public tracking matches requested bookingCode');
    
    // Verify phone is masked
    const trackedPhone = publicTrackRes.data?.data?.customer?.maskedPhone;
    assert(trackedPhone && (trackedPhone.includes('*') || trackedPhone.startsWith('+1 (***)')), `Phone number is properly masked for public privacy: ${trackedPhone}`);
    
    // Verify full private email is NOT exposed in public response
    const trackedEmail = publicTrackRes.data?.data?.customer?.maskedEmail || publicTrackRes.data?.data?.customer?.email;
    assert(trackedEmail && trackedEmail.includes('*'), `Customer email is privacy-masked: ${trackedEmail}`);

    // Attempt direct IDOR access to admin endpoint without auth
    const idorAdminRes = await makeRequest('GET', `/api/v1/admin/bookings/${sampleBooking._id}`);
    assert(idorAdminRes.status === 401, 'Unauthorized access to admin booking detail rejected with 401');

    if (sampleBooking._id) {
      await Booking.findByIdAndDelete(sampleBooking._id);
    }

    // -------------------------------------------------------------------------
    // 3. SERVER PRICING AUTHORITY (PRICE TAMPERING MITIGATION)
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Testing Price Tampering Defense (Server Pricing Authority) ---');

    await Booking.deleteMany({ 'customer.email': 'tamper@test.com' });

    // Attacker sends falsified totalPrice: $1.00 for a multi-hundred dollar package
    const tamperedPayload = {
      customer: {
        name: 'Tamper Tester',
        email: 'tamper@test.com',
        phone: '+1 (555) 123-4567'
      },
      vehicle: {
        categorySlug: testCat?.slug || 'executive-coupe',
        make: 'Ferrari',
        model: 'F8 Tributo',
        year: 2023,
        paintColor: 'Rosso Corsa',
        licensePlate: 'TAMPER1'
      },
      packageSlug: testPkg?.slug || 'ceramic-shield',
      packageSnapshot: {
        title: testPkg?.title || 'Package',
        basePrice: 1.00, // Attempted tamper
        calculatedPrice: 1.00 // Attempted tamper
      },
      addonSlugs: [],
      scheduledDate: '2026-11-25',
      scheduledTimeSlot: '13:00 - 17:00',
      totalPrice: 1.00 // Attempted tamper: paying $1.00
    };

    const tamperRes = await makeRequest('POST', '/api/v1/bookings', tamperedPayload);
    assert(tamperRes.status === 201, 'Booking submission created');
    
    // Server must calculate the real authoritative price
    const createdBooking = tamperRes.data.data;
    assert(createdBooking.totalPrice > 1.00, `Server overrode client's $1.00 price tampering with authoritative total: $${createdBooking.totalPrice}`);
    assert(createdBooking.totalPrice >= (testPkg?.basePrice || 200), 'Total price respects authoritative catalog base price');

    // Clean up created booking
    if (createdBooking?._id) {
      await Booking.findByIdAndDelete(createdBooking._id);
    }

    // -------------------------------------------------------------------------
    // 4. NOSQL OPERATOR INJECTION PREVENTION
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Testing NoSQL Operator Injection Resilience ---');

    // Payload trying to use MongoDB query operator $gt
    const nosqlLoginPayload = {
      email: { "$gt": "" },
      password: "password123"
    };

    const nosqlRes = await makeRequest('POST', '/api/v1/auth/login', nosqlLoginPayload);
    assert(nosqlRes.status === 400 || nosqlRes.status === 401, `NoSQL operator injection in auth rejected with status ${nosqlRes.status}`);
    assert(nosqlRes.data.success === false, 'NoSQL operator injection failed to authenticate');

    // -------------------------------------------------------------------------
    // 5. INPUT VALIDATION & MASS ASSIGNMENT DEFENSE
    // -------------------------------------------------------------------------
    console.log('\n--- 5. Testing Input Validation Integrity ---');

    // Empty payload
    const emptyRes = await makeRequest('POST', '/api/v1/bookings', {});
    assert(emptyRes.status === 400, 'Empty booking request rejected with 400 Bad Request');
    assert(emptyRes.data.code === 'VALIDATION_ERROR' || emptyRes.data.error, 'Returns structured validation error');

    // Malformed email
    const invalidEmailPayload = {
      ...tamperedPayload,
      customer: {
        ...tamperedPayload.customer,
        email: 'not-an-email-address'
      }
    };
    const invalidEmailRes = await makeRequest('POST', '/api/v1/bookings', invalidEmailPayload);
    assert(invalidEmailRes.status === 400, 'Malformed customer email rejected with 400 Bad Request');

    // -------------------------------------------------------------------------
    // 6. PASSWORD HASHING & CREDENTIAL ENCRYPTION (BCRYPT)
    // -------------------------------------------------------------------------
    console.log('\n--- 6. Testing Password Hashing & Bcrypt Cost Factor ---');
    
    const adminUser = await User.findOne({ role: 'admin' }).select('+password').lean();
    assert(!!adminUser, 'Admin user found in database');
    assert(adminUser?.password && (adminUser.password.startsWith('$2a$') || adminUser.password.startsWith('$2b$')), 'Password is securely hashed with bcrypt ($2a$/$2b$ algorithm)');
    assert(adminUser?.password?.length >= 59, 'Bcrypt hash length is valid (>= 60 characters)');

    // -------------------------------------------------------------------------
    // 7. CLEAN ERROR HANDLING (NO STACK TRACE LEAKAGE)
    // -------------------------------------------------------------------------
    console.log('\n--- 7. Testing Production Error Handling & Stack Trace Suppression ---');

    const notFoundRes = await makeRequest('GET', '/api/v1/non-existent-route-9988');
    assert(notFoundRes.status === 404, 'Non-existent route returns 404');
    assert(!notFoundRes.data.stack, 'Stack trace is not leaked in error payload');

    // Clean up sample booking
    await Booking.findByIdAndDelete(sampleBooking._id);

    console.log('\n====================================================');
    console.log(`  OWASP SECURITY AUDIT RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
    console.log('====================================================\n');

    process.exit(totalTests === passedTests ? 0 : 1);
  } catch (err) {
    console.error('Security test suite fatal failure:', err);
    process.exit(1);
  } finally {
    if (server) server.close();
    await mongoose.disconnect();
  }
};

runSecurityTests();
