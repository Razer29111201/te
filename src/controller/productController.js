import pool from "../configs/connerDB.js";

const getproduct = async (req, res) => {
    const [news, newerr] = await pool.execute('SELECT * FROM `news` ORDER BY id DESC')
    const [products, serr] = await pool.execute('SELECT * FROM `product` ORDER BY id DESC')
    news.forEach(e => {
        var date = new Date(e.date);
        e.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return e
    })
    res.render('product/product.ejs', { products: products, news: news })
}

const getproductapi = async (req, res) => {

    const [products, serr] = await pool.execute('SELECT * FROM `product` ORDER BY id DESC')
    res.send(products)
}
const setproductapi = async (req, res) => {
    console.log(req.body.name);
    if (!req.body.name == '') {

        const [name, err] = await pool.execute(`SELECT * FROM product WHERE productname LIKE N'%${req.body.name}%'`)
        res.json(name)
    }
}
const getProductdetail = async (req, res) => {
    var id = req.params.id
    const [news, newerr] = await pool.execute('SELECT * FROM `news`')
    const [productDetail, err] = await pool.execute('SELECT * FROM `product` WHERE `id` = ?', [id])
    const [products, serr] = await pool.execute('SELECT * FROM `product`')

    res.render('product/productDetail.ejs', { product: productDetail[0], news: news, products: products })
}
const getproductcate = async (req, res) => {
    var cate = req.params.cate
    const [news, newerr] = await pool.execute('SELECT * FROM `news`')

    const [category, cerr] = await pool.execute('SELECT * FROM `product` WHERE category = ? ', [cate])
    news.forEach(e => {
        var date = new Date(e.date);
        e.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return e
    })
    res.render('product/product_category.ejs', { products: category, news: news, cate: cate })
}

const getCart = async (req, res) => {
    if (req.cookies.token) {
        var a = []
        var token = req.cookies.token.split(',')
        var data = unique(token)
        for (var i = 0; i < data.length; i++) {
            try {

                const [category, cerr] = await pool.execute('SELECT * FROM `product` WHERE id = ? ', [data[i]])
                if (category.length > 0) {

                    a.push(category[0])
                }
            } catch {
                console.log('lỗi');
            }


        }
        function unique(arr) {
            var newArr = []
            for (var i = 0; i < arr.length; i++) {
                if (newArr.indexOf(arr[i]) === -1) {
                    newArr.push(arr[i])
                }
            }
            return newArr
        }


        res.send(a)
    }

}
export {
    getProductdetail, getproduct, getproductcate, getCart, getproductapi, setproductapi
}