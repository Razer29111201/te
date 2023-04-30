import express from 'express'
const router = express.Router();


router.get('/', getSeler)
router.post('/setproduct', upload.single('img'), setproduct)


export default router