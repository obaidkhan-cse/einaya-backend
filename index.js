const express = require("express");
const morgan = require("morgan");
const sequelize = require("./models");
const dotenv = require("dotenv");
const usersRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const cors = require("cors");

const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(morgan("dev")); //

const corsOptions = {
  origin: "http://localhost:3000", // http://localhost:3000
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Homepage");
});

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;

sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log("Server is on ", PORT);
  });
});


module.exports = app;
