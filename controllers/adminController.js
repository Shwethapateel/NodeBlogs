const { loginWrapper, signupWrapper } = require("../utils/auth.js");
const Admin = require("../models/Admin.js")

const adminLogin = loginWrapper(Admin)
const adminSignup = signupWrapper(Admin)

module.exports = { adminLogin, adminSignup }