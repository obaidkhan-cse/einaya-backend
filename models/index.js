"use strict";
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");


const sequelize = new Sequelize("btzthr7ib4mva1pevqlp", "ur7yux96kb1lh8im", "ASxWSwlzfkxcMfx9TjII", {
  host: "btzthr7ib4mva1pevqlp-mysql.services.clever-cloud.com",
  dialect: "mysql",
});


// const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_HOST, process.env.MYSQL_ADDON_PASSWORD, {
//   host: process.envMYSQL_ADDON_HOST,
//   dialect: "mysql",
// });


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
