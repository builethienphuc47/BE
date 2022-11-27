const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const CartController = require('../controllers/carts');
const { cartValidation } = require('../helpers/cartValidation');
app.use(allowCrossDomain)

route.post("/api/carts/addcart",cartValidation ,CartController.createCarts)
route.get("/api/carts/getAllcarts", CartController.getAllCarts)
route.get("/api/carts/getcartByUserId/:userId", CartController.getCartByUserId)
route.get("/api/carts/getcartById/:cartId", CartController.getCartById)
route.patch("/api/carts/editcartById/:cartId", CartController.editCart)
route.delete("/api/carts/deletecartById/:cartId", CartController.deleteCartById)
module.exports = route