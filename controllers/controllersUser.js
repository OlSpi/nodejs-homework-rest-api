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

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
};
