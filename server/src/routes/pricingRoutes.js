import express from 'express';
import { calculateServicePricing } from '../controllers/pricingController.js';

const router = express.Router();

router.post('/calculate', calculateServicePricing);

export default router;
