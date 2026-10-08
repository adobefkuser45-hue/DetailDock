import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import { VehicleCategory } from '../models/VehicleCategory.js';
import { ServicePackage } from '../models/ServicePackage.js';
import { Addon } from '../models/Addon.js';
import { StudioSetting } from '../models/StudioSetting.js';
import { User } from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const verify = async () => {
  try {
    await connectDB();
    const categoriesCount = await VehicleCategory.countDocuments();
    const packagesCount = await ServicePackage.countDocuments();
    const addonsCount = await Addon.countDocuments();
    const studio = await StudioSetting.findOne();
    const usersCount = await User.countDocuments();

    console.log('=== DATABASE VERIFICATION REPORT ===');
    console.log(`Vehicle Categories: ${categoriesCount}`);
    console.log(`Service Packages:   ${packagesCount}`);
    console.log(`Add-ons:            ${addonsCount}`);
    console.log(`Studio Name:        ${studio?.studioName}`);
    console.log(`Users (Admin+Demo): ${usersCount}`);
    console.log('====================================');
    process.exit(0);
  } catch (err) {
    console.error('Verification failed:', err);
    process.exit(1);
  }
};

verify();
