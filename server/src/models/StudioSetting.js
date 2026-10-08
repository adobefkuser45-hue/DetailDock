import mongoose from 'mongoose';

const StudioSettingSchema = new mongoose.Schema({
  studioName: { 
    type: String, 
    default: 'DetailDock Luxury Atelier' 
  },
  contactPhone: { 
    type: String, 
    default: '+1 (555) 348-2450' 
  },
  contactEmail: { 
    type: String, 
    default: 'concierge@detaildock.com' 
  },
  address: {
    street: { type: String, default: '1440 Velocity Way, Suite 100' },
    city: { type: String, default: 'Austin' },
    state: { type: String, default: 'TX' },
    zip: { type: String, default: '78701' }
  },
  operatingHours: {
    openTime: { type: String, default: '09:00 AM' },
    closeTime: { type: String, default: '06:00 PM' },
    slotIntervalMinutes: { type: Number, default: 120 }
  },
  maxBayCapacity: { 
    type: Number, 
    default: 2,
    min: [1, 'At least 1 bay must be active']
  },
  workingDays: [{ 
    type: Number, 
    default: [1, 2, 3, 4, 5, 6] // Mon - Sat
  }],
  blackoutDates: [{ 
    type: Date 
  }]
}, { timestamps: true });

export const StudioSetting = mongoose.model('StudioSetting', StudioSettingSchema);
