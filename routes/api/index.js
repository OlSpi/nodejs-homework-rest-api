const { Router } = require("express");
const auth = require("../../middlewares/auth");
const { contactsRouter } = require("./contacts");
const { authRouter } = require("./auth");

const router = Router();

router.use("/api/contacts/", auth, contactsRouter);
router.use("/user", authRouter);

module.exports = router;
