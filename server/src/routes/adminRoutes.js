import express from 'express';
import { 
  getAllBookings, 
  getBookingById, 
  updateBookingStatus, 
  getDashboardStats, 
  updateStudioSettings,
  getStudioSettings,
  getBookingCommunicationLinks,
  recordDispatchedMessage,
  getCatalog,
  createPackage,
  updatePackage,
  deletePackage,
  createAddon,
  updateAddon,
  deleteAddon,
  updateVehicleCategory,
  resetCatalogToDefaults,
  issueWarrantyCertificate,
  updateInspectionData
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

// Service Catalog & Pricing Management
router.get('/catalog', getCatalog);
router.post('/catalog/packages', createPackage);
router.put('/catalog/packages/:id', updatePackage);
router.delete('/catalog/packages/:id', deletePackage);

router.post('/catalog/addons', createAddon);
router.put('/catalog/addons/:id', updateAddon);
router.delete('/catalog/addons/:id', deleteAddon);

router.put('/catalog/categories/:id', updateVehicleCategory);
router.post('/catalog/reset', resetCatalogToDefaults);

// Warranty & Inspection Operations
router.post('/bookings/:id/issue-warranty', issueWarrantyCertificate);
router.post('/bookings/:id/inspection', updateInspectionData);

export default router;
