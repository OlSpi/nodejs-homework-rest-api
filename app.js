const path = require("node:path");

const globalErrorHandler = require("./middlewares/errors/globalErrorHandler");
const notFoundHandler = require("./middlewares/errors/notFoundHandler");

const express = require("express");

const logger = require("morgan");

const cors = require("cors");

const router = require("./routes/api/");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));
app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());

app.use(router);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
