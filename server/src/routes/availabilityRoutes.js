import express from 'express';
import { 
  getSlotAvailability, 
  getStudioInformation 
} from '../controllers/availabilityController.js';

const router = express.Router();

router.get('/', getSlotAvailability);
router.get('/studio-info', getStudioInformation);

export default router;
