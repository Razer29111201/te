import express from 'express';
import multer from 'multer';
import { getSeler, setproduct, getNew, setNews, deleteuser, edituser, adduser, getproduct } from '../controller/sellerController.js';
import { upload } from '../controller/multer.js';

const router = express.Router();


router.get('/', getSeler)
router.get('/getproduct', getproduct)
router.post('/setproduct', upload.single('img'), setproduct)
router.get('/news', getNew)
router.post('/setNews', upload.single('imgNews'), setNews)
router.post('/deleteuser', deleteuser)
router.post('/edituser', edituser)
router.post('/adduser', adduser)


module.exports = router