const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const OrderController = require('../controllers/orders');
app.use(allowCrossDomain)

route.post("/api/orders/addOrder", OrderController.addOrders)
route.get("/api/orders/getAllOrders", OrderController.getAllOrders)
route.get("/api/orders/getOrderById/:orderId", OrderController.getOrderById)
route.patch("/api/orders/editOrderById/:orderId", OrderController.editOrder)
route.delete("/api/orders/deleteOrderById/:orderId", OrderController.deleteOrderById)
module.exports = route