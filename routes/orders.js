const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const OrderController = require('../controllers/orders');
const { orderValidation } = require('../helpers/orderValidation');
app.use(allowCrossDomain)

route.post("/api/orders/addOrder",orderValidation ,OrderController.addOrders)
route.get("/api/orders/getAllOrders", OrderController.getAllOrders)
route.get("/api/orders/getOrderByUserId/:userId", OrderController.getOrderByUserId)
route.get("/api/orders/getOrderById/:orderId", OrderController.getOrderById)
route.patch("/api/orders/editOrderById/:orderId", OrderController.editOrder)
route.delete("/api/orders/deleteOrderById/:orderId", OrderController.deleteOrderById)
module.exports = route