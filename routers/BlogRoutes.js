const router = require('express').Router()
const auth = require('../middlewares/authMiddleware.js')
const postBlog = require('../controllers/blogControllers.js')

router.post("/", auth, postBlog);
// router.get('/', auth, getBlogs)
// router.get("/:id", auth, getBlog);
// router.patch("/:id", auth, updateBlog);
// router.delete("/:id", auth, deleteBlog);

module.exports = router;