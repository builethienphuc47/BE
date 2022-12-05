const Orders = require("../models/orders");
const errorFunction = require("../utils/errorFunction");
const Products = require("../models/products")
const Auths = require("../models/auths")
//CRUD

const addOrders = async (req, res, next) => {
  // get userId from body request
  // get user by userId and check in DB
  // IF - ELSE
  // If product => check quantity of this product (10)
  // If quantity of body request (2) <= quantity of this product in stock => OK
  // UPDATE quantity of product in stock (8)
  // else => SHOW MESSAGE
  try {
    const userId = await Auths.findById(req.body.userId);
    const quantity = await Products(req.body.quantity);
    const product = await Products.findById(req.body.productId);
    const requestProduct = { quantity: product.quantity - quantity};
    if (!userId){
      return res.json(
        errorFunction(true, 204, "This userId have not in the DB")
      )
    }
    if (!product){
      return res.json(
        errorFunction(true, 204, "This productId have not in the DB")
      )
    } else {
      // check quantity
      if (quantity <= product.quantity){
        //ADD ORDER
        const newOrder = await Orders.create(req.body)
        if (newOrder) {
          Products.findByIdAndUpdate(req.body.productId, requestProduct).then(
            (data) => {
              if(data){
                res.status(201);
                return res.json(
                  errorFunction(false, 201, "Order Created", newOrder)
                )
              } else {
                return res.json(errorFunction(true, 400, "Badddddd request"))
              }
            }
          )
        } else {
          //SHOW MESSAGE
          return res.json(errorFunction(true, 403, "Error Creating Order"));
        }
      } else {
        // SHOW MESSAGE
        return res.json(
          errorFunction(true, 206, "The quantity is more than in the stock")
        )
      }
    }
  } catch (error) {
    return res.json(errorFunction(true, 400, "Bad request"));
  }
}

//READ
// get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const {
      pageSize = 12,
      pageNumber = 1,
      customerName = "",
      customerPhone = "",
      productName = "",
      productBrand = "",
      orderStatus,
      orderByColumn,
      orderByDirection = "desc",
    } = req.query;

    const filter = {
      $and: [
        {
          customerName: {
            $regex: customerName,
            $options: "$i",
          },
        },
        {
          customerPhone: {
            $regex: customerPhone,
            $options: "$i",
          },
        },
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
        {
          orderStatus: {
            $regex:orderStatus
          }
        }
      ],
    };

    const filterOrders = await Products.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allOrders = await Orders.find(filter);

    let totalPage = 0;
    if (allOrders.length % pageSize === 0) {
      totalPage = allOrders.length / pageSize;
    } else {
      totalPage = parseInt(allOrders.length / pageSize) + 1;
    }

    if (allOrders.length > 0) {
      res.status(200).json({
        totalPage: totalPage,
        totalOrders: allOrders.length,
        orders:
          orderByDirection && orderByColumn
            ? filterOrders
            : filterOrders.reverse(),
      });
    } else {
      res.json(errorFunction(true, 200, "No result", []));
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//get by userId

const getOrderByUserId = async (req, res, next) => {
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
    const orders = await Orders.find(filter);
    return res.json({
      orders,
    });
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

// get by id

const getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findById(orderId);
    if (order) {
      res.status(200).json({
        order,
      });
    } else {
      res.status(204).json({
        message: "This product id have not in the database",
        order: {},
      });
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//UPDATE - PUT/PATH
const editOrder = (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const isBoddyEmpty = Object.keys(req.body).length;
    if (isBoddyEmpty === 0) {
      return res.send({
        statusCode: 403,
        message: "Body request can not empty",
      });
    }
    Orders.findOneAndUpdate(orderId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statusCode: 200,
          message: "Update order successfully",
        });
      } else {
        res.json({
          statusCode: 204,
          message: "This orderId have not in the database",
          order: {},
        });
      }
    });
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//DELETE

const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findByIdAndDelete(orderId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        message: "Deleted order successfully",
      });
    } else {
      res.json(
        errorFunction(true, 204, "This orderId has not in the database")
      );
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

module.exports = {
  addOrders,
  getAllOrders,
  getOrderByUserId,
  getOrderById,
  editOrder,
  deleteOrderById,
};
