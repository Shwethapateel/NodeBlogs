const { loginWrapper, signupWrapper } = require("../utils/auth.js")
const Author = require("../models/Author.js")

const authorLogin = loginWrapper(Author)
const authorSignup = signupWrapper(Author)

module.exports = { authorLogin, authorSignup }
