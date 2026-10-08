import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { VehicleCategory } from '../models/VehicleCategory.js';
import { ServicePackage } from '../models/ServicePackage.js';
import { Addon } from '../models/Addon.js';
import { StudioSetting } from '../models/StudioSetting.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed]: Connected to MongoDB Atlas. Seeding realistic luxury automotive catalog...');

    // Clear existing collections safely
    await Promise.all([
      VehicleCategory.deleteMany({}),
      ServicePackage.deleteMany({}),
      Addon.deleteMany({}),
      StudioSetting.deleteMany({}),
      User.deleteMany({})
    ]);

    // 1. Vehicle Categories
    const categories = await VehicleCategory.insertMany([
      {
        name: 'Compact / Sedan',
        slug: 'sedan',
        priceMultiplier: 1.0,
        durationMultiplier: 1.0,
        description: 'Standard 2-door coupe, hatchback, or 4-door sedan chassis.',
        iconName: 'Car',
        displayOrder: 1
      },
      {
        name: 'Executive / Coupe',
        slug: 'executive-coupe',
        priceMultiplier: 1.1,
        durationMultiplier: 1.05,
        description: 'Luxury touring coupes and executive saloons with intricate trim.',
        iconName: 'Sparkles',
        displayOrder: 2
      },
      {
        name: 'Compact SUV / Crossover',
        slug: 'compact-suv',
        priceMultiplier: 1.25,
        durationMultiplier: 1.15,
        description: 'Mid-size crossovers, wagons, and compact SUVs.',
        iconName: 'CarFront',
        displayOrder: 3
      },
      {
        name: 'Full-Size SUV / Truck',
        slug: 'full-suv',
        priceMultiplier: 1.45,
        durationMultiplier: 1.30,
        description: 'Extended wheelbase SUVs, minivans, and full-size commercial trucks.',
        iconName: 'Truck',
        displayOrder: 4
      }
    ]);
    console.log(`[Seed]: Created ${categories.length} Vehicle Categories.`);

    // 2. Service Packages
    const packages = await ServicePackage.insertMany([
      {
        title: 'Essential Clean',
        slug: 'essential-clean',
        tagline: 'Precision maintenance wash & interior refresh',
        description: 'Complete multi-bucket pH-neutral foam wash, wheel barrel decontamination, glass clarification, and full interior vacuum & wipe-down.',
        basePrice: 149,
        baseDurationMinutes: 90,
        category: 'full',
        includedFeatures: [
          'Two-Bucket pH-Neutral Hand Wash',
          'Wheel Barrels & Calipers Cleaned',
          'Tire Dressing (Satin Finish)',
          'Interior Vacuum & Dust Extraction',
          'Streak-Free Glass Clarity',
          'Door Jambs Wiped'
        ],
        isPopular: false,
        displayOrder: 1
      },
      {
        title: 'Signature Multi-Stage Detail',
        slug: 'signature-detail',
        tagline: 'Single-stage machine polish & deep interior sanitization',
        description: 'Our signature studio restoration. Enhances paint gloss by up to 80%, removes light wash marring, and steam-cleans all interior upholstery & leather.',
        basePrice: 289,
        baseDurationMinutes: 180,
        category: 'full',
        includedFeatures: [
          'Full Decontamination Foam Bath & Iron Fallout Removal',
          'Clay Bar Surface Treatment',
          'Single-Stage Machine Gloss Polish',
          'Synthetic Paint Sealant (6-Month Protection)',
          'Steam Extraction of Carpet & Fabric',
          'Leather Cleansed & Matte Conditioned',
          'Engine Bay Top Surface Wiped'
        ],
        isPopular: true,
        displayOrder: 2
      },
      {
        title: 'Ultimate 9H Ceramic Shield',
        slug: 'ceramic-shield',
        tagline: 'Two-stage paint correction & pro-grade 9H ceramic coating',
        description: 'The pinnacle of automotive surface preservation. 2-stage compounding eliminates 90%+ of paint defects, sealed under professional 9H ceramic coating for 3+ years of extreme hydrophobic gloss.',
        basePrice: 499,
        baseDurationMinutes: 270,
        category: 'ceramic',
        includedFeatures: [
          'Full Chemical & Mechanical Decontamination',
          '2-Stage Heavy Compound & Mirror Finish Polish',
          'Paint Depth Gauge & Surface Inspection',
          'Professional 9H Nano-Ceramic Coating (Body & Lights)',
          'Windshield & Glass Hydrophobic Rain Repellent',
          'Wheel Face Ceramic Coating',
          'Full Interior Nano-Shield Antimicrobial Guard',
          '3-Year Warranty Certificate'
        ],
        isPopular: false,
        displayOrder: 3
      }
    ]);
    console.log(`[Seed]: Created ${packages.length} Service Packages.`);

    // 3. Add-ons
    const addons = await Addon.insertMany([
      {
        title: 'Engine Bay Steam Decontamination',
        slug: 'engine-bay-clean',
        description: 'Pressurized dry steam cleaning, grease removal, and OEM satin plastic dressing.',
        price: 75,
        durationMinutes: 45,
        iconName: 'Flame',
        displayOrder: 1
      },
      {
        title: 'Leather Ceramic Shield & Conditioning',
        slug: 'leather-ceramic',
        description: 'Deep pore dirt lifting followed by breathable ceramic barrier against dye transfer & UV cracking.',
        price: 120,
        durationMinutes: 60,
        iconName: 'Shield',
        displayOrder: 2
      },
      {
        title: 'Pet Hair & Deep Fiber Extraction',
        slug: 'pet-hair-removal',
        description: 'Specialized rubber mechanical combs and high-lift extraction to remove stubborn woven fur.',
        price: 55,
        durationMinutes: 30,
        iconName: 'Sparkles',
        displayOrder: 3
      },
      {
        title: 'Wheel Barrel & Caliper Ceramic Coating',
        slug: 'wheel-caliper-ceramic',
        description: 'High-temperature 1200°F ceramic barrier resisting brake dust pitting and harsh road salts.',
        price: 180,
        durationMinutes: 45,
        iconName: 'Disc',
        displayOrder: 4
      },
      {
        title: 'Headlight UV Restoration & Polish',
        slug: 'headlight-restoration',
        description: 'Wet-sanding yellowed oxidation, diamond compound clarity polish, and UV clear barrier seal.',
        price: 65,
        durationMinutes: 30,
        iconName: 'Sun',
        displayOrder: 5
      }
    ]);
    console.log(`[Seed]: Created ${addons.length} Add-ons.`);

    // 4. Studio Settings
    const studio = await StudioSetting.create({
      studioName: 'DetailDock Luxury Atelier',
      contactPhone: '+1 (512) 842-9210',
      contactEmail: 'concierge@detaildock.com',
      address: {
        street: '1440 Velocity Way, Suite 100',
        city: 'Austin',
        state: 'TX',
        zip: '78701'
      },
      operatingHours: {
        openTime: '09:00 AM',
        closeTime: '06:00 PM',
        slotIntervalMinutes: 120
      },
      maxBayCapacity: 2,
      workingDays: [1, 2, 3, 4, 5, 6] // Mon-Sat
    });
    console.log(`[Seed]: Created Studio Settings -> ${studio.studioName}.`);

    // 5. Default Users (Admin & Customer)
    const admin = new User({
      name: 'DetailDock Admin',
      email: 'admin@detaildock.com',
      password: 'DetailDockAdmin2026!',
      phone: '+1 (512) 842-9210',
      role: 'admin'
    });
    await admin.save();

    const customer = new User({
      name: 'Alex Vance',
      email: 'alex@example.com',
      password: 'CustomerPass2026!',
      phone: '+1 (512) 555-0199',
      role: 'customer',
      savedVehicles: [{
        make: 'Porsche',
        model: '911 Carrera GT3',
        year: 2023,
        categorySlug: 'executive-coupe',
        licensePlate: 'DOCK-911'
      }]
    });
    await customer.save();

    console.log('[Seed]: Created Admin User (admin@detaildock.com) and Demo Customer (alex@example.com).');
    console.log('[Seed]: Database seeding successfully completed!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]: Seeding failed ->', error);
    process.exit(1);
  }
};

seedData();
