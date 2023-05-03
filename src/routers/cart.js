import express from 'express'
const router = express.Router();
import { setProduct, getProduct, deleteProduct, setPayment, getPayment } from '../controller/cartController';

router.post('/', setProduct)
router.get('/', getProduct)
router.post('/delete', deleteProduct)
router.post('/payment', setPayment)
router.get('/payment', getPayment)
// router.post('/setproduct', upload.single('img'), setproduct)


export default router