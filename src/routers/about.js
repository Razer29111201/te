import express from 'express'
const router = express.Router();
import { getAbout } from '../controller/mainController';


router.get('/', getAbout)



export default router