const gravatar = require("gravatar");

const {
  registationService,
  loginService,
  getCurrentUserService,
} = require("../services/servicesUser");
const { User } = require("../models/user");
const {
  registrationValidationSchema,
} = require("../utils/validation/authValidationSchemas");

const controllerWrapper = require("../utils/controllerWrapper");
const sendEmail = require("../utils/sendEmail");

const registrationController = controllerWrapper(async (req, res, next) => {
  const { error } = registrationValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const avatarURL = gravatar.url(req.body.email, {
    s: "250",
    d: "identicon",
  });

  const newUser = await registationService({ ...req.body, avatarURL });

  res.status(201).json(newUser);
});

const loginController = controllerWrapper(async (req, res, next) => {
  const accessToken = await loginService(req.body);
  res.json(accessToken);
});

const logoutController = controllerWrapper(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { token: null }).exec();

  res.status(204).end();
});

const getCurrentUserController = controllerWrapper(async (req, res, next) => {
  const currentUser = await getCurrentUserService(req.user.id);

  if (!currentUser) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json(currentUser);
});

const verifyUsersEmailController = controllerWrapper(async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({
    verificationToken: verificationToken,
  }).exec();

  if (user === null) {
    return res.status(401).send({ message: "Invalid token" });
  }
  User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  }).exec();

  res.send({ message: "User verified" });
});

const resendVerificationEmailController = controllerWrapper(
  async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verificationLink = `http://localhost:3000/user/verify/${user.verificationToken}`;
    const emailText = `Click the following link to verify your email: ${verificationLink}`;
    const emailHtml = `<p>To confirm your registration, please click on link below</p>
        <p><a href="${verificationLink}">Click me</a></p>`;

    await sendEmail(user.email, "Email Verification", emailText, emailHtml);

    res.status(200).json({ message: "Verification email sent" });
  }
);

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  verifyUsersEmailController,
  resendVerificationEmailController,
};
