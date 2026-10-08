import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas cluster with optimized production options.
 */
export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Optimized for Atlas Free Tier (M0)
      autoIndex: process.env.NODE_ENV !== 'production' // Avoid build overhead in prod
    });

    console.log(`[DetailDock DB]: MongoDB Atlas Connected successfully -> Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[DetailDock DB Error]: MongoDB connection failed -> ${error.message}`);
    // Don't crash immediately in dev to allow debugging
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[DetailDock DB Warning]: MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('[DetailDock DB]: MongoDB reconnected.');
});
