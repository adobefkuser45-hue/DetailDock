import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingCode: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, 
    trim: true,
    index: true 
  },
  
  // Customer details snapshot
  customer: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true }
  },

  // Vehicle information snapshot
  vehicle: {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    categoryName: { type: String, required: true },
    categorySlug: { type: String, required: true },
    multiplierApplied: { type: Number, required: true },
    licensePlate: { type: String, default: '', trim: true },
    paintColor: { type: String, default: '', trim: true }
  },

  // Service package snapshot (immutable frozen pricing)
  packageSnapshot: {
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServicePackage' },
    title: { type: String, required: true },
    basePrice: { type: Number, required: true },
    calculatedPrice: { type: Number, required: true },
    durationMinutes: { type: Number, required: true }
  },

  // Add-ons snapshot
  addonsSnapshot: [{
    addonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Addon' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    durationMinutes: { type: Number, required: true }
  }],

  // Authoritative financial summary
  totalPrice: { 
    type: Number, 
    required: true 
  },
  totalDurationMinutes: { 
    type: Number, 
    required: true 
  },

  // Scheduling
  scheduledDate: { 
    type: Date, 
    required: true, 
    index: true 
  },
  scheduledTimeSlot: { 
    type: String, 
    required: true, 
    index: true 
  },
  bayNumber: { 
    type: Number, 
    default: 1 
  },

  // Status progression
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Bay', 'Ready', 'Completed', 'Cancelled'],
    default: 'Pending',
    index: true
  },

  // Payment transaction & invoicing snapshot
  payment: {
    status: {
      type: String,
      enum: ['unpaid', 'deposit_paid', 'paid', 'refunded', 'waived'],
      default: 'unpaid',
      index: true
    },
    method: {
      type: String,
      enum: ['stripe', 'studio_pay', 'cash', 'card_present', 'unselected'],
      default: 'unselected'
    },
    stripePaymentIntentId: { type: String, default: null, index: true },
    stripeCheckoutSessionId: { type: String, default: null, index: true },
    amountPaid: { type: Number, default: 0 },
    depositAmount: { type: Number, default: 0 },
    currency: { type: String, default: 'usd' },
    receiptUrl: { type: String, default: null },
    paidAt: { type: Date, default: null }
  },

  notes: { type: String, default: '' },
  adminNotes: { type: String, default: '' },
  cancellationReason: { type: String, default: '' },

  // Digital Ceramic Coating Warranty Certificate
  warrantyCertificate: {
    certificateNumber: { type: String, default: null, index: true },
    issuedAt: { type: Date, default: null },
    coatingType: { type: String, default: '9H Multi-Layer Matrix Nano-Ceramic' },
    hardnessRating: { type: String, default: '9H Pencil Hardness (Certified ISO 15184)' },
    warrantyPeriodYears: { type: Number, default: 3 },
    expiresAt: { type: Date, default: null },
    certifiedTechnicianName: { type: String, default: 'Master Surface Specialist' },
    warrantyStatus: { type: String, enum: ['Active', 'Void', 'Expired', 'Pending_Inspection'], default: 'Active' },
    securityHash: { type: String, default: null }
  },

  // Digital Vehicle Inspection (DVI) & Paint Health Telemetry
  inspectionData: {
    intakeInspection: {
      clearCoatDepthMicrons: { type: Number, default: 118 },
      swirlSeverity: { type: String, enum: ['Minimal', 'Minor', 'Moderate', 'Heavy', 'Severe'], default: 'Moderate' },
      paintCondition: { type: String, default: 'Factory Clear Coat with wash-induced marring' },
      rockChipsDetected: { type: Number, default: 2 },
      wheelBrakeDust: { type: String, enum: ['Clean', 'Light', 'Moderate', 'Heavy'], default: 'Moderate' },
      inspectedAt: { type: Date, default: null }
    },
    completionInspection: {
      finalGlossUnits: { type: Number, default: 98 },
      swirlDefectEliminationPercent: { type: Number, default: 95 },
      finalClearCoatDepthMicrons: { type: Number, default: 115 },
      finishQuality: { type: String, default: 'Concours Show-Car Mirror Refinement' },
      inspectionNotes: { type: String, default: 'Two-stage compound and micro-finishing polish completed. 9H ceramic shield thermally cured.' },
      completedAt: { type: Date, default: null }
    }
  },

  // Communications dispatch log (SMS, WhatsApp, Email)
  communicationsLog: [{
    channel: { type: String, enum: ['sms', 'whatsapp', 'email'], required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    dispatchedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'dispatched' }
  }],

  // Audit trail
  statusHistory: [{
    status: { type: String, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: String, default: 'Customer' },
    note: { type: String, default: '' }
  }]
}, { timestamps: true });

// Compound index for slot capacity query
BookingSchema.index({ scheduledDate: 1, scheduledTimeSlot: 1, status: 1 });
BookingSchema.index({ 'customer.email': 1, createdAt: -1 });

export const Booking = mongoose.model('Booking', BookingSchema);
