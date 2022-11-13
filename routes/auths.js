const express = require('express');
const route = express.Router();
const app = express();
const  {authsValidation}  = require('../helpers/authsValidation');
const { allowCrossDomain } = require('../utils/corsMiddleware');

//CORS middleware


const AuthsController= require("../controllers/auths");
app.use(allowCrossDomain)



route.post("/api/auths/register",authsValidation, AuthsController.register);
route.post("/api/auths/login",AuthsController.login);
route.get("/api/auths/getAllUsers",AuthsController.getAllUsers);
route.get("/api/auths/getUserById/:userId",AuthsController.getUserById);
route.patch("/api/auths/editUser/:userId", AuthsController.editUser)
route.delete("/api/auths/deleteUser/:userId", AuthsController.deleteUserById)
module.exports = route;