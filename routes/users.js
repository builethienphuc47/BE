const express = require('express');
const route = express.Router();
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const UsersController= require("../controllers/users")

app.use(allowCrossDomain)

route.post("/api/users/creacte",UsersController.addUser);
route.get("/api/users/getAllUsers",UsersController.getAllUsers);
module.exports = route;