import mongoose from 'mongoose';

const ServicePackageSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Service package title is required.'],
    trim: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  tagline: { 
    type: String, 
    default: '' 
  },
  description: { 
    type: String, 
    required: true 
  },
  basePrice: { 
    type: Number, 
    required: true,
    min: [0, 'Base price cannot be negative']
  },
  baseDurationMinutes: { 
    type: Number, 
    required: true,
    min: [15, 'Base duration must be at least 15 minutes']
  },
  category: { 
    type: String, 
    enum: ['wash', 'interior', 'exterior', 'full', 'ceramic'], 
    default: 'full' 
  },
  includedFeatures: [{ 
    type: String 
  }],
  isPopular: { 
    type: Boolean, 
    default: false 
  },
  displayOrder: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

ServicePackageSchema.index({ isActive: 1, displayOrder: 1 });

export const ServicePackage = mongoose.model('ServicePackage', ServicePackageSchema);
