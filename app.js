const express = require('express')
const authRoutes = require('./routers/userRouters.js')
const profileRoutes = require('./routers/profileRoute.js')
const app = express()

app.use(express.json())
app.use('/app/v1/users',authRoutes)
app.use("/app/v1/profile", profileRoutes);

module.exports = app;