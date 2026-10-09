import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { apiLimiter } from './middleware/rateLimitMiddleware.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

import serviceRoutes from './routes/serviceRoutes.js';
import addonRoutes from './routes/addonRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import studioRoutes from './routes/studioRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root or local .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl && req.originalUrl.includes('/webhook')) {
      req.rawBody = buf;
    }
  }
}));
app.use(express.urlencoded({ extended: true }));

// Apply general API rate limiter
app.use('/api', apiLimiter);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health & Database State Endpoint
app.get('/api/v1/health', (req, res) => {
  const dbStates = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    message: 'DetailDock API Service is healthy and operational.',
    database: {
      status: dbStates[dbState] || 'Unknown',
      connected: dbState === 1
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API v1 Routes
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/addons', addonRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/pricing', pricingRoutes);
app.use('/api/v1/availability', availabilityRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/studio', studioRoutes);

// Fallback 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested endpoint ${req.originalUrl} does not exist.`
    }
  });
});

// Global Error Handler
app.use(errorMiddleware);

// Initialize DB and start listening
export const startServer = async (port = PORT) => {
  await connectDB();
  return app.listen(port, () => {
    console.log(`[DetailDock API]: Server listening on http://localhost:${port}`);
  });
};

import { pathToFileURL } from 'url';

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  startServer();
}

export default app;
