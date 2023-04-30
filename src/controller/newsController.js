import pool from "../configs/connerDB.js";

const getNews = async (req, res) => {
    var id = req.params.id
    const [news, newerr] = await pool.execute('SELECT * FROM `news`')
    news.forEach(e => {
        var date = new Date(e.date);
        e.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return e
    })
    console.log(news[3].date);
    res.render('news/news', { news: news })
}

const getNewsdetail = async (req, res) => {
    var id = req.params.id
    const [news, newerr] = await pool.execute('SELECT * FROM `news`')
    const [newDetail, err] = await pool.execute('SELECT * FROM `news` WHERE `id` = ?', [id])
    res.render('news/newsDetails', { newss: newDetail[0], news: news })
}

export {
    getNewsdetail, getNews
}