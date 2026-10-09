import express from 'express';
import { createBooking, trackBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Public booking creation
router.post('/', createBooking);

// Public status tracking by booking code
router.get('/track/:code', trackBooking);

export default router;
