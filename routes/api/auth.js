const { Router } = require("express");
const auth = require("../../middlewares/auth");
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require("../../controllers/controllersUser");

const router = Router();

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/logout", auth, logoutController);
router.get("/current", auth, getCurrentUserController);

module.exports = { authRouter: router };
