import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { calculatePricing } from '../services/pricingService.js';
import { 
  getAvailabilityForDate, 
  verifySlotAvailability,
  getActiveStudioSetting 
} from '../services/availabilityService.js';
import { VehicleCategory } from '../models/VehicleCategory.js';
import { ServicePackage } from '../models/ServicePackage.js';
import { Addon } from '../models/Addon.js';
import { Booking } from '../models/Booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const runVerification = async () => {
  console.log('====================================================');
  console.log('   DETAILDOCK PRICING & AVAILABILITY ENGINE TEST    ');
  console.log('====================================================\n');

  await connectDB();

  let passedTests = 0;
  let totalTests = 0;

  const assert = (condition, title) => {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${title}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${title}`);
      process.exitCode = 1;
    }
  };

  try {
    // 1. Verify Catalog Collections Exist
    console.log('--- 1. CATALOG VERIFICATION ---');
    const categories = await VehicleCategory.find({ isActive: true }).lean();
    const packages = await ServicePackage.find({ isActive: true }).lean();
    const addons = await Addon.find({ isActive: true }).lean();
    const studio = await getActiveStudioSetting();

    assert(categories.length >= 4, `Active Vehicle Categories found: ${categories.length}`);
    assert(packages.length >= 3, `Active Service Packages found: ${packages.length}`);
    assert(addons.length >= 5, `Active Addons found: ${addons.length}`);
    assert(studio.maxBayCapacity === 2, `Studio Max Bay Capacity is 2`);

    // 2. Authoritative Pricing Engine: Sedan (1.0x) + Ceramic Shield ($499)
    console.log('\n--- 2. PRICING ENGINE: SEDAN + CERAMIC SHIELD (NO ADDONS) ---');
    const sedanCalc = await calculatePricing({
      vehicleCategorySlug: 'sedan',
      packageSlug: 'ceramic-shield',
      addonSlugs: []
    });

    console.log(`  Package: ${sedanCalc.servicePackage.title} ($${sedanCalc.summary.packageSubtotal})`);
    console.log(`  Total: $${sedanCalc.summary.totalPrice}, Duration: ${sedanCalc.summary.formattedDuration}`);
    assert(sedanCalc.summary.packageSubtotal === 499.00, 'Sedan Ceramic Shield subtotal is $499.00');
    assert(sedanCalc.summary.totalPrice === 499.00, 'Sedan Ceramic Shield total is $499.00');
    assert(sedanCalc.summary.vehicleMultiplierApplied === 1.0, 'Multiplier applied is 1.0');

    // 3. Authoritative Pricing Engine: Full SUV (1.45x) + Signature Detail ($289) + 2 Addons
    console.log('\n--- 3. PRICING ENGINE: FULL SUV + SIGNATURE DETAIL + 2 ADDONS ---');
    // Expected: 289 * 1.45 = 419.05
    // Addons: Engine Bay ($75) + Wheel Caliper Ceramic ($180) = $255.00
    // Total: 419.05 + 255.00 = 674.05
    const suvCalc = await calculatePricing({
      vehicleCategorySlug: 'full-suv',
      packageSlug: 'signature-detail',
      addonSlugs: ['engine-bay-clean', 'wheel-caliper-ceramic']
    });

    console.log(`  Package: ${suvCalc.servicePackage.title} ($${suvCalc.summary.packageSubtotal})`);
    console.log(`  Addons: ${suvCalc.addons.map(a => `${a.title} ($${a.price})`).join(', ')}`);
    console.log(`  Total: $${suvCalc.summary.totalPrice}, Duration: ${suvCalc.summary.formattedDuration}`);
    assert(suvCalc.summary.packageSubtotal === 419.05, 'Full SUV Signature Detail package price is $419.05');
    assert(suvCalc.summary.addonsSubtotal === 255.00, 'Addons subtotal is $255.00');
    assert(suvCalc.summary.totalPrice === 674.05, 'Total price is $674.05');
    assert(suvCalc.addons.length === 2, '2 addons accurately resolved');

    // 3B. Error handling on nonexistent addon
    let addonErrCaught = false;
    try {
      await calculatePricing({
        vehicleCategorySlug: 'full-suv',
        packageSlug: 'signature-detail',
        addonSlugs: ['non-existent-addon']
      });
    } catch (e) {
      addonErrCaught = true;
      assert(e.statusCode === 404 && e.code === 'ADDON_NOT_FOUND', 'Rejects nonexistent addon with 404 ADDON_NOT_FOUND');
    }
    assert(addonErrCaught === true, 'Nonexistent addon error triggered');

    // 4. Availability Engine: Open Weekday (Thursday 2026-10-15)
    console.log('\n--- 4. AVAILABILITY ENGINE: THURSDAY 2026-10-15 ---');
    const weekdayAvail = await getAvailabilityForDate('2026-10-15');
    console.log(`  Status: isOpen = ${weekdayAvail.isOpen}, Day: ${weekdayAvail.dayOfWeek}`);
    console.log(`  Available slots count: ${weekdayAvail.slots.length}`);
    assert(weekdayAvail.isOpen === true, 'Studio is open on Thursday');
    assert(weekdayAvail.slots.length === 4, 'Standard 4 time slots generated (9AM, 11AM, 1PM, 3PM)');
    assert(weekdayAvail.slots[0].maxCapacity === 2, 'Slot maxCapacity is 2');
    assert(weekdayAvail.slots[0].isAvailable === true, 'Slot 0 is available');

    // 5. Availability Engine: Closed Day (Sunday 2026-10-18)
    console.log('\n--- 5. AVAILABILITY ENGINE: CLOSED SUNDAY 2026-10-18 ---');
    const sundayAvail = await getAvailabilityForDate('2026-10-18');
    console.log(`  Status: isOpen = ${sundayAvail.isOpen}, Day: ${sundayAvail.dayOfWeek}, Reason: ${sundayAvail.reason}`);
    assert(sundayAvail.isOpen === false, 'Studio is closed on Sunday');
    assert(sundayAvail.slots.length === 0, 'No slots generated on closed day');

    // 6. Double-Booking Slot Capacity Protection Verification
    console.log('\n--- 6. DOUBLE-BOOKING & BAY CAPACITY CONCURRENCY TEST ---');
    const testDate = '2026-10-22'; // Thursday
    const testSlot = '09:00 AM';

    // Clean up any test booking for that date if exists
    await Booking.deleteMany({ 'customer.email': 'concurrency-test@detaildock.com' });

    // Initial check: slot should be available, bay 1
    const slotCheck1 = await verifySlotAvailability(testDate, testSlot);
    assert(slotCheck1.isAvailable === true, 'Slot is initially open');
    assert(slotCheck1.assignedBayNumber === 1, 'First booking assigned to Bay 1');

    // Insert 1 mock booking
    const mockBooking1 = await Booking.create({
      bookingCode: `TEST-BAY1-${Date.now()}`,
      customer: {
        name: 'Test Client 1',
        email: 'concurrency-test@detaildock.com',
        phone: '+1 555-0100'
      },
      vehicle: {
        make: 'Porsche',
        model: '911 GT3 RS',
        year: 2025,
        categoryName: 'Executive Coupe',
        categorySlug: 'executive-coupe',
        multiplierApplied: 1.1
      },
      packageSnapshot: {
        title: 'Signature Detail',
        basePrice: 289,
        calculatedPrice: 317.90,
        durationMinutes: 180
      },
      totalPrice: 317.90,
      totalDurationMinutes: 180,
      scheduledDate: new Date(`${testDate}T09:00:00.000Z`),
      scheduledTimeSlot: testSlot,
      bayNumber: 1,
      status: 'Confirmed'
    });

    // Check slot again: should still be available, bay 2
    const slotCheck2 = await verifySlotAvailability(testDate, testSlot);
    assert(slotCheck2.isAvailable === true, 'Slot is still open with 1 bay left');
    assert(slotCheck2.assignedBayNumber === 2, 'Second booking assigned to Bay 2');

    // Insert second booking for bay 2
    const mockBooking2 = await Booking.create({
      bookingCode: `TEST-BAY2-${Date.now()}`,
      customer: {
        name: 'Test Client 2',
        email: 'concurrency-test@detaildock.com',
        phone: '+1 555-0200'
      },
      vehicle: {
        make: 'Ferrari',
        model: '296 GTB',
        year: 2024,
        categoryName: 'Executive Coupe',
        categorySlug: 'executive-coupe',
        multiplierApplied: 1.1
      },
      packageSnapshot: {
        title: 'Ceramic Shield',
        basePrice: 499,
        calculatedPrice: 548.90,
        durationMinutes: 300
      },
      totalPrice: 548.90,
      totalDurationMinutes: 300,
      scheduledDate: new Date(`${testDate}T09:00:00.000Z`),
      scheduledTimeSlot: testSlot,
      bayNumber: 2,
      status: 'Confirmed'
    });

    // Check availability after 2 bookings: slot should now be fully booked (0 bays available)
    const dayAvailAfterFull = await getAvailabilityForDate(testDate);
    const targetSlot = dayAvailAfterFull.slots.find(s => s.timeSlot === testSlot);
    assert(targetSlot.bookedCount === 2, 'Booked count is 2/2');
    assert(targetSlot.availableBays === 0, 'Available bays is 0');
    assert(targetSlot.isAvailable === false, 'Slot marked as not available');

    // verifySlotAvailability should throw 409
    let errorCaught = false;
    try {
      await verifySlotAvailability(testDate, testSlot);
    } catch (err) {
      errorCaught = true;
      assert(err.statusCode === 409, `Capacity guard properly threw HTTP 409 (${err.code})`);
      assert(err.code === 'SLOT_CAPACITY_EXCEEDED', `Error code matches SLOT_CAPACITY_EXCEEDED`);
    }
    assert(errorCaught === true, 'Attempting to book a 3rd bay was successfully blocked');

    // Clean up mock test records
    await Booking.deleteMany({ 'customer.email': 'concurrency-test@detaildock.com' });
    console.log('  Cleaned up temporary concurrency test records.');

    console.log(`\n====================================================`);
    console.log(`  TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
    console.log(`====================================================\n`);

  } catch (error) {
    console.error('Test execution failed with error:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
};

runVerification();
