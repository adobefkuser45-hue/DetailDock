import mongoose from 'mongoose';

const VehicleCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Vehicle category name is required.'],
    trim: true
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  priceMultiplier: { 
    type: Number, 
    required: true, 
    default: 1.0,
    min: [0.5, 'Multiplier cannot be below 0.5']
  },
  durationMultiplier: { 
    type: Number, 
    required: true, 
    default: 1.0,
    min: [0.5, 'Duration multiplier cannot be below 0.5']
  },
  description: { 
    type: String, 
    default: '' 
  },
  iconName: { 
    type: String, 
    default: 'Car' 
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

VehicleCategorySchema.index({ isActive: 1, displayOrder: 1 });

export const VehicleCategory = mongoose.model('VehicleCategory', VehicleCategorySchema);
