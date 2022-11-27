const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const historyController = require('../controllers/histories');
const { historiesValidation } = require('../helpers/historiesValidation');
app.use(allowCrossDomain)

route.post("/api/histories/addhistory",historiesValidation ,historyController.createHistories)
route.get("/api/histories/getAllhistories", historyController.getAllHistories)
route.get("/api/histories/gethistoryByUserId/:userId", historyController.getHistoriesByUserId)
route.get("/api/histories/gethistoryById/:historyId", historyController.getHistoryById)
route.patch("/api/histories/edithistoryById/:historyId", historyController.editHistory)
route.delete("/api/histories/deletehistoryById/:historyId", historyController.deleteHistoryById)

module.exports = route