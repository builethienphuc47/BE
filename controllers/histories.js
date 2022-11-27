const Histories = require('../models/histories')
const Auths = require("../models/auths")
const Products = require("../models/products")
const errorFunction = require("../utils/errorFunction")

//CRUD
// Create

const createHistories = async (req, res, next) => {
    try {
        const userId = await Auths.findById(req.body.userId)
        const product = await Products.findById(req.body.productId)

        if (!userId) {
            return res.json(errorFunction(true, 204, "This userId have not in DB"))
        };
        if (!product) {
            return res.json(errorFunction(true, 204, "This productId have not in DB"))
        }
        else {
            let newHistory = new Histories(req.body);
            newHistory.save().then((respone) => {
                res.json(errorFunction(false, 200, "Created history successfully"))
            })
        }

    } catch (error) {
        res.json(errorFunction(true, 400, "Bad request"))
    }
}

// READ
// get all 
const getAllHistories = async (req, res, next) => {
    try {
        const {
            pageSize = 12,
            pageNumber = 1,
            productName = "",
            productBrand = "",
            historyByColumn,
            historyByDirection = "desc",
        } = req.query;

        const filter = {
            $and: [
                {
                    productName: {
                        $regex: productName,
                        $options: "$i",
                    },
                },
                {
                    productBrand: {
                        $regex: productBrand,
                        $options: "$i",
                    },
                },
            ]
        }

        const filterHistories = await Histories.find(filter)
            .sort(`${historyByDirection === "asc" ? "" : "-"}`)
            .limit((pageSize * 1))
            .skip((pageNumber - 1) * pageSize);


        const allHistories = await Histories.find(filter);

        if (allHistories.length % pageSize === 0) {
            totalPage = allHistories.length / pageSize;
        } else {
            totalPage = parseInt(allHistories.length / pageSize) + 1;
        }

        if (allHistories.length > 0) {
            res.status(200).json({
                totalPage: totalPage,
                totalHistories: allHistories.length,
                histories: historyByDirection && historyByColumn ? filterHistories : filterHistories.reverse(),
            })
        } else {
            res.json(errorFunction(true, 200, "No result", []))
        }
    } catch (error) {
        res.json(errorFunction(true, 400, "Bad request"))
    }
}
//get by userId

const getHistoriesByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const filter = {
        $and: [
          {
            userId: {
              $regex: userId,
              $options: "$i",
            },
          },
        ],
      };
      const histories = await Histories.find(filter);
      return res.json({
        histories,
      });
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  
  // get by id
  
  const getHistoryById = async (req, res, next) => {
    const historyId = req.params.historyId;
    try {
      const history = await history.findById(historyId);
      if (history) {
        res.status(200).json({
          history,
        });
      } else {
        res.status(204).json({
          message: "This historyId have not in the database",
          history: {},
        });
      }
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  
  //UPDATE - PUT/PATH
  const editHistory = (req, res, next) => {
    try {
      const historyId = req.params.historyId;
      const isBoddyEmpty = Object.keys(req.body).length;
      if (isBoddyEmpty === 0) {
        return res.send({
          statusCode: 403,
          message: "Body request can not empty",
        });
      }
      Histories.findOneAndUpdate(historyId, req.body).then((data) => {
        if (data) {
          res.status(200).json({
            statusCode: 200,
            message: "Update history successfully",
          });
        } else {
          res.json({
            statusCode: 204,
            message: "This historyId have not in the database",
            historie: {},
          });
        }
      });
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  
  //DELETE
  
  const deleteHistoryById = async (req, res, next) => {
    const historyId = req.params.historyId;
    try {
      const historie = await Histories.findByIdAndDelete(historyId);
      if (historie) {
        res.status(200).json({
          statusCode: 200,
          message: "Deleted history successfully",
        });
      } else {
        res.json(
          errorFunction(true, 204, "This historyId has not in the database")
        );
      }
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  

module.exports = { createHistories, getAllHistories, getHistoryById, getHistoriesByUserId, editHistory, deleteHistoryById }