const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartsShema = new Schema (
    {
        userId: {
            type: String,
            require: true,
        },

        productId: {
            type: String,
            require: true, 
        },

        productName: {
            type: String,
            require: true,
        },        
        productBrand: {
            type: String,
            require: true,
        },

        price: {
            type: Number,
            require: true,
        },
        
        quantity: {
            type: Number,
            require: true,
        },

        image: {
            type: Object,
            require: true
        },
    },

    { timestamps : true}

)
const Carts = mongoose.model("Carts", cartsShema)
module.exports = {Carts}