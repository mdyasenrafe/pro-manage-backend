const bcrypt = require("bcrypt");
const generateToken = require("../middlewares/generateToken");
const LoginModel = require("../models/LoginModel");
const imgUploaderFunction = require("../config/imgUploaderFunction");
require("dotenv").config();

let val = Math.floor(1000 + Math.random() * 9000);

exports.signUpUser = async (req, res) => {
  const { email, password, name, username, role } = req.body;
  let hashedPassword;

  let code;
  if (email && password && name && username) {
    let newPassword = req?.body?.password?.toString();
    hashedPassword = await bcrypt?.hash(newPassword, 10);
    code = await bcrypt?.hash(val?.toString(), 10);
    req.body["password"] = hashedPassword;
    req.body["code"] = code;
    if (role !== "admin") {
      try {
        const login = new LoginModel(req.body);
        await login.save();
        res.status(200).json({
          error: false,
          message: "User created successfully",
          data: login,
        });
      } catch (error) {
        res.status(200).json({
          error: true,
          message: error?.message,
        });
      }
    } else {
      res.status(200).json({ error: true, message: "Invalid Role" });
    }
  } else {
    res.status(200).json({
      error: true,
      message: "Fill all the fields",
    });
  }
};
// get user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    LoginModel.findOne({ email: req?.body?.email }, async (err, item) => {
      if (item?.email && item?.password) {
        const ValidPassword = await bcrypt.compare(
          req.body.password,
          item?.password
        );
        if (ValidPassword) {
          const token = generateToken(item?.email, item?._id);
          if (item?.status == "verified") {
            res.status(200).json({
              error: false,
              data: item,
              message: "Login successfully",
              token: token,
            });
          } else {
            // need to code for send code
          }
        } else {
          res
            .status(200)
            .json({ error: true, message: "Invalid Email and Password" });
        }
      } else {
        res
          .status(200)
          .json({ error: true, message: "No user found with this email" });
      }
    });
  } else {
    res
      .status(200)
      .json({ error: true, message: "Please enter email and password" });
  }
};
exports.resetPassword = async (req, res) => {
  res.status(200).json({ error: true, message: "Invalid Email and Password" });
};
exports.uploadImage = async (req, res) => {
  if (req?.body?.uri) {
    imgUploaderFunction(req.body.uri, res);
  } else {
    res.status(200).json({ error: true, message: "Please enter url" });
  }
};
exports.getUserInfo = async (req, res) => {
  // email form token
  const email = req?.email;
  const id = req?.id;
  if (email) {
    LoginModel.findOne(
      { email: email },
      "-code -password",
      async (err, item) => {
        if (item) {
          res.status(200).json({
            error: false,
            data: item,
            message: "get user info successfully",
          });
        } else {
          res
            .status(200)
            .json({ error: true, message: "No user found with this email" });
        }
      }
    );
  }
};
