import express from 'express';
import { 
  createBooking, 
  trackBooking,
  getBookingInvoice,
  resendBookingReceipt
} from '../controllers/bookingController.js';

const router = express.Router();

// Public booking creation
router.post('/', createBooking);

// Public status tracking by booking code
router.get('/track/:code', trackBooking);

// Public PDF Invoice / Receipt Download
router.get('/:code/invoice', getBookingInvoice);

// Resend transactional email receipt
router.post('/:code/resend-receipt', resendBookingReceipt);

export default router;
