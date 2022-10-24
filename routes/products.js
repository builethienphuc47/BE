const express = require("express");
const route = express.Router();
// const cors = require('cors'); 
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const ProductsController = require("../controllers/products");

app.use(allowCrossDomain)
// dung thang
// app.use(cors({ origin: '*', credentials: true }))
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header(
//         'Access-Control-Allow-Origin',
//         'Origin, X-Requested-With, Content-Type, Accept',
//     )
//     next()
// })

route.post("/api/products/create", ProductsController.createProduct);
route.get("/api/products/getAllProducts", ProductsController.getAllProducts);
route.get("/api/products/getProductById/:productId", ProductsController.getProductById);
route.delete("/api/products/deleteProductById/:productId", ProductsController.deleteProductById);
route.patch("/api/products/editProduct/:productId", ProductsController.editProduct);
//cau truc API: https://{domain}/{prefix}/{anpoint} 

module.exports = route;
