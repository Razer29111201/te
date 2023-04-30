import express from 'express'
const router = express.Router();
import { getLogin, getRegister, jwtAcc, checkLogin, checkrole, getallAcc, setRegister } from '../controller/accController';


router.get('/', getLogin)
router.get('/allacc', getallAcc)
router.get('/register', getRegister)
router.get('/checklogin', checkLogin)
router.get('/checkrole', checkrole)
router.post('/jwtAcc', jwtAcc)
router.post('/register', setRegister)



export default router