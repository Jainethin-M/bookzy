import express from 'express'

import { editProduct , createProduct , deleteProduct , getProduct , getAllProduct , getSomeProduct , filterProductOptions} from '../controller/product_controller.js';

const router = express.Router();

router.post('/add',createProduct)
router.get('/prd/filter',filterProductOptions)

router.patch('/prd/:prdid',editProduct)
router.delete('/prd/:prdid',deleteProduct)
router.get('/prd/:prdid',getProduct)


router.get('/all',getAllProduct)
router.get('/prd',getSomeProduct)

export default router;