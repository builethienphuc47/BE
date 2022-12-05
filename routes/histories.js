const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const historyController = require('../controllers/histories');
const { historiesValidation } = require('../helpers/historiesValidation');
app.use(allowCrossDomain)

route.post("/api/histories/addHistory",historiesValidation ,historyController.createHistories)
route.get("/api/histories/getAllHistories", historyController.getAllHistories)
route.get("/api/histories/getHistoryByUserId/:userId", historyController.getHistoriesByUserId)
route.get("/api/histories/getHistoryById/:historyId", historyController.getHistoryById)
route.patch("/api/histories/editHistoryById/:historyId", historyController.editHistory)
route.delete("/api/histories/deleteHistoryById/:historyId", historyController.deleteHistoryById)

module.exports = route