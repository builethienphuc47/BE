const Orders = require("../models/orders");

//CRUD

//CREATE
const createOrders = (req, res, next) => {
  try {
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      customerAdress,
      productId,
      productName,
    } = req.body;
    if (
      !userId ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !customerAdress ||
      !productId ||
      !productName
    ) {
      res.status(400).json({
        message: "Some field are empty!!!",
      });
    }
    let orders = new Orders(req.body);
    orders.save().then((respone) => {
        res.json({
            message: "Added order successfully!!!"
        })
    })
  } catch (error) {
      console.log(error);
      res.status(400).json({
          statusCode: 400,
          message: "Bad request!!"
      })
  }
};

//READ
// getallorders

const getAllOrders = async (req, res, next) => {
  try {
   const allOrders = await Orders.find()
   if (allOrders.length > 0) {
    res.status(200).json({
      orders: allOrders.reverse(),
    })
   }
   else{
     res.status(200).json({
      message: 'No result',
      orders: []
     })
   }
  } catch (error) {
    res.status(400).json({
      message: 'Bad request'
    })
  }
};

// get by id

const getOrderById = async (req, res, next ) => {
  const orderId = req.params.orderId
  try {
    const order = await Orders.findById(orderId)
    if (order) {
      res.status(200).json({
        statusCode: 200,
        order
      })
    }
    else {
      res.status(204).json({
        statusCode: 204,
        message: 'This order have not in the database',
        order: {}
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Bad request"
    })
  }
}

//UPDATE



//DELELTE

// delete by id 

const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findByIdAndRemove(orderId);
    if (order){
      res.status(200).json({
        statusCode: 200,
        message: 'Removed order successfully',
        order  
      })
    }
    else {
      res.status(204).json({
        statusCode: 204,
        message: 'This order have not in database',
        order: {}
      })
    }
  } catch (error) {
    res.status.json({
      message: 'Bad request'
    })
  }
}


module.exports = {createOrders, getAllOrders, getOrderById, deleteOrderById}