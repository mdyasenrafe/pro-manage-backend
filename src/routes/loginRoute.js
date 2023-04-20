const express = require("express");
const { signUpUser } = require("../controllers/LoginController");

const router = express.Router();

router.post("/signup", signUpUser);
// router.post("/verify", verifyUser);
// router.post("/signin", loginUser);
// router.post("/resetPassword", resetPassword);
// router.post("/uploadImage", uploadImage);
// router.get("/getUserInfo", checkLogin, getUserInfo);

module.exports = router;
