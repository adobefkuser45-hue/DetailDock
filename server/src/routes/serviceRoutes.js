import express from 'express';
import { 
  getServicePackages, 
  getServicePackageBySlug 
} from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getServicePackages);
router.get('/:slug', getServicePackageBySlug);

export default router;
