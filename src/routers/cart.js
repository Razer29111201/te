import express from 'express'
const router = express.Router();
import { setProduct, getProduct, deleteProduct } from '../controller/cartController';

router.post('/', setProduct)
router.get('/', getProduct)
router.post('/delete', deleteProduct)
// router.post('/setproduct', upload.single('img'), setproduct)


export default router