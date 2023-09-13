require("dotenv").config();

require("./db/connectDb");

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen({ port: PORT }, () => {
  console.log(`Server running. Use our API on port ${PORT}`);
});
