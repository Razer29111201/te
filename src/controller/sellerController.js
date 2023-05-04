import pool from "../configs/connerDB.js";


const getSeler = async (req, res) => {
    const [acc, err] = await pool.execute('SELECT * FROM `user` ')
    const [product, err1] = await pool.execute('SELECT * FROM `product` ')
    const [slide, err2] = await pool.execute('SELECT * FROM `discount information`')
    const [news, err3] = await pool.execute('SELECT * FROM `news` ')
    res.render('admin/admin', { acc: acc, product: product, slide: slide, news: news })
}
const setproduct = async (req, res) => {
    var file = req.file.path.split('\\').splice(2).join('/')
    var offprice = (req.body.price / 100) * (100 - req.body.Discout)
    await pool.execute("INSERT INTO `product`( `productname`, `price`, `discount`,`offprice`,  `category`, `Price_includes`, `size`,`Warehouse`,  `summary`, `img`)  VALUES(?,?,?,?,?,?,?,?,?,?)", [req.body.name, req.body.price, req.body.Discout, offprice, req.body.category, req.body.Price_includes, req.body.summary, req.body.warehouse, req.body.editor, file])
    res.redirect('/seller?query=2')

}


const getNew = async (req, res) => {
    res.render('seller/getNews')
}
const getproduct = async (req, res) => {
    res.render('seller/getseller')
}
const setNews = async (req, res) => {
    var file = req.file.path.split('\\').splice(2).join('/')
    var today = new Date()
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    console.log(today);

    await pool.execute("INSERT INTO `news`( `Title`, `img`, `Content`,  `date`) VALUES (?,?,?,?)", [req.body.title, file, req.body.content, today])
    res.redirect('/seller/news')





}
const deleteuser = async (req, res) => {
    var id = req.body.id
    console.log(id);
    try {
        for (var i = 0; i < id.length; i++) {
            var data = parseInt(id[i])
            console.log(data);
            await pool.execute('DELETE FROM `cart` WHERE `iduser` = ?', [data])
            await pool.execute('DELETE FROM `user` WHERE `id` = ?', [data])

        }
        res.json('oke')
        console.log('b');
    }
    catch {
        console.log('a');
    }
}
const edituser = async (req, res) => {
    try {


        await pool.execute("UPDATE `user` SET `Name`=?,`user`= ? ,`address`= ? ,`NPhone`= ? ,`Email`= ?  WHERE `id`= ?", [req.body.name.trim(), req.body.user.trim(), req.body.address.trim(), req.body.sdt.trim(), req.body.Email.trim(), req.body.id])
        res.json('true')
    }
    catch {

    }


}
const adduser = async (req, res) => {
    var idcard = Math.floor(Math.random() * 10000000);
    try {
        await pool.execute('INSERT INTO `user`( `Name`, `user`, `pass`, `address`, `NPhone`, `Email`, `role`, `idCart`) VALUES (?,?,?,?,?,?,?,?)', [req.body.name, req.body.user, req.body.pass, req.body.address, req.body.sdt, req.body.email, req.body.role, idcard])
        res.redirect('/seller?query=1');
    } catch (error) {

    }

}
const geteditproduct = async (req, res) => {
    var id = req.params.id
    try {
        var [product, err] = await pool.execute("SELECT * FROM `product` WHERE `id` =? ", [id])
        console.log(product[0]);
        res.render('seller/editseller', { product: product[0] })
    } catch (error) {

    }
}
const editproduct = async (req, res) => {
    var file = req.file.path.split('\\').splice(2).join('/')

    var offprice = (req.body.price / 100) * (100 - req.body.Discout)
    try {
        await pool.execute("UPDATE `product` SET `productname`= ? ,`price`= ? ,`discount`= ? ,`offprice`= ? ,`category`= ? ,`Price_includes`= ? ,`size`= ? ,`Warehouse`= ? ,`summary`= ? ,`img`= ?  WHERE `id` = ?", [req.body.name, req.body.price, req.body.Discout, offprice, req.body.category, req.body.Price_includes, req.body.summary, req.body.warehouse, req.body.editor, file, req.body.id])
        res.redirect('/seller?query=2')
    } catch (error) {
        console.log(error);
    }

}

const deleteproduct = async (req, res) => {
    var id = req.body.id

    try {
        for (var i = 0; i < id.length; i++) {
            var data = parseInt(id[i])

            await pool.execute('DELETE FROM `product` WHERE `id` = ?', [data])

        }
        res.json('oke')
        console.log('b');
    }
    catch {
        console.log('a');
    }
}
export {
    getSeler, setproduct, getNew, setNews, deleteuser, edituser, adduser, getproduct, editproduct, geteditproduct, deleteproduct
}