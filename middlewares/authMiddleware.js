const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const asyncErrorHandler = require('../utils/asyncErrorHandler.js')
const CustomError = require('../utils/CustomError.js')
const Admin = require('../models/Admin.js')
const Author = require("../models/Author.js")

const auth = asyncErrorHandler (async (req, res, next) =>{
    let testToken = req.headers.authorization
    // console.log(testToken)
    let token;
    if(testToken && testToken.startsWith("Bearer")){
        token = testToken.split(" ")[1]
    }
    // console.log(token);
    if(!token){
        const err = CustomError(401, "Try logging in, to access")
        next(err)
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decodedToken);
    let Models = [User, Admin, Author]
    let users = Models.map(async (Model) => {
        let users = await Model.findById(decodedToken.id)
        return users
    })
    users = await Promise.all(users)
    let authorizedUser = users.filter((doc) => doc !== null)
    if(!authorizedUser){
        const err = new CustomError(401, "user no longer exists")
        next(err)
    }
    req.user = authorizedUser[0]
    next()
})

// const verifyRole = (role) =>{
//     return (req,res,next)=>{
//         if(req.user.role !== role){
//             return res.status(400).json({
//                 status : 'fail',
//                 message : 'You are not authorized'
//             })
//         }
//         next()
//     }
// }

const verifyRole = (role) =>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            const err = CustomError(401, "You are not authorized")
            next(err)
        }
        next()
    }
}

module.exports = {auth, verifyRole}