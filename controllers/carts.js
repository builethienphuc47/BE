const Auths = require("../models/auths")
const Carts = require("../models/carts")
const Products = require("../models/products")
const errorFunction = require("../utils/errorFunction")

//CRUD
// Create

const createCarts = async (req, res, next) => {
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
            let newCart = new Carts(req.body);
            newCart.save().then((respone) => {
                res.json(errorFunction(false, 200, "Created cart successfully"))
            })
        }

    } catch (error) {
        res.json(errorFunction(true, 400, "Bad request"))
    }
}

// READ
// get all 
const getAllCarts = async (req, res, next) => {
    try {
        const {
            pageSize = 12,
            pageNumber = 1,
            productName = "",
            productBrand = "",
            cartByColumn,
            cartByDirection = "desc",
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

        const filterCarts = await Carts.find(filter)
            .sort(`${cartByDirection === "asc" ? "" : "-"}`)
            .limit((pageSize * 1))
            .skip((pageNumber - 1) * pageSize);


        const allCarts = await Carts.find(filter);

        let totalCarts = 0;
        if (allCarts.length % pageSize === 0) {
            totalPage = allCarts.length / pageSize;
        } else {
            totalPage = parseInt(allCarts.length / pageSize) + 1;
        }

        if (allCarts.length > 0) {
            res.status(200).json({
                totalPage: totalPage,
                totalCarts: allCarts.length,
                carts: cartByDirection && cartByColumn ? filterCarts : filterCarts.reverse(),
            })
        } else {
            res.json(errorFunction(true, 200, "No result", []))
        }
    } catch (error) {
        res.json(errorFunction(true, 400, "Bad request"))
    }
}
//get by userId

const getCartByUserId = async (req, res, next) => {
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
      const carts = await Carts.find(filter);
      return res.json({
        carts,
      });
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  
  // get by id
  
  const getCartById = async (req, res, next) => {
    const cartId = req.params.cartId;
    try {
      const cart = await Carts.findById(cartId);
      if (cart) {
        res.status(200).json({
          cart,
        });
      } else {
        res.status(204).json({
          message: "This cart id have not in the database",
          cart: {},
        });
      }
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  
  //UPDATE - PUT/PATH
  const editCart = (req, res, next) => {
    try {
      const cartId = req.params.cartId;
      const isBoddyEmpty = Object.keys(req.body).length;
      if (isBoddyEmpty === 0) {
        return res.send({
          statusCode: 403,
          message: "Body request can not empty",
        });
      }
      Carts.findOneAndUpdate(cartId, req.body).then((data) => {
        if (data) {
          res.status(200).json({
            statusCode: 200,
            message: "Update cart successfully",
          });
        } else {
          res.json({
            statusCode: 204,
            message: "This cartId have not in the database",
            cart: {},
          });
        }
      });
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  
  //DELETE
  
  const deleteCartById = async (req, res, next) => {
    const cartId = req.params.cartId;
    try {
      const cart = await Carts.findByIdAndDelete(cartId);
      if (cart) {
        res.status(200).json({
          statusCode: 200,
          message: "Deleted cart successfully",
        });
      } else {
        res.json(
          errorFunction(true, 204, "This cartId has not in the database")
        );
      }
    } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"));
    }
  };
  

module.exports = { createCarts, getAllCarts, getCartById, getCartByUserId, editCart, deleteCartById }