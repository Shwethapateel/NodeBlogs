const express = require("express")
const authRoutes = require("./routers/userRouters.js")
const BlogRouter = require("./routers/BlogRoutes.js");
const globalErrorHandler = require("./controllers/globalErrorHandler.js");
const app = express();

app.use(express.json());
app.use("/app/v1/users", authRoutes)
app.use("/app/v1/blogs", BlogRouter)

app.all("*", (req, res, next) => {
  //   res.status(404).json({ status: "fail", message: "Page not found" })
    let err = new Error("Page Not Found")
    err.statusCode = 404
    err.status = "fail"
    next(err)
})

/////Global error handler
app.use(globalErrorHandler)

module.exports = app;
