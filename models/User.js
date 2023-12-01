const {Schema, model} = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field cannot be empty"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email field cannot be empty"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please enter proper email"]
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "author"],
        message : `{VALUE} => this role is not defined`
      },
      default : "admin"
    },
    password: {
      type: String,
      required: [true, "Password field cannot be empty"],
      minlength: [8, "Password should contain above 8 charaters"]
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password field cannot be empty"],
      /////Custom validation
      validate: {
        validator: function () {
          return this.password === this.confirmPassword; /////This will return boolean
        },
        message: "Password doesnot match, Please type proper password"
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (pwd, pwdDB) {
  return await bcrypt.compare(pwd, pwdDB)
};

module.exports = model('user', userSchema)