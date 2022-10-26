const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

        customerEmail: {
            type: String,
            require: true,
        },

        customerPhone: {
            type: Number,
            require: true,
        },

        customerAdress: {
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
    },

    { timestamps : true}

);

const Orders = mongoose.model("Orders", ordersShema);
module.exports = Orders