import pool from "../configs/connerDB.js";
import jwt from "jsonwebtoken";

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
                console.log("lỗi vãi lồn");
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
export {
    setProduct, getProduct, deleteProduct
}