const sequelize = require("./models");
const dotenv = require("dotenv");
const app = require("./index");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;

sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log("Server is on ", PORT);
  });
});
