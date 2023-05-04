import pool from "../configs/connerDB.js";
import jwt from "jsonwebtoken";
import { getproduct } from "./productController.js";

const setProduct = async (req, res) => {
    var idUser = req.cookies.acc
    if (idUser) {
        var id = jwt.verify(idUser, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [getcart, err] = await pool.execute('SELECT * FROM `cart` WHERE `iduser` = ? AND  `idproduct` = ?', [id, req.body.idproduct])

        if (getcart.length > 0) {
            res.json(false)
            console.log('a');
        }
        else {
            console.log('b ');
            try {
                await pool.execute('INSERT INTO `cart`( `idproduct`, `iduser`, `quantity`) VALUES (?,?,?)', [req.body.idproduct, id, 1])
            } catch (error) {
                console.log("lỗi");
            }
        }
    }




}
const getProduct = async (req, res) => {
    var idUser = req.cookies.acc
    if (idUser) {

        var id = jwt.verify(idUser, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [getcart, err] = await pool.execute('SELECT * FROM `cart` WHERE `iduser` = ?', [id])
        var getproduct = []
        for (var i = 0; i < getcart.length; i++) {
            var [getProduct, err] = await pool.execute('SELECT * FROM `product` WHERE `id` = ?', [getcart[i].idproduct])
            getproduct.push(getProduct[0])
        }

        res.json(getproduct)
    }
}
const deleteProduct = async (req, res) => {
    console.log(req.body.id);
    try {
        await pool.execute('DELETE FROM `cart` WHERE `idproduct` = ?', [req.body.id])
        res.json(false)
    } catch (error) {

    }

}
const setPayment = async (req, res) => {
    var id = req.body.id



    res.json({ id: id, number: req.body.number })

}
const getPayment = async (req, res) => {
    var id = req.cookies.id.split(',')
    var num = req.cookies.num.split(',')
    var total = []
    var product = []
    var totall = 0
    for (var i = 0; i < id.length; i++) {
        var [Product, err] = await pool.execute('SELECT * FROM `product` WHERE `id` = ?', [id[i]])

        total.push(Product[0].offprice * num[i])
        totall = Product[0].offprice + totall
        product.push(Product[0])
    }

    var a = totall + 35500

    res.render('cart/payment', { product: product, num: num, total: total, totall: totall, a: a })


}
const getPaymentApi = async (req, res) => {
    var id = req.cookies.id.split(',')
    var num = req.cookies.num.split(',')
    var total = []
    var product = []
    var totall = 0
    for (var i = 0; i < id.length; i++) {
        var [Product, err] = await pool.execute('SELECT * FROM `product` WHERE `id` = ?', [id[i]])
        total.push(Product[0].offprice * num[i])
        totall = Product[0].offprice + totall
        product.push(Product[0])
    }
    // console.log(product);
    var a = totall + 35500
    try {

        var token = req.cookies.acc
        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [data, err] = await pool.execute('SELECT * FROM `user` WHERE `id` = ?', [id])


        res.json({ product: product, num: num, total: total, totall: totall, a: a, data: data[0] })
    } catch (error) {

    }


}

const comfimpayment = async (req, res) => {

    console.log(req.body);
    try {
        await pool.execute("INSERT INTO `orderproduct`( `idproduct`, `iduser`, `soluong`, `address`, `total`) VALUES (?,?,?,?,?)", [parseInt(req.body.idproduct), parseInt(req.body.iduser), parseInt(req.body.num), req.body.address, parseInt(req.body.total)])
        console.log('a');
    } catch (error) {
        console.log(error);
    }

}
export {
    setProduct, getProduct, deleteProduct, setPayment, getPayment, getPaymentApi, comfimpayment
}