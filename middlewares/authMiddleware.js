const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const auth =async (req, res, next) =>{
    try {
        let testToken = req.headers.authorization
        // console.log(testToken);
        let token;
        if(testToken && testToken.startsWith("Bearer")){
            token = testToken.split(" ")[1]
        }
        // console.log(token);
        if(!token){
            return res.status(401).json({
              status: "Fail",
              message: "Try logging in, to access",
            });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken);
        const user = await User.findById(decodedToken.id)
        if(!user){
               return res.status(401).json({
               status: "Fail",
               message: "User no longer exists",
            }); 
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            status : 'Fail',
            message : error.message
        })
    }
}

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
            return res.status(400).json({
                status : 'fail',
                message : 'You are not authorized'
            })
        }
        next()
    }
}

module.exports = {auth, verifyRole};