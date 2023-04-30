import express from 'express'
import cookieParser from 'cookie-parser'
import viewEngine from './configs/View_Engine.js'
import initRouter from './routers/main.js'
import bodyParser from 'body-parser'
const app = express()
const port = 8080
app.use(cookieParser())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app)
initRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})