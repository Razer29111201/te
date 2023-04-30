import express from 'express'
import multer from 'multer';
import { getUser, setuser } from '../controller/userController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/avatar')
    },
    filename: function (req, file, cb) {
        var today = new Date()
        today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
        console.log(today)

        cb(null, today + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })
const router = express.Router();



router.get('/', getUser)
router.post('/setuser', setuser)

module.exports = router