import express from 'express'

import { order } from '../controller/order_controller.js';
import protectRoute from '../middleware/protect_route.js';

const router = express.Router();

router.post('/:prdid',protectRoute,order)

export default router