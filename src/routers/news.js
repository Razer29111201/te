import express from 'express'
const router = express.Router();
import { getNewsdetail, getNews } from '../controller/newsController';

router.get('/', getNews)
router.get('/:id', getNewsdetail)



export default router