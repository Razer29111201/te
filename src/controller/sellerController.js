import pool from "../configs/connerDB.js";

const getSeler = async (req, res) => {
    res.render('seller/getseller')
}
const setproduct = async (req, res) => {
    var file = req.file.path.split('\\').splice(2).join('/')
    var offprice = (req.body.price / 100) * (100 - req.body.Discout)




    await pool.execute("INSERT INTO `product`( `productname`, `price`, `discount`,`offprice`,  `category`, `Price_includes`, `size`,`Warehouse`,  `summary`, `img`)  VALUES(?,?,?,?,?,?,?,?,?,?)", [req.body.name, req.body.price, req.body.Discout, offprice, req.body.category, req.body.Price_includes, req.body.summary, req.body.warehouse, req.body.editor, file])
    res.redirect('/seller')

}


const getNew = async (req, res) => {
    res.render('seller/getNews')
}
const setNews = async (req, res) => {
    var file = req.file.path.split('\\').splice(2).join('/')
    var today = new Date()
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    console.log(today);

    await pool.execute("INSERT INTO `news`( `Title`, `img`, `Content`,  `date`) VALUES (?,?,?,?)", [req.body.title, file, req.body.content, today])
    res.redirect('/seller/news')





}
export {
    getSeler, setproduct, getNew, setNews
}