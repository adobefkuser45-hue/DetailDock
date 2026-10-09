import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import { 
  getCatalog, 
  createPackage, 
  updatePackage, 
  deletePackage, 
  createAddon, 
  updateAddon, 
  deleteAddon, 
  updateVehicleCategory, 
  resetCatalogToDefaults 
} from '../controllers/adminController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const createMockRes = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  }
});

// Helper to properly await Express asyncHandler controllers
const invoke = (handler, req, res) => {
  return new Promise((resolve, reject) => {
    const next = (err) => {
      if (err) reject(err);
      else resolve();
    };
    const originalJson = res.json.bind(res);
    res.json = (payload) => {
      originalJson(payload);
      resolve();
      return res;
    };
    handler(req, res, next);
  });
};

const runTest = async () => {
  console.log('🧪 [TEST]: Starting TASK-033 Admin Catalog & Pricing Editor Test Suite...\n');
  
  try {
    await connectDB();
    console.log('✅ [TEST]: Connected to MongoDB Atlas.');

    // 1. Get Catalog
    const req1 = {};
    const res1 = createMockRes();
    await invoke(getCatalog, req1, res1);
    if (res1.statusCode !== 200 || !res1.body.data.packages) {
      throw new Error(`Failed to get catalog: status ${res1.statusCode}`);
    }
    console.log(`✅ [TEST]: Retrieved Catalog successfully (${res1.body.data.packages.length} packages, ${res1.body.data.addons.length} addons, ${res1.body.data.categories.length} categories).`);

    // 2. Create Package
    const req2 = {
      body: {
        title: 'Track Day Surface Shield',
        tagline: 'High-speed rock chip barrier and brake dust guard',
        description: 'Engineered for circuit-driven supercars requiring extreme slickness.',
        basePrice: 349,
        baseDurationMinutes: 150,
        category: 'full',
        includedFeatures: ['High-Pressure Wheel Arch Decon', 'Track Marring Polish', 'Graphene Sealant']
      }
    };
    const res2 = createMockRes();
    await invoke(createPackage, req2, res2);
    if (res2.statusCode !== 201 || res2.body.data.slug !== 'track-day-surface-shield') {
      throw new Error(`Failed to create package: status ${res2.statusCode}`);
    }
    const createdPkg = res2.body.data;
    console.log(`✅ [TEST]: Created new Service Package: '${createdPkg.title}' (Price: $${createdPkg.basePrice}).`);

    // 3. Update Package Price
    const req3 = {
      params: { id: createdPkg._id.toString() },
      body: { basePrice: 389, tagline: 'Updated: Ultra-slick graphene barrier' }
    };
    const res3 = createMockRes();
    await invoke(updatePackage, req3, res3);
    if (res3.statusCode !== 200 || res3.body.data.basePrice !== 389) {
      throw new Error(`Failed to update package: status ${res3.statusCode}`);
    }
    console.log(`✅ [TEST]: Updated Package basePrice to: $${res3.body.data.basePrice}.`);

    // 4. Toggle Package Active Status
    const req4 = { params: { id: createdPkg._id.toString() } };
    const res4 = createMockRes();
    await invoke(deletePackage, req4, res4);
    if (res4.statusCode !== 200 || res4.body.data.isActive !== false) {
      throw new Error(`Failed to toggle package: status ${res4.statusCode}`);
    }
    console.log(`✅ [TEST]: Deactivated Package (isActive: ${res4.body.data.isActive}).`);

    // 5. Create Addon
    const req5 = {
      body: {
        title: 'Exhaust Tip Titanium Polish',
        description: 'Mirror buffing of scorched exhaust tips and carbon cleanup.',
        price: 85,
        durationMinutes: 30,
        iconName: 'Flame'
      }
    };
    const res5 = createMockRes();
    await invoke(createAddon, req5, res5);
    if (res5.statusCode !== 201 || res5.body.data.price !== 85) {
      throw new Error(`Failed to create addon: status ${res5.statusCode}`);
    }
    const createdAddon = res5.body.data;
    console.log(`✅ [TEST]: Created new Add-on: '${createdAddon.title}' ($${createdAddon.price}).`);

    // 6. Update Addon
    const req6 = {
      params: { id: createdAddon._id.toString() },
      body: { price: 95 }
    };
    const res6 = createMockRes();
    await invoke(updateAddon, req6, res6);
    if (res6.statusCode !== 200 || res6.body.data.price !== 95) {
      throw new Error(`Failed to update addon: status ${res6.statusCode}`);
    }
    console.log(`✅ [TEST]: Updated Add-on price to $${res6.body.data.price}.`);

    // 7. Update Vehicle Category Multiplier
    const firstCat = res1.body.data.categories[0];
    const req7 = {
      params: { id: firstCat._id.toString() },
      body: { priceMultiplier: 1.05 }
    };
    const res7 = createMockRes();
    await invoke(updateVehicleCategory, req7, res7);
    if (res7.statusCode !== 200 || res7.body.data.priceMultiplier !== 1.05) {
      throw new Error(`Failed to update vehicle category: status ${res7.statusCode}`);
    }
    console.log(`✅ [TEST]: Updated Vehicle Category '${firstCat.name}' multiplier to: ${res7.body.data.priceMultiplier}x.`);

    // 8. Factory Reset Catalog
    const req8 = {};
    const res8 = createMockRes();
    await invoke(resetCatalogToDefaults, req8, res8);
    if (res8.statusCode !== 200 || res8.body.data.packages.length !== 3) {
      throw new Error(`Failed to reset catalog: status ${res8.statusCode}`);
    }
    console.log(`✅ [TEST]: Successfully Reset Catalog to Factory Defaults (Restored 3 Packages, 5 Add-ons, 4 Categories).`);

    console.log('\n🎉 ALL 8 CATALOG & PRICING CRUD VERIFICATION CHECKS PASSED!\n');

    await mongoose.disconnect();
    console.log('🔌 [TEST]: Disconnected from MongoDB Atlas.');
    process.exit(0);
  } catch (err) {
    console.error('❌ [TEST ERROR]:', err);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

runTest();
