import express from 'express';
import multer from 'multer';

import { getSeler, setproduct, getNew, setNews, deleteuser, edituser, adduser, getproduct, editproduct, geteditproduct, deleteproduct, editnews, seteditNews, deletenews } from '../controller/sellerController.js';
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
router.post('/editproduct', upload.single('img'), editproduct)
router.get('/editproduct/:id', geteditproduct)
router.get('/editnews/:id', editnews)
router.post('/deleteproduct', deleteproduct)
router.post('/seteditNews', upload.single('imgNews'), seteditNews)
router.post('/deletenews', deletenews)



module.exports = router