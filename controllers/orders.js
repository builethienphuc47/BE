const req = require("express/lib/request");
const Orders = require("../models/orders");
const errorFunction = require("../utils/errorFunction");

//CRUD

//CREATE
const addOrders = (req, res, next) => {
  try {
    // const {
    //   userId,
    //   customerName,
    //   customerPhone,
    //   customerAddress,
    //   productId,
    //   productName,
    //   productBrand,
    //   price,
    //   quantity,
    //   type,
    //   images,
    // } = req.body;
    // if (
    //   !userId ||
    //   !customerName ||
    //   !customerPhone ||
    //   !customerAddress ||
    //   !productId ||
    //   !productName ||
    //   !productBrand ||
    //   !price ||
    //   !quantity ||
    //   !type ||
    //   !images
    // ) {
    //   return res.json(errorFunction(true, 403, "Error Add Order"));
    // }
    let order = new Orders(req.body);
    order.save().then((respone) => {
      res.json({
        order,
        message: "Add order successfully !!!",
      });
    });
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//READ
// get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Orders.find();
    if (allOrders.length > 0) {
      res.status(200).json({
        totalOrders: allOrders.length,
        orders: allOrders.reverse(),
      });
    } else {
      // res.status(200).json({
      //   message: "No result !!!",
      //   orders: [],
      // });
      res.json(errorFunction(true, 200, 'No result', []))
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//get by userId

const getOrderByUserId = async (req, res, next) => {
  try {
    // const userId = req.params.userId;
    // console.log(userId)
    // const filter = {
    //   $and : [
    //     {
    //       userId: {
    //         $regex: userId,
    //         $option: "$i"
    //       }
    //     }
    //   ]
    // };

    // const orders = await Orders.find()
    // console.log("Orders:" ,orders)
    // const order = await Orders.findById(req.params.userId)
    // return  res.status(200).json({
    //   total: order.length,
    //   order: order.reverse()
    // })
    // Orders.findById(userId).then((response) => {
    //   res.json({
    //     response,
    //   });
    // });
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
    const orders = await Orders.find(filter)
    return res.json({
      orders
    })

    // if (order.length > 0){
    //   res.status(200).json({
    //     total: order.length,
    //     order: order.reverse()
    //   })
    // } else {
    //   res.json(errorFunction(true, 204, 'No result'))
    // }
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
const editOrder = (req, res, next) =>{
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
        })
      } else {
        res.json({
          statusCode: 204,
          message: "This orderId have not in the database",
          order: {},
        })
      }
    })
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"))
  }
}

//DELETE

const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findByIdAndDelete(orderId)
    if(order){
      res.status(200).json({
        statusCode: 200,
        message: "Deleted order successfully"
      })
    } else {
      res.json(errorFunction(true, 204, "This orderId has not in the database"))
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"))
  }
}

module.exports = { addOrders, getAllOrders, getOrderByUserId ,getOrderById, editOrder, deleteOrderById };
