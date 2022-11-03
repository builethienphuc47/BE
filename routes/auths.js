const express = require('express');
const route = express.Router();
const app = express();
const  {authsValidation}  = require('../helpers/authsValidation');
const { allowCrossDomain } = require('../utils/corsMiddleware');

//CORS middleware


const AuthsController= require("../controllers/auths");
app.use(allowCrossDomain)



route.post("/api/auths/register",authsValidation, AuthsController.addUser);
route.get("/api/users/getAllUsers",AuthsController.getAllUsers);
module.exports = route;