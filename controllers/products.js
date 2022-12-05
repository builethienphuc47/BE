const Products = require("../models/products");
const ProductValidation = require("../helpers/validation");

// CRUD
//CREATE - POST
const createProduct = async (req, res, next) => {
  try {
    const validReq = await ProductValidation.addProductSchema.validateAsync(
      req.body
    );
    let product = new Products(validReq);
    product.save().then((respone) => {
      res.json({
        message: "Added product successfully!",
      });
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request",
      errorsMessage: error.details[0].message,
    });
  }
};

//READ - GET/POST
// get all products

const getAllProducts = async (req, res, next) => {
  try {
    const {
      pageSize = 12,
      pageNumber = 1,
      productName = "",
      productBrand = "",
      orderByColumn,
      orderByDirection = "desc",
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
      ],
    };

    const filterProducts = await Products.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allProducts = await Products.find(filter);

    let totalPage = 0;
    if (allProducts.length % pageSize === 0) {
      totalPage = allProducts.length / pageSize;
    } else {
      totalPage = parseInt(allProducts.length / pageSize) + 1;
    }

    if (allProducts.length > 0) {
      res.status(200).json({
        totalPage: totalPage,
        totalProducts: allProducts.length,
        products:
          orderByDirection && orderByColumn
            ? filterProducts
            : filterProducts.reverse(),
      });
    } else {
      res.json(errorFunction(true, 200, "No result", []))
    }
  } catch (error) {
    console.log(error);
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//get by id

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findById(productId);
    if (product) {
      res.status(200).json({
        statusCode: 200,
        product,
      });
    } else {
      res.json({
        statusCode: 204,
        message: "This product id have not in the database",
        product: {},
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

//UPDATE - PUT/PATH

const editProduct = (req, res, next) => {
  // console.log('BODY:' , req.body)
  try {
    const productId = req.params.productId;
    const isBodyEmpty = Object.keys(req.body).length;
    if (isBodyEmpty === 0) {
      return res.send({
        statusCode: 403,
        message: "Body request can not empty",
      });
    }
    Products.findByIdAndUpdate(productId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statusCode: 200,
          message: "Update product successfully",
        });
      } else {
        res.json({
          statusCode: 204,
          message: "This product id have not in the database",
          product: {},
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

//DELETE - DELETE

// delete product by id

const deleteProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findByIdAndRemove(productId);
    if (product) {
      res.status(200).json({
        statusCode: 200,
        message: "Deleted product sucessfully!",
      });
    } else {
      res.status(204).json({
        statusCode: 204,
        message: "This product id have not in the database",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProductById,
};
