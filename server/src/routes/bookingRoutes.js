import express from 'express';
import { 
  createBooking, 
  trackBooking,
  getBookingInvoice,
  resendBookingReceipt,
  downloadWarrantyCertificate
} from '../controllers/bookingController.js';

const router = express.Router();

// Public booking creation
router.post('/', createBooking);

// Public status tracking by booking code
router.get('/track/:code', trackBooking);

// Public PDF Invoice / Receipt Download
router.get('/:code/invoice', getBookingInvoice);

// Public PDF Ceramic Coating Warranty Certificate Download
router.get('/:code/warranty', downloadWarrantyCertificate);

// Resend transactional email receipt
router.post('/:code/resend-receipt', resendBookingReceipt);

export default router;
