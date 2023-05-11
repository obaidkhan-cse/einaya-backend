const sequelize = require("./models");
const dotenv = require("dotenv");
const app = require("./index");

dotenv.config({ path: "./config.env" });

sequelize.sync().then((req) => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server is on");
  });
});
