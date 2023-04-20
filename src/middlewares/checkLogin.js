const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = decoded;
    req.email = email;
    req.id = id;
    next();
  } catch (err) {
    res.status(401).json({ error: true, message: "Invalid Token" });
  }
};

module.exports = checkLogin;
