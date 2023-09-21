const { User } = require("../models/user");
const path = require("path");
const Jimp = require("jimp");
const controllerWrapper = require("../utils/controllerWrapper");

const uploadUserAvatarController = controllerWrapper(async (req, res, next) => {
  const tempPath = req.file.path;
  const uniqueFileName = path.basename(req.file.filename);
  const publicPath = path.join(
    __dirname,
    "..",
    "public",
    "avatars",
    uniqueFileName
  );

  const image = await Jimp.read(tempPath);
  image.resize(250, 250).write(publicPath);

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { avatarURL: uniqueFileName },
    { new: true }
  ).exec();

  if (!updatedUser) {
    return res.status(401).send({ message: "Not authorized" });
  }

  res.status(200).json({ avatarURL: uniqueFileName });
});

module.exports = { uploadUserAvatarController };
