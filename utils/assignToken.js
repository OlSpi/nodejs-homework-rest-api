const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_SECRET_KEY,

  ACCESS_TOKEN_EXPIRES_IN,
} = process.env;

const assignToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  return {
    accessToken,
  };
};

module.exports = { assignToken };
