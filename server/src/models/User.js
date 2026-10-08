import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your full name.'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Please provide an email address.'], 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password.'], 
    minlength: 6,
    select: false 
  },
  phone: { 
    type: String, 
    required: [true, 'Please provide a contact phone number.'], 
    trim: true 
  },
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'technician'], 
    default: 'customer' 
  },
  savedVehicles: [{
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    categorySlug: { type: String, required: true },
    licensePlate: { type: String, default: '' }
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

// Password hashing hook
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
