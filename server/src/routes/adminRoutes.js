import express from 'express';
import { 
  getAllBookings, 
  getBookingById, 
  updateBookingStatus, 
  getDashboardStats, 
  updateStudioSettings,
  getStudioSettings,
  getBookingCommunicationLinks,
  recordDispatchedMessage
} from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce authentication & admin role guard across all admin routes
router.use(protect);
router.use(restrictTo('admin'));

// Bookings pipeline management
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.patch('/bookings/:id/status', updateBookingStatus);

// Communications dispatch & links
router.get('/bookings/:code/communication-links', getBookingCommunicationLinks);
router.post('/bookings/:code/dispatch-message', recordDispatchedMessage);

// Business metrics & settings
router.get('/dashboard/stats', getDashboardStats);
router.get('/settings', getStudioSettings);
router.put('/settings', updateStudioSettings);

export default router;
