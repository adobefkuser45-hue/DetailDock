import express from 'express';
import { 
  login, 
  register, 
  getMe, 
  getCustomerGarage, 
  addSavedVehicle, 
  removeSavedVehicle 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);

// Customer Personal Atelier Garage
router.get('/customer/garage', protect, getCustomerGarage);
router.post('/customer/vehicles', protect, addSavedVehicle);
router.delete('/customer/vehicles/:vehicleId', protect, removeSavedVehicle);

export default router;
