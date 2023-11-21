const blogs = require("../models/blogs");

const postBlog = async (req,res)=>{
    try {
        let user = req.user;
        const newBlog = await blogs.create({
            title : req.body.title,
            snippet : req.body.snippet,
            description : req.body.description,
            image : req.body.image,
            author : user._id
        })
        res.status(201).json({
            status : 'success',
            data : {
                newBlog
            }
        })
    } catch (error) {
       res.status(400).json({
         status: "fail",
         message : error.message
       }); 
    }
}
module.exports = postBlog;