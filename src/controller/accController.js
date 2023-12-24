import pool from "../configs/connerDB.js";
import jwt from "jsonwebtoken";
import { FB } from "fb/lib/fb.js";

const getLogin = async (req, res) => {

    res.render('account/login')

}
const getRegister = async (req, res) => {
    res.render('account/register')

}
const jwtAcc = async (req, res, next) => {
    var user = req.body.user
    var pass = req.body.pass
    var [data, err] = await pool.execute('SELECT * FROM `user` WHERE `user` = ? AND `pass` = ?', [user, pass])
    var id = data[0].id
    var token = jwt.sign(id, 'shhhhh');
    var d = new Date();
    d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    res.cookie('acc', token, expires);
    res.redirect('/')
    // jwt.verify(token, 'shhhhh', function (err, decoded) {
    //     console.log(decoded) // bar
    // });
    // console.log(token);,

}
const checkLogin = async (req, res, next) => {
    console.log(req.cookies.acc);
}
const dataacc = async (req, res, next) => {
    try {

        var token = req.cookies.acc
        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [data, err] = await pool.execute('SELECT * FROM `user` WHERE `id` = ?', [id])

        res.json(data[0])
    } catch (error) {

    }

}
const checkrole = async (req, res, next) => {

    var token = req.cookies.acc
    if (token) {

        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [data, err] = await pool.execute('SELECT * FROM `user` WHERE `id` = ?', [id])
        if (data[0].role == 0) {
            next()
        }
    }
    else {
        res.json('Bạn Không Đủ Quyền')
    }
}
const getallAcc = async (req, res, next) => {
    var [data, err] = await pool.execute('SELECT * FROM `user`')
    res.json(data)
}
const setRegister = async (req, res, next) => {
    console.log(req.body);
    var idcard = Math.floor(Math.random() * 10000000);
    try {
        await pool.execute("INSERT INTO `user`(`Name`, `user`, `pass`, `NPhone`, `Email`, `role`, `idCart`) VALUES (?,?,?,?,?,?,?)", [req.body.name, req.body.user, req.body.pass, req.body.nber, req.body.email, 1, idcard])
        res.redirect('/account')
    }
    catch {
        console.log('lỗi ha');
    }

}
export {
    getLogin, getRegister, jwtAcc, checkLogin, checkrole, getallAcc, setRegister, dataacc
}