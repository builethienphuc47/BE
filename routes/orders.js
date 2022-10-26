const express = require("express");
const route = express.Router();

const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const OrdersController = require("../controllers/orders")

app.use(allowCrossDomain)

route.post("api/orders/create", OrdersController.createOrders)
route.get("api/orders/getAllOrders", OrdersController.getAllOrders)
route.get("api/orders/getOrderById/:orderId", OrdersController.getOrderById)
route.delete("api/orders/deleteOrderById/:orderId", OrdersController.deleteOrderById)


module.exports = route