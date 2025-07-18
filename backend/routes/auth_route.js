import express from 'express' 

import { signup , login , logout , me , updateProfile} from '../controller/auth_controller.js';
import protectRoute from '../middleware/protect_route.js'

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',protectRoute,logout)
router.get('/me',protectRoute,me)
router.post('/updateProfile',protectRoute,updateProfile)

export default router;