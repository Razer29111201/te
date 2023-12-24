import express from 'express'
const router = express.Router();
import { setProduct, getProduct, deleteProduct, setPayment, getPayment, getPaymentApi, comfimpayment, setaddress, getorder } from '../controller/cartController';

router.post('/', setProduct)
router.get('/', getProduct)
router.post('/delete', deleteProduct)
router.post('/payment', setPayment)
router.get('/payment', getPayment)
router.get('/getpayment', getPaymentApi)
router.post('/comfimpayment', comfimpayment)
router.post('/setaddress', setaddress)
router.get('/order', getorder)
// router.post('/setproduct', upload.single('img'), setproduct)


export default router