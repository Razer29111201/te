import pool from "../configs/connerDB.js";
import jwt from "jsonwebtoken";
import { getproduct } from "./productController.js";

const setProduct = async (req, res) => {
    var idUser = req.cookies.acc
    if (idUser) {
        var id = jwt.verify(idUser, 'shhhhh', function (err, decoded) {
            return decoded
        });
        try {

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
        } catch (error) {

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
    try {

        var token = req.cookies.acc
        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [data, err] = await pool.execute('SELECT * FROM `user` WHERE `id` = ?', [id])


        res.render('cart/payment', { product: product, num: num, total: total, totall: totall, a: a, data: data[0] })
    } catch (error) {

    }



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


    try {
        await pool.execute("INSERT INTO `orderproduct`( `idproduct`, `iduser`,`img`,`productname`, `soluong`, `address`, `total`,`idorder`) VALUES (?,?,?,?,?,?,?,?)", [parseInt(req.body.idproduct), parseInt(req.body.iduser), req.body.img, req.body.productname, parseInt(req.body.num), req.body.address, parseInt(req.body.total), req.body.idorder])
        res.json('oke')
    } catch (error) {
        console.log(error);
    }

}

const setaddress = async (req, res) => {
    var data = ' '.concat(req.body.t1, ' - ', req.body.t2, ' - ', req.body.t3, ' - ', req.body.t4, ' - ')
    console.log(data, req.body);
    var token = req.cookies.acc
    var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
        return decoded
    });
    try {
        await pool.execute("UPDATE `user` SET `address`= ? WHERE `id` = ?", [data, id])
        res.redirect('/cart/payment')
    } catch (error) {

    }

}
const getorder = async (req, res) => {
    var token = req.cookies.acc
    var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
        return decoded
    });
    function unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    var loading = []
    try {
        var oadidorder = []

        var totalload = []
        const [load, errload] = await pool.execute("SELECT * FROM `orderproduct` WHERE `iduser`= ? AND `status`= 0", [id])

        for (var i = 0; i < load.length; i++) {
            oadidorder.push(load[i].idorder)



        }

        var idorder = unique(oadidorder)
        for (var i = 0; i < idorder.length; i++) {

            const [load1, errload1] = await pool.execute('SELECT * FROM `orderproduct` WHERE `idorder` = ? AND `status`= 0', [idorder[i]])

            loading.push(load1)

        }
        for (var i = 0; i < loading.length; i++) {
            var total = 0
            for (var j = 0; j < loading[i].length; j++) {

                total += loading[i][j].price * loading[i][j].soluong

            }
            totalload.push(total)
        }
        // console.log(totalload);

    } catch (error) {
        console.log(error);
    }
    var suscess = []
    try {
        var sussidorder = []

        var totalsuss = []
        const [load, errload] = await pool.execute("SELECT * FROM `orderproduct` WHERE `iduser`= ? AND `status`= 1", [id])

        for (var i = 0; i < load.length; i++) {
            sussidorder.push(load[i].idorder)



        }

        var sussorder = unique(sussidorder)
        for (var i = 0; i < sussorder.length; i++) {

            const [load1, errload1] = await pool.execute('SELECT * FROM `orderproduct` WHERE `idorder` = ? AND `status`= 1', [sussorder[i]])

            suscess.push(load1)

        }
        for (var i = 0; i < suscess.length; i++) {
            var total = 0
            for (var j = 0; j < suscess[i].length; j++) {

                total += suscess[i][j].price * suscess[i][j].soluong

            }
            totalsuss.push(total)
        }


    } catch (error) {
        console.log(error);
    }

    var del = []
    try {
        var deleteidorder = []

        var totaldelete = []
        const [load, errload] = await pool.execute("SELECT * FROM `orderproduct` WHERE `iduser`= ? AND `status`= 2", [id])

        for (var i = 0; i < load.length; i++) {
            deleteidorder.push(load[i].idorder)



        }

        var deleteorder = unique(deleteidorder)
        for (var i = 0; i < deleteorder.length; i++) {

            const [load1, errload1] = await pool.execute('SELECT * FROM `orderproduct` WHERE `idorder` = ? AND `status`= 2', [deleteorder[i]])

            del.push(load1)

        }
        for (var i = 0; i < del.length; i++) {
            var total = 0
            for (var j = 0; j < del[i].length; j++) {

                total += del[i][j].price * del[i][j].soluong

            }
            totaldelete.push(total)
        }
        console.log(deleteorder, del, totaldelete);

    } catch (error) {
        console.log(error);
    }



    res.render('cart/order', { loading: loading, idorder: idorder, totalload: totalload, suscess: suscess, sussorder: sussorder, totalsuss: totalsuss, deleteorder: deleteorder, del: del, totaldelete: totaldelete })

}

export {
    setProduct, getProduct, deleteProduct, setPayment, getPayment, getPaymentApi, comfimpayment, setaddress, getorder
}