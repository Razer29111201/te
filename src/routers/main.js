import express from "express";
import seller from "./seller.js"
import user from "./user.js"
import news from "./news.js"
import product from "./product.js"
import about from "./about.js"
import cart from "./cart.js"
import { checkrole } from '../controller/accController.js';
import acc from "./acc.js"
import { getHomePage, getContact } from "../controller/mainController.js";

let router = express.Router()
const initRouter = (app) => {
    app.get('/', getHomePage)
    app.get('/contact', getContact)
    app.use('/user', user)
    app.use('/news', news)
    app.use('/cart', cart)
    app.use('/account', acc)
    app.use('/about', about)
    app.use('/product', product)
    app.use('/seller', checkrole, seller)
    return app.use('/', router)
}
export default initRouter