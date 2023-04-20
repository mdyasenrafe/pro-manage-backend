const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    unique: [true, "Username already exist"],
    //     send error message if username already exist
  },
  photoUrl: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  method: {
    type: String,
    default: "email",
  },
  source: {
    type: String,
    default: "app",
  },
  //   status: {
  //     type: String,
  //     default: "verify",
  //   },
  code: {
    type: String,
  },
});

const LoginModel = mongoose.model("login", LoginSchema);
module.exports = LoginModel;
