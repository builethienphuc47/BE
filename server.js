require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ProductsRoute = require('./routes/products')
const AuthsRoute = require("./routes/auths")
const OrderRoute = require("./routes/orders")
// const connection_string = 'mongodb+srv://admin:1111@cluster0.l0sk4je.mongodb.net/test'

const test = process.env.TEST
// console.log(test)
const connection_string = process.env.CONNECTION_STRING

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection

const app = express()


app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT} `)
})

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("", ProductsRoute)
app.use("", AuthsRoute)
app.use("", OrderRoute)
