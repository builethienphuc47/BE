const Auths = require("../models/auths");
const Comments = require("../models/comments");
const Products = require("../models/products");
const errorFunction = require("../utils/errorFunction");

const createComment = async (req, res, next) => {
  try {
    const user = await Auths.findById(req.body);
    const product = await Products.findById(req.body);

    if (!user) {
      res.json(errorFunction(true, 204, "The userId is not valid"));
    }

    if (!product) {
      res.json(errorFunction(true, 204, "The productId is not valid"));
    } else {
      let comment = new Comments(res.body);
      comment.save()
        .then(
          res.json(errorFunction(false, 204, "Created comment successfully"))
        );
    }
  } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"))
  }
};

const getAllComments = async (req, res, next) => {
  try {
      const {
          pageSize = 12,
          pageNumber = 1,
          productName = "",
          customerName = "",
          commentByColumn,
          commentByDirection = "desc",
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
                  customerName: {
                      $regex: customerName,
                      $options: "$i",
                  },
              },
          ]
      }

      const filterComments = await comments.find(filter)
          .sort(`${commentByDirection === "asc" ? "" : "-"}`)
          .limit((pageSize * 1))
          .skip((pageNumber - 1) * pageSize);


      const allComments = await Comments.find(filter);

      let totalComments = 0;
      if (allComments.length % pageSize === 0) {
          totalPage = allComments.length / pageSize;
      } else {
          totalPage = parseInt(allComments.length / pageSize) + 1;
      }

      if (allComments.length > 0) {
          res.status(200).json({
              totalPage: totalPage,
              totalComments: allComments.length,
              comments: commentByDirection && commentByColumn ? filterComments : filterComments.reverse(),
          })
      } else {
          res.json(errorFunction(true, 200, "No result", []))
      }
  } catch (error) {
      res.json(errorFunction(true, 400, "Bad request"))
  }
}
//get by userId

const getCommentByUserId = async (req, res, next) => {
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
    const comments = await Comments.find(filter);
    return res.json({
      comments,
    });
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

// get by id

const getCommentById = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comments.findById(commentId);
    if (comment) {
      res.status(200).json({
        comment,
      });
    } else {
      res.status(204).json({
        message: "This comment id have not in the database",
        comment: {},
      });
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//UPDATE - PUT/PATH
const editComment = (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const isBoddyEmpty = Object.keys(req.body).length;
    if (isBoddyEmpty === 0) {
      return res.send({
        statusCode: 403,
        message: "Body request can not empty",
      });
    }
    comments.findOneAndUpdate(commentId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statusCode: 200,
          message: "Update comment successfully",
        });
      } else {
        res.json({
          statusCode: 204,
          message: "This commentId have not in the database",
          comment: {},
        });
      }
    });
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};

//DELETE

const deleteCommentById = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comments.findByIdAndDelete(commentId);
    if (comment) {
      res.status(200).json({
        statusCode: 200,
        message: "Deleted comment successfully",
      });
    } else {
      res.json(
        errorFunction(true, 204, "This commentId has not in the database")
      );
    }
  } catch (error) {
    res.json(errorFunction(true, 400, "Bad request"));
  }
};



module.exports = {createComment, getAllComments, getCommentById, getCommentByUserId, editComment, deleteCommentById}