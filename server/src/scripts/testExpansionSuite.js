import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';
import { warrantyService } from '../services/warrantyService.js';
import { 
  issueWarrantyCertificate, 
  updateInspectionData 
} from '../controllers/adminController.js';
import { 
  getCustomerGarage, 
  addSavedVehicle, 
  removeSavedVehicle 
} from '../controllers/authController.js';

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
  console.log('🧪 [TEST]: Starting Milestone M07 Commercial Expansion Test Suite (Warranty, DVI, Garage)...\n');

  try {
    await connectDB();
    console.log('✅ [TEST]: Connected to MongoDB Atlas.');

    // 1. Find a sample booking for Warranty & DVI testing
    const sampleBooking = await Booking.findOne();
    if (!sampleBooking) {
      throw new Error('No existing booking found to test warranty & inspection.');
    }
    console.log(`✅ [TEST]: Found test booking: ${sampleBooking.bookingCode}`);

    // 2. Issue Official Ceramic Warranty Certificate
    const reqWarranty = {
      params: { id: sampleBooking._id.toString() },
      body: {
        coatingType: '9H Multi-Layer Matrix Nano-Ceramic',
        hardnessRating: '9H Pencil Hardness (Certified ISO 15184)',
        warrantyPeriodYears: 3,
        certifiedTechnicianName: 'Marcus Vance (Master Surface Specialist)'
      }
    };
    const resWarranty = createMockRes();
    await invoke(issueWarrantyCertificate, reqWarranty, resWarranty);
    if (resWarranty.statusCode !== 200 || !resWarranty.body.data.certificateNumber) {
      throw new Error(`Failed to issue warranty certificate: status ${resWarranty.statusCode}`);
    }
    const cert = resWarranty.body.data;
    console.log(`✅ [TEST]: Issued Ceramic Warranty Certificate: '${cert.certificateNumber}' (Expires: ${new Date(cert.expiresAt).getFullYear()}).`);

    // 3. Generate Vector PDF Warranty Certificate Buffer
    const updatedBooking = await Booking.findById(sampleBooking._id);
    const pdfBuffer = await warrantyService.generateWarrantyBuffer(updatedBooking);
    if (!pdfBuffer || pdfBuffer.length < 1000) {
      throw new Error('Generated warranty PDF buffer is invalid or empty.');
    }
    const pdfHeader = pdfBuffer.slice(0, 5).toString('utf-8');
    if (!pdfHeader.startsWith('%PDF-')) {
      throw new Error(`Invalid PDF header: ${pdfHeader}`);
    }
    console.log(`✅ [TEST]: Generated Vector PDF Warranty Certificate (${pdfBuffer.length} bytes, starts with '${pdfHeader}').`);

    // 4. Update Digital Vehicle Inspection (DVI) Telemetry
    const reqDvi = {
      params: { id: sampleBooking._id.toString() },
      body: {
        intakeInspection: {
          clearCoatDepthMicrons: 122,
          swirlSeverity: 'Heavy',
          paintCondition: 'Compound required',
          rockChipsDetected: 3,
          wheelBrakeDust: 'Heavy'
        },
        completionInspection: {
          finalGlossUnits: 99.1,
          swirlDefectEliminationPercent: 98,
          finalClearCoatDepthMicrons: 118,
          finishQuality: 'Concours Show-Car Mirror Refinement',
          inspectionNotes: 'Precision 2-stage rotary and random orbital polish. 9H ceramic matrix cured.'
        }
      }
    };
    const resDvi = createMockRes();
    await invoke(updateInspectionData, reqDvi, resDvi);
    if (resDvi.statusCode !== 200 || !resDvi.body.data.intakeInspection) {
      throw new Error(`Failed to update inspection data: status ${resDvi.statusCode}`);
    }
    console.log(`✅ [TEST]: Saved DVI Telemetry: Initial Depth ${resDvi.body.data.intakeInspection.clearCoatDepthMicrons}µm ➔ Final Gloss ${resDvi.body.data.completionInspection.finalGlossUnits} GU.`);

    // 5. Test Customer Garage & Saved Vehicles
    let customerUser = await User.findOne({ role: 'customer' });
    if (!customerUser) {
      customerUser = await User.create({
        name: 'Christian Vance',
        email: 'christian.vance@luxuryholding.com',
        password: 'Password123!',
        phone: '+1 (512) 782-9901',
        role: 'customer'
      });
    }

    // Add Vehicle to Customer Garage
    const reqAddVehicle = {
      user: { _id: customerUser._id },
      body: {
        make: 'Ferrari',
        model: '296 GTB',
        year: 2024,
        categorySlug: 'executive-coupe',
        licensePlate: 'VELOCITY-1'
      }
    };
    const resAddVehicle = createMockRes();
    await invoke(addSavedVehicle, reqAddVehicle, resAddVehicle);
    if (resAddVehicle.statusCode !== 201) {
      throw new Error(`Failed to add vehicle to garage: status ${resAddVehicle.statusCode}`);
    }
    console.log(`✅ [TEST]: Added Ferrari 296 GTB to Customer Garage (${resAddVehicle.body.data.length} vehicles saved).`);

    // Query Customer Garage
    const reqGarage = { user: { _id: customerUser._id } };
    const resGarage = createMockRes();
    await invoke(getCustomerGarage, reqGarage, resGarage);
    if (resGarage.statusCode !== 200 || !resGarage.body.data.user.savedVehicles) {
      throw new Error(`Failed to get customer garage: status ${resGarage.statusCode}`);
    }
    console.log(`✅ [TEST]: Retrieved Customer Garage: ${resGarage.body.data.user.savedVehicles.length} vehicles, ${resGarage.body.data.bookings.length} linked bookings.`);

    // Remove Vehicle from Customer Garage
    const addedVehicleId = resAddVehicle.body.data[resAddVehicle.body.data.length - 1]._id.toString();
    const reqRemoveVehicle = {
      user: { _id: customerUser._id },
      params: { vehicleId: addedVehicleId }
    };
    const resRemoveVehicle = createMockRes();
    await invoke(removeSavedVehicle, reqRemoveVehicle, resRemoveVehicle);
    if (resRemoveVehicle.statusCode !== 200) {
      throw new Error(`Failed to remove vehicle: status ${resRemoveVehicle.statusCode}`);
    }
    console.log(`✅ [TEST]: Cleaned up vehicle from garage.`);

    console.log('\n🎉 ALL 6 EXPANSION SUITE CHECKS (WARRANTY, DVI, GARAGE) PASSED!\n');

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
