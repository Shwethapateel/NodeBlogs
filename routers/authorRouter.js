const express = require("express");
const { authorLogin, authorSignup } = require("../controllers/authController");

let router = express.Router();
router.post("/signup", authorSignup);
router.post("/login", authorLogin);
module.exports = router;
