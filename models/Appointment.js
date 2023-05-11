const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "appointments",
  }
);

module.exports = Appointment;
