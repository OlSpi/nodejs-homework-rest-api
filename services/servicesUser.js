const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { assignToken } = require("../utils/assignToken");

const registationService = async (body) => {
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);
  const newUser = await User.create({ ...body, password: hashedPassword });
  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  };
};

const loginService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new Error("Email or password is incorrect");
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Email or password is incorrect");
  }
  const { accessToken } = assignToken(user);
  await User.findByIdAndUpdate(user._id, { token: accessToken }).exec();

  return {
    token: accessToken,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const getCurrentUserService = async (userId) => {
  return await User.findById(userId).select("email subscription");
};

module.exports = {
  registationService,
  loginService,
  getCurrentUserService,
};
