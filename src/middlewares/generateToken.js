const jwt = require("jsonwebtoken");

const generateToken = (email, id) => {
  return (token = jwt.sign(
    {
      email: email,
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
    }
  ));
};

module.exports = generateToken;
