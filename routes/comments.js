const express = require('express');
const route = express.Router();
const app = express();
const { allowCrossDomain } = require('../utils/corsMiddleware');


//CORS middleware

const commentController = require('../controllers/comments');
const { commentsValidation } = require('../helpers/commentsValidation');
app.use(allowCrossDomain)

route.post("/api/comments/addComment",commentsValidation ,commentController.createComment)
route.get("/api/comments/getAllComments", commentController.getAllComments)
route.get("/api/comments/getCommentByUserId/:userId", commentController.getCommentByUserId)
route.get("/api/comments/getCommentById/:commentId", commentController.getCommentById)
route.patch("/api/comments/editCommentById/:commentId", commentController.editComment)
route.delete("/api/comments/deleteCommentById/:commentId", commentController.deleteCommentById)

module.exports = route