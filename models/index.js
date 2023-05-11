"use strict";
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
});


try {
  sequelize.authenticate();
  console.log("Database Connection Success");
} catch (e) {
  console.log("Database Connection Error: " + e.message);
}

module.exports = sequelize;

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "einaya123",
//     database: "einaya"
// })
