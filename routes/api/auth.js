const { Router } = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require("../../controllers/controllersUser");
const {
  uploadUserAvatarController,
} = require("../../controllers/userAvatarControllers");

const router = Router();

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/logout", auth, logoutController);
router.get("/current", auth, getCurrentUserController);
router.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  uploadUserAvatarController
);

module.exports = { authRouter: router };
