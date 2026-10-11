process.env.NODE_ENV = 'test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import app from '../server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function runCMSTests() {
  console.log('================================================================');
  console.log('🧪 DetailDock Sovereign Admin & Studio CMS Integration Test Suite');
  console.log('================================================================\n');

  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  const TEST_PORT = 5098;
  const server = app.listen(TEST_PORT);
  const BASE_URL = `http://localhost:${TEST_PORT}/api/v1`;

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      process.exitCode = 1;
    }
  }

  try {
    // 1. Test Public CMS Endpoint
    console.log('[1/7] Testing Public CMS Endpoint (GET /cms/content)...');
    const pubRes = await fetch(`${BASE_URL}/cms/content`);
    const pubData = await pubRes.json();
    assert(pubRes.status === 200, 'Public CMS endpoint returns HTTP 200 OK');
    assert(pubData.success === true, 'Public CMS response has success: true');
    assert(pubData.data?.announcementBanner !== undefined, 'Contains announcementBanner object');
    assert(pubData.data?.hero !== undefined, 'Contains hero configuration');
    assert(Array.isArray(pubData.data?.beforeAfterShowcase), 'Contains beforeAfterShowcase array');
    assert(Array.isArray(pubData.data?.testimonials), 'Contains testimonials array');

    // 2. Test Admin Route Guard Without Token
    console.log('\n[2/7] Testing Admin Route Security Guard (GET /cms/admin/content without token)...');
    const unauthRes = await fetch(`${BASE_URL}/cms/admin/content`);
    assert(unauthRes.status === 401, 'Unauthorized request correctly blocked with HTTP 401');

    // 3. Authenticate Admin
    console.log('\n[3/7] Authenticating Sovereign Studio Admin...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@detaildock.com',
        password: process.env.ADMIN_SEED_PASSWORD || 'DetailDockAdmin2026!'
      })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200, 'Admin login returns HTTP 200');
    const adminToken = loginData.token;
    assert(Boolean(adminToken), 'JWT admin token issued successfully');

    // 4. Test Admin CMS Fetch With Token
    console.log('\n[4/7] Testing Admin CMS Content Access (GET /cms/admin/content with Bearer token)...');
    const adminRes = await fetch(`${BASE_URL}/cms/admin/content`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminData = await adminRes.json();
    assert(adminRes.status === 200, 'Admin CMS fetch returns HTTP 200');
    assert(adminData.data?.hero?.headline !== undefined, 'Hero headline exists in admin payload');

    // 5. Test Dynamic CMS Mutation (PATCH /cms/admin/content)
    console.log('\n[5/7] Testing Dynamic CMS Update & Instant Propagation...');
    const originalBanner = adminData.data.announcementBanner;
    const testMessage = `🔥 Atelier Testing Notice (${Date.now()}): Ceramic IR Active`;
    const updateRes = await fetch(`${BASE_URL}/cms/admin/content`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        announcementBanner: {
          ...originalBanner,
          message: testMessage,
          isActive: true
        }
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, 'CMS PATCH returns HTTP 200');
    assert(updateData.data?.announcementBanner?.message === testMessage, 'Returned banner message matches updated string');

    // 6. Test Public Reflection of Updated CMS Without Code Deployment
    console.log('\n[6/7] Verifying Live Public Reflection (GET /cms/content)...');
    const reflectRes = await fetch(`${BASE_URL}/cms/content`);
    const reflectData = await reflectRes.json();
    assert(reflectRes.status === 200, 'Public CMS fetch returns HTTP 200');
    assert(reflectData.data?.announcementBanner?.message === testMessage, 'Public customer website immediately reflects admin CMS update without deployment');

    // 7. Test Reset To Defaults (POST /cms/admin/reset)
    console.log('\n[7/7] Testing Reset To Factory Defaults (POST /cms/admin/reset)...');
    const resetRes = await fetch(`${BASE_URL}/cms/admin/reset`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const resetData = await resetRes.json();
    assert(resetRes.status === 200, 'Reset returns HTTP 200 OK');
    assert(resetData.data?.announcementBanner?.badgeText === 'LIMITED ATELIER APPOINTMENTS', 'Defaults restored correctly');

    console.log('\n================================================================');
    console.log(`📊 Test Results: ${passed}/${total} checks passed (${Math.round((passed / total) * 100)}%)`);
    console.log('================================================================');

  } catch (err) {
    console.error('Fatal test error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
    await mongoose.connection.close();
  }
}

runCMSTests();
