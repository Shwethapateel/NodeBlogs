const {Schema, model} = require("mongoose")
const User = require('./User')
const blogSchema = new Schema({
    title : {
        type : String,
        trim : true,
        required : [true, "Title is required"]
    },
    snippet : {
        type : String,
        trim : true,
        required : [true, 'Snippet is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    author : {
        type : Schema.Types.ObjectId, 
        ref : 'user',
        required : [true, 'Author is required']
    },
    image : {
        type : [String],
        default : "https://static.thenounproject.com/png/4595376-200.png"
    },
    ratings : {
        type : Number,
        default : 1,
        min : [1, 'above 1'],
        max : [5 , 'below 5']
    }
})
module.exports = model("blog", blogSchema)