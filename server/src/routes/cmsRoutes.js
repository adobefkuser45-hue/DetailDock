import express from 'express';
import { 
  getPublicCMS, 
  getAdminCMS, 
  updateAdminCMS, 
  resetCMSToDefaults 
} from '../controllers/cmsController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for customer site
router.get('/content', getPublicCMS);

// Protected admin routes
router.get('/admin/content', protect, restrictTo('admin'), getAdminCMS);
router.put('/admin/content', protect, restrictTo('admin'), updateAdminCMS);
router.patch('/admin/content', protect, restrictTo('admin'), updateAdminCMS);
router.post('/admin/reset', protect, restrictTo('admin'), resetCMSToDefaults);

export const cmsRoutes = router;
export default router;
