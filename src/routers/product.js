import express from 'express'
const router = express.Router();
import { getProductdetail, getproduct, getproductcate, getCart } from '../controller/productController';


router.get('/:id', getProductdetail)
router.get('/', getproduct)
router.get('/category/:cate', getproductcate)
router.get('/cart/a', getCart)


export default router