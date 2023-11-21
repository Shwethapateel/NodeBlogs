const {Schema, model} = require("mongoose")
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
    }
})
module.exports = model("blog", blogSchema)