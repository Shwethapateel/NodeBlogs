const router = require('express').Router()
const {auth, verifyRole} = require('../middlewares/authMiddleware.js')
const {postBlog, getByAuthor, getBlog, getBlogs, updateBlog, deleteBlog, postRating, getRatings} = require('../controllers/blogControllers.js')

// router.post('/',auth, verifyRole(["author","admin"]),postBlog)
// router.post("/", auth, postBlog)
// router.get('/', auth, getBlogs)
// router.get("/author", auth, getByAuthor)
// router.get("/:id", auth, getBlog)
// router.patch("/:id", auth, updateBlog)
// router.delete("/:id", auth, deleteBlog)

router.post("/", auth, verifyRole(["author"]), postBlog)
router.get("/", auth, getBlogs)
router.get("/:id", auth, getBlog)
router.patch(":/id", auth,verifyRole(["author"]), updateBlog)
router.post("/ratings/:id", auth,verifyRole(["user"]), postRating)
router.get("/ratings/:id", auth, verifyRole(["user", "admin", "author"]),getRatings )
router.delete("/:id",auth, verifyRole(["admin", "author"]), deleteBlog)

module.exports = router