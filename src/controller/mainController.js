import express from "express";
import pool from "../configs/connerDB.js";
const getHomePage = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM `user`')
    const [product, producterr] = await pool.execute('SELECT * FROM `product`  ORDER BY id DESC')
    const [news, newserr] = await pool.execute('SELECT * FROM `news` ORDER BY id DESC')
    // const [slide, slideerr] = await pool.execute('SELECT * FROM `discount information` ORDER BY id DESC')
    const [disinfo, disinfoerr] = await pool.execute('SELECT * FROM `discount information`  ORDER BY id DESC')
    news.forEach(e => {
        var date = new Date(e.date);
        e.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return e
    })


    res.render('homepage', { data: data, disinfo: disinfo, product: product, news: news })
}
const getAbout = async (req, res) => {
    const [news, newserr] = await pool.execute('SELECT * FROM `news` ORDER BY id DESC')
    res.render('About', { news: news })

}
const getContact = async (req, res) => {
    const [news, newserr] = await pool.execute('SELECT * FROM `news` ORDER BY id DESC')
    res.render('contact', { news: news })
}
const sucess = async (req, res) => {

    res.render('sucess')
}
export {
    getHomePage, getAbout, getContact, sucess
}