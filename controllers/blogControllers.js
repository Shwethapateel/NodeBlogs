const blogs = require("../models/blogs")
const asyncErrorHandler = require('../utils/asyncErrorHandler.js')

const postBlog =  asyncErrorHandler(async (req,res)=>{
    let user = req.user
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
})

const getByAuthor = async (req,res)=>{
    try {
        let user = req.user;
        const authorBlogs = await blogs.find({author : user._id})
        res.status(201).json({
            status : 'success',
            data : {
                authorBlogs
            }
        })
    } catch (error) {
       res.status(400).json({
         status: "fail",
         message : error.message
       })
    }
}

const getBlogs = async (req,res) =>{
    try {
        // console.log(req.query);
        let search = req.query.search || ""
        // console.log(search);
        let page = req.query.page *1|| 1
        let limit = req.query.limit*1 || 2
        let sort = req.query.sort || "rating"
        let skip = (page -1)*limit
        sort && sort.split(",").join(" ")
        // let author = req.query.author || ""
        // let newBlogs = await blogs.find({title:{$regex:search,$options:"i"}}).where("author").in([author]).skip(skip).limit(limit)
        let newBlogs = await blogs.find({title:{$regex:search,$options:"i"}}).skip(skip).limit(limit).sort(sort)
        let totalBlogs = await blogs.countDocuments()
        res.status(200).json({
            status : 'success',
            page,
            limit,
            totalBlogs,
            data : {
                newBlogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status : 'fail',
            message : error.message
        })
    }
}

const getBlog = async (req,res) =>{
    try {
        let newBlog = await blogs.findById(req.params.id)
        res.status(200).json({
            status : "success",
            data : {
                newBlog
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const updateBlog = async (req,res) =>{
    try {
        const {id} = req.params
        const {description, snippet, title, image, ratings} = req.body
        if(req.user.role === 'author'){
            const updatedBlog = await blogs.findByIdAndUpdate({_id:id},{$set:{title:title,snippet:snippet,description:description, image:image}},{new:true, runValidators:true})
            res.status(200).json({
                status : "success",
                data : {
                    updatedBlog
                }
            })
        }
        if(req.user.role === 'user'){
            const updatedBlog = await blogs.findByIdAndUpdate({_id:id},{$set:{ratings:ratings}},{new:true, runValidators:true})
            res.status(200).json({
                status : "success",
                data : {
                    updatedBlog
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const deleteBlog = async (req,res) =>{
    try {
        let user = req.user
        await blogs.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status : 'success',
            data : null
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

module.exports = {
  postBlog, getBlogs, getBlog, updateBlog, deleteBlog, getByAuthor
}