const Products = require("../models/products");

// CRUD
//CREATE - POST
const createProduct = (req, res, next) => {
  try {
    const {
      productName,
      productBrand,
      type,
      price,
      discount,
      quantity,
      image,
    } = req.body;
    if (
      !productName ||
      !productBrand ||
      !type ||
      !price ||
      !discount ||
      !quantity ||
      !image 
    ) {
      res.status(400).json({
        message: "Some fields are not empty",
      });
    }
    let product = new Products(req.body);
    product.save().then((respone) => {
        res.json({
            message: 'Added product successfully!',
        })
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    })
  }
};

//READ - GET/POST
// get all products

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Products.find();
    if (allProducts.length > 0){
      res.status(200).json({
        products: allProducts.reverse(),
      })
    } else {
      res.status(200).json({
        message: 'No results',
        product: [],
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request"
    })
  }
}

//get by id

const getProductById = async (req, res, next) => {
  const productId = req.params.productId
  try {
    const product = await Products.findById(productId);
    if (product){
      res.status(200).json({
        statusCode: 200,
        product,
      })
    } else {
      res.json({
        statusCode: 204,
        message: 'This product id have not in the database',
        product: {},
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request"
    })
  }
}

//UPDATE - PUT/PATH

const editProduct = (req, res, next) => {
  console.log('BODY:' , req.body)
  try {
    const productId = req.params.productId;
    if (!req.body){
      return res.send({
        statusCode: 404,
        message: 'Body request can not empty',
      })
    }
    Products.findByIdAndUpdate(productId, req.body).then((data) => {   
      if (data) {
        res.status(200).json({
          statusCode: 200,
          message: 'Update product successfully',
        })
      } else {
        res.json({
          statusCode: 204,
          message: 'This product id have not in the database',
          product: {},
        })
      }
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request"
    })
  }
}

//DELETE - DELETE

// delete product by id

const deleteProductById = async (req, res, next) => {
  const productId = req.params.productId
  try {
    const product = await Products.findByIdAndRemove(productId);
    if (product){
      res.status(200).json({
        statusCode: 200,
        message: "Deleted product sucessfully!"
      })
    } else {
      res.status(204).json({
        statusCode: 204,
        message: 'This product id have not in the database',
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request"
    })
  }
}
module.exports = {createProduct, getAllProducts, getProductById,  editProduct,deleteProductById} ;
 