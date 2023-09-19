const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ messange: "No token provided" });
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    async (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).send({ message: "Not authorized" });
        }
        return next(err);
      }
      try {
        const user = await User.findById(decode.id).exec();

        console.log("Token from request:", token);

        if (user.token !== token) {
          return res.status(401).send({ message: "You are not authorize" });
        }

        req.user = { id: decode.id };

        console.log("Decoded user id:", decode.id);
        console.log("User from database:", user);
        next();
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = auth;
