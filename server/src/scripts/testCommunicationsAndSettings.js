import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import { StudioSetting } from '../models/StudioSetting.js';
import { Booking } from '../models/Booking.js';
import { 
  sanitizePhoneNumber, 
  buildCommunicationMessage, 
  generateCommunicationLinks 
} from '../services/communicationService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function runTest() {
  console.log('🧪 [TEST]: Starting Milestone M06 Communications & Studio Settings Test Suite...');
  await connectDB();
  console.log('✅ [TEST]: Connected to MongoDB.');

  try {
    // 1. Test Phone Number Sanitization
    const rawPhones = ['+1 (555) 348-2450', '555-123-4567', '+44 7911 123456', '(512) 990-1234'];
    const sanitized = rawPhones.map(sanitizePhoneNumber);
    console.log('✅ [TEST]: Phone sanitization sample:', sanitized);
    if (sanitized[0] !== '15553482450') {
      throw new Error(`Sanitization failed: expected 15553482450 but got ${sanitized[0]}`);
    }

    // 2. Test StudioSetting persistence
    let settings = await StudioSetting.findOne();
    if (!settings) {
      settings = await StudioSetting.create({
        studioName: 'DetailDock Luxury Atelier',
        contactPhone: '+1 (555) 348-2450',
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
        maxBayCapacity: 2
      });
    }
    console.log('✅ [TEST]: Active Studio Name:', settings.studioName);
    console.log('✅ [TEST]: Active Studio Address:', `${settings.address.street}, ${settings.address.city}, ${settings.address.state}`);

    // 3. Find or create a test booking
    let booking = await Booking.findOne();
    if (!booking) {
      throw new Error('No existing bookings found to test communication links.');
    }
    console.log('✅ [TEST]: Testing on booking code:', booking.bookingCode);

    // 4. Test WhatsApp & SMS Link Generation
    const clientUrl = 'https://client-mauve-zeta-13.vercel.app';
    const comms = generateCommunicationLinks(booking, settings, clientUrl, 'In Bay');
    console.log('✅ [TEST]: Raw Message:\n', comms.rawMessage);
    console.log('✅ [TEST]: WhatsApp URL:', comms.whatsappUrl);
    console.log('✅ [TEST]: SMS URL:', comms.smsUrl);

    if (!comms.whatsappUrl.startsWith('https://wa.me/')) {
      throw new Error('Invalid WhatsApp URL generated.');
    }
    if (!comms.smsUrl.startsWith('sms:')) {
      throw new Error('Invalid SMS URL generated.');
    }

    // 5. Test Logging Communication into Booking
    if (!booking.communicationsLog) booking.communicationsLog = [];
    booking.communicationsLog.push({
      channel: 'whatsapp',
      recipient: booking.customer.phone,
      message: comms.rawMessage,
      dispatchedAt: new Date(),
      status: 'dispatched'
    });
    await booking.save();
    console.log('✅ [TEST]: Successfully recorded WhatsApp dispatch in booking communicationsLog.');

    // 6. Test White-Label Customization Update
    const originalName = settings.studioName;
    settings.studioName = 'Apex Ceramic & Detailing Works';
    await settings.save();
    console.log('✅ [TEST]: Updated studio name to:', settings.studioName);

    // Re-verify update
    const reloaded = await StudioSetting.findById(settings._id);
    if (reloaded.studioName !== 'Apex Ceramic & Detailing Works') {
      throw new Error('StudioSetting did not persist custom name!');
    }

    // Revert back to master luxury name
    settings.studioName = originalName;
    await settings.save();
    console.log('✅ [TEST]: Reverted studio name to default:', settings.studioName);

    console.log('\n🎉 ALL 6 COMMUNICATIONS & STUDIO SETTINGS VERIFICATION CHECKS PASSED!\n');
  } finally {
    await mongoose.disconnect();
    console.log('🔌 [TEST]: Disconnected from MongoDB.');
  }
}

runTest().catch((err) => {
  console.error('❌ [TEST ERROR]:', err);
  process.exit(1);
});
