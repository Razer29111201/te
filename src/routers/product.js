import express from 'express'
const router = express.Router();
import { getProductdetail, getproduct, getproductcate, getCart, getproductapi, setproductapi } from '../controller/productController';


router.get('/:id', getProductdetail)
router.get('/', getproduct)
router.get('/send/api', getproductapi)
router.post('/send/api', setproductapi)
router.get('/category/:cate', getproductcate)
router.get('/cart/a', getCart)


export default router