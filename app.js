import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({
    limit: "20mb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "20mb"
}))

app.use(cookieParser())

import orderRouter from './routes/order.route.js'
app.use("/api/v1", orderRouter)
export {app}


