const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const CartController = require('../controllers/carts');
const { cartValidation } = require('../helpers/cartValidation');
app.use(allowCrossDomain)

route.post("/api/carts/addCart",cartValidation ,CartController.createCarts)
route.get("/api/carts/getAllCarts", CartController.getAllCarts)
route.get("/api/carts/getCartByUserId/:userId", CartController.getCartByUserId)
route.get("/api/carts/getCartById/:cartId", CartController.getCartById)
route.patch("/api/carts/editCartById/:cartId", CartController.editCart)
route.delete("/api/carts/deleteCartById/:cartId", CartController.deleteCartById)
module.exports = route