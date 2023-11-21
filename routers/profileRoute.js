const router = require('express').Router()
const auth = require('../middlewares/authMiddleware.js')

router.get('/',auth,(req,res)=>{
    let user = req.user
    res.send(`Welcome ${user.name}`)
})

module.exports = router;