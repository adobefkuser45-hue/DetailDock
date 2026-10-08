import mongoose from 'mongoose';

const AddonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Add-on title is required.'],
    trim: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price cannot be negative']
  },
  durationMinutes: { 
    type: Number, 
    required: true, 
    default: 30,
    min: [5, 'Duration must be at least 5 minutes']
  },
  iconName: { 
    type: String, 
    default: 'Sparkles' 
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

AddonSchema.index({ isActive: 1, displayOrder: 1 });

export const Addon = mongoose.model('Addon', AddonSchema);
