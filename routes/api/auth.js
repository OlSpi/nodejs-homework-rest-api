const { Router } = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  verifyUsersEmailController,
  resendVerificationEmailController,
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
router.get("/verify/:verificationToken", verifyUsersEmailController);
router.post("/verify", resendVerificationEmailController);
module.exports = { authRouter: router };
