const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { assignToken } = require("../utils/assignToken");

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const HttpError = require("../utils/HttpError");

const registationService = async (body) => {
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new HttpError(409, "User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);
  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...body,
    password: hashedPassword,
    verificationToken,
  });

  const verificationLink = `http://localhost:3000/user/verify/${verificationToken}`;
  const emailText = `Click the following link to verify your email: ${verificationLink}`;
  const emailHtml = `  <p>To confirm your registration, please click on link below</p>
        <p>
          <a href="${verificationLink}">Click me</a>
        </p>`;

  await sendEmail(newUser.email, "Email Verification", emailText, emailHtml);

  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  };
};

const loginService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new HttpError(401, "Email or password is incorrect");
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  if (!user.verify) {
    throw new Error("Please verify your email");
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
