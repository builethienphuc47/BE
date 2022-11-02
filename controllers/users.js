const Users = require("../models/users")
const UserValidation = require("../helpers/validation")

//CRUD
// CREATE

const addUser = async (req, res, next) => {
    try {
        const validReq = await UserValidation.addUserSchema.validateAsync(req.body)
        let users = new Users(validReq)
        users.save().then((response) => {
            res.json({
                message: "Added user successfully"
            });
        });
        
    } catch (error) {
        console.log("ERROR: ", error)

        return res.status(400).json({
            statusCode: 400,
            message: "Bad request",
            errorMessage: error.details[0].message,
        });
    };
};

// READ

// get all user
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await Users.find();
        if (allUsers.length > 0) {
            res.status(200).json({
                users: allUsers.reverse(),
            });
        }
        else{
            res.status(200).json({
                message: 'No result',
                users: [],
            })
        }
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: "Bad Request"
        })
    }
}

// get user by id
const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const user = await Users.findById(userId);
      if (user) {
        res.status(200).json({
          statusCode: 200,
          user,
        });
      } else {
        res.json({
          statusCode: 204,
          message: "This user id have not in the database",
          user: {},
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

const editUser = (req, res, next) => {
    // console.log('BODY:' , req.body)
    try {
      const userId = req.params.userId;
      const isBodyEmpty = Object.keys(req.body).length;
      if (isBodyEmpty === 0) {
        return res.send({
          statusCode: 403,
          message: "Body request can not empty",
        });
      }
      Products.findByIdAndUpdate(userId, req.body).then((data) => {
        if (data) {
          res.status(200).json({
            statusCode: 200,
            message: "Update user successfully",
          });
        } else {
          res.json({
            statusCode: 204,
            message: "This user id have not in the database",
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

const deleteUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const user = await Users.findByIdAndRemove(userId);
      if (user) {
        res.status(200).json({
          statusCode: 200,
          message: "Deleted user sucessfully!",
        });
      } else {
        res.status(204).json({
          statusCode: 204,
          message: "This user id have not in the database",
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
module.exports = { addUser, getAllUsers, getUserById, editUser, deleteUserById }