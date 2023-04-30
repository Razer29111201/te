import express from 'express';
import multer from 'multer';
import { getSeler, setproduct, getNew, setNews } from '../controller/sellerController.js';
import { upload } from '../controller/multer.js';

const router = express.Router();


router.get('/', getSeler)
router.post('/setproduct', upload.single('img'), setproduct)
router.get('/news', getNew)
router.post('/setNews', upload.single('imgNews'), setNews)


module.exports = router