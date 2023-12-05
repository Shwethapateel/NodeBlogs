const Rating = require("../models/Rating.js")
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

const getByAuthor =asyncErrorHandler (async (req,res)=>{
    let user = req.user;
    const authorBlogs = await blogs.find({author : user._id})
    res.status(201).json({
        status : 'success',
        data : {
            authorBlogs
        }
    })
})

const getBlogs =asyncErrorHandler (async (req,res) =>{
    // console.log(req.query)
    let search = req.query.search || ""
    // console.log(search)
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
})

const getBlog = asyncErrorHandler (async (req,res) =>{
    let newBlog = await blogs.findById(req.params.id)
    res.status(200).json({
        status : "success",
        data : {
            newBlog
        }
    })
})

const updateBlog =asyncErrorHandler (async (req,res) =>{
    const {id} = req.params
    const {description, snippet, title, image} = req.body
    if(req.user.role === 'author'){
        const updatedBlog = await blogs.findByIdAndUpdate({_id:id},{$set:{title:title,snippet:snippet,description:description, image:image}},{new:true, runValidators:true})
        res.status(200).json({
            status : "success",
            data : {
                updatedBlog
            }
        })
    }
    
})

const deleteBlog =asyncErrorHandler (async (req,res) =>{
    await blogs.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status : 'success',
        data : null
    })
    
})

let postRating = asyncErrorHandler(async (req,res) =>{
    let userId = req.user._id
    let blogId = req.params.id
    let rating = await Rating.create({ratings: req.body.ratings, userId:userId, blogId:blogId})
    res.status(200).json({
        status : "success",
        blogId,
        data : {
            rating
        }
    })
})

let getRatings = asyncErrorHandler(async (req,res) =>{
    let blogId = req.params.id
    let rating =await Rating.find({blogId:blogId})
    res.status(200).json({
        status : "success",
        blogId,
        data : {
            rating
        }
    })
})

module.exports = {
  postBlog, getBlogs, getBlog, updateBlog, deleteBlog, getByAuthor, postRating, getRatings
}


