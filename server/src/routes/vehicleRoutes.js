import express from 'express';
import { getVehicleCategories } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/categories', getVehicleCategories);

export default router;
