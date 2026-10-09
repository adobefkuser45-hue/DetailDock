import express from 'express';
import { getAddons } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getAddons);

export default router;
