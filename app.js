const express = require('express')
const authRoutes = require('./routers/userRouters.js')
const BlogRouter = require('./routers/BlogRoutes.js')
const app = express()

app.use(express.json())
app.use('/app/v1/users',authRoutes)
app.use("/app/v1/blogs", BlogRouter);

module.exports = app;