const {
  registationService,
  loginService,
  getCurrentUserService,
} = require("../services/servicesUser");
const { User } = require("../models/user");
const {
  registrationValidationSchema,
} = require("../utils/validation/authValidationSchemas");

const registrationController = async (req, res, next) => {
  try {
    const { error } = registrationValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = await registationService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const accessToken = await loginService(req.body);
    res.json(accessToken);
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUserController = async (req, res) => {
  try {
    const currentUser = await getCurrentUserService(req.user.id);

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
};
