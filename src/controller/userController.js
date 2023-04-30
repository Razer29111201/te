import pool from "../configs/connerDB.js";

const getUser = async (req, res) => {
    res.render('seller/getseller')
}
const setuser = async (req, res) => {
    res.send('aaa')
}
export {
    getUser, setuser
}