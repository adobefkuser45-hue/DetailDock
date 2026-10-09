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

const runHttpTest = async () => {
  console.log('====================================================');
  console.log('       DETAILDOCK HTTP REST ENDPOINTS TEST          ');
  console.log('====================================================\n');

  // Let DB connect if not already connected
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  const TEST_PORT = 5099;
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

  try {
    // 1. Health Endpoint
    console.log('--- 1. GET /api/v1/health ---');
    const healthRes = await fetch(`${baseUrl}/api/v1/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health endpoint returns 200 OK');
    assert(healthData.database.connected === true, 'Database status is Connected');

    // 2. Services Endpoint
    console.log('\n--- 2. GET /api/v1/services ---');
    const servicesRes = await fetch(`${baseUrl}/api/v1/services`);
    const servicesData = await servicesRes.json();
    assert(servicesRes.status === 200, 'Services endpoint returns 200 OK');
    assert(servicesData.success === true, 'Response envelope has success: true');
    assert(servicesData.data.length >= 3, `Returned ${servicesData.data.length} packages`);
    assert(servicesData.data[0].slug !== undefined, 'Package objects contain slug');

    // 3. Single Service Package by Slug
    console.log('\n--- 3. GET /api/v1/services/ceramic-shield ---');
    const singleRes = await fetch(`${baseUrl}/api/v1/services/ceramic-shield`);
    const singleData = await singleRes.json();
    assert(singleRes.status === 200, 'Single service endpoint returns 200 OK');
    assert(singleData.data.basePrice === 499, 'Ceramic shield base price is 499');

    // 4. Addons Endpoint
    console.log('\n--- 4. GET /api/v1/addons ---');
    const addonsRes = await fetch(`${baseUrl}/api/v1/addons`);
    const addonsData = await addonsRes.json();
    assert(addonsRes.status === 200, 'Addons endpoint returns 200 OK');
    assert(addonsData.data.length >= 5, `Returned ${addonsData.data.length} addons`);

    // 5. Vehicle Categories Endpoint
    console.log('\n--- 5. GET /api/v1/vehicles/categories ---');
    const vehRes = await fetch(`${baseUrl}/api/v1/vehicles/categories`);
    const vehData = await vehRes.json();
    assert(vehRes.status === 200, 'Vehicle categories endpoint returns 200 OK');
    assert(vehData.data.length >= 4, `Returned ${vehData.data.length} vehicle categories`);

    // 6. Pricing Calculation Endpoint (POST)
    console.log('\n--- 6. POST /api/v1/pricing/calculate ---');
    const pricingRes = await fetch(`${baseUrl}/api/v1/pricing/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleCategorySlug: 'compact-suv',
        packageSlug: 'essential-clean',
        addonSlugs: ['pet-hair-removal']
      })
    });
    const pricingData = await pricingRes.json();
    // Compact SUV (1.25x) * Essential Clean ($149) = 186.25
    // Addon: Pet Hair Removal ($55) = 55.00
    // Total: 241.25
    assert(pricingRes.status === 200, 'Pricing calculation returns 200 OK');
    assert(pricingData.data.summary.packageSubtotal === 186.25, 'Package subtotal is $186.25 (149 * 1.25)');
    assert(pricingData.data.summary.addonsSubtotal === 55.00, 'Addons subtotal is $55.00');
    assert(pricingData.data.summary.totalPrice === 241.25, 'Total calculated price is $241.25');

    // 7. Availability Endpoint
    console.log('\n--- 7. GET /api/v1/availability?date=2026-10-15 ---');
    const availRes = await fetch(`${baseUrl}/api/v1/availability?date=2026-10-15`);
    const availData = await availRes.json();
    assert(availRes.status === 200, 'Availability returns 200 OK');
    assert(availData.data.isOpen === true, 'Availability isOpen is true');
    assert(availData.data.slots.length === 4, '4 slots returned');
    assert(availData.data.slots[0].availableBays === 2, '2 available bays per slot initially');

    // 8. Studio Info Endpoint
    console.log('\n--- 8. GET /api/v1/availability/studio-info ---');
    const studioRes = await fetch(`${baseUrl}/api/v1/availability/studio-info`);
    const studioData = await studioRes.json();
    assert(studioRes.status === 200, 'Studio info returns 200 OK');
    assert(studioData.data.studioName === 'DetailDock Luxury Atelier', 'Studio name is correct');
    assert(studioData.data.maxBayCapacity === 2, 'Studio bay capacity is 2');

    // 9. Error Validation (Bad date format)
    console.log('\n--- 9. Error Handling: Invalid Date Format ---');
    const badDateRes = await fetch(`${baseUrl}/api/v1/availability?date=invalid-date`);
    const badDateData = await badDateRes.json();
    assert(badDateRes.status === 400, 'Rejects invalid date format with 400 Bad Request');
    assert(badDateData.error.code === 'INVALID_DATE_FORMAT', 'Error code is INVALID_DATE_FORMAT');

    console.log(`\n====================================================`);
    console.log(`  HTTP RESULTS: ${passed} / ${total} TESTS PASSED`);
    console.log(`====================================================\n`);

  } catch (err) {
    console.error('HTTP test encountered error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
};

runHttpTest();
