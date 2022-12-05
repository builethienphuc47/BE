const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ordersShema = new Schema(
    {
        userId: {
            type: String,
            require: true,
        },

        customerName : {
            type: String,
            require: true,
        },

        customerPhone: {
            type: String,
            require: true,
        },

        customerAddress: {
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

        type: {
            type: String,
            require: true
        },
        orderStatus: {
            type: Number,
            require: true
        },
        images: {
            type: Object,
            require: true
        }
    },

    { timestamps : true}
)

const Orders = mongoose.model("Orders", ordersShema)
module.exports = Orders