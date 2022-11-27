const mongoose =  require('mongoose');
const Schema = mongoose.Schema

const commentsSchema = new Schema (
    {
        userId: {
            type: String,
            require: true
        },
        productId: {
            type: String,
            require: true
        },
        customerName: {
            type: String,
            require: true
        },
        comment: {
            type: String,
            require: true
        },
        rate: {
            type: String,
            require: true
        }
    },

    { timestamps: true}
)

const Comments = mongoose.model("commnent", commentsSchema)
module.exports = Comments 