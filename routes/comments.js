const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const commentController = require('../controllers/comments');
const { commentsValidation } = require('../helpers/commentsValidation');
app.use(allowCrossDomain)

route.post("/api/comments/addcomment",commentsValidation ,commentController.createComment)
route.get("/api/comments/getAllcomments", commentController.getAllComments)
route.get("/api/comments/getcommentByUserId/:userId", commentController.getCommentByUserId)
route.get("/api/comments/getcommentById/:commentId", commentController.getCommentById)
route.patch("/api/comments/editcommentById/:commentId", commentController.editComment)
route.delete("/api/comments/deletecommentById/:commentId", commentController.deleteCommentById)
module.exports = route