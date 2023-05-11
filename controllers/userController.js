const userModel = require("../models/User");
const doctorModel = require("../models/Doctor");
const appointmentModel = require("../models/Appointment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const moment = require("moment");
require("dotenv").config();

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }
    const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET_KEY}`, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "Login Success", success: true, token: token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(200).json({
        message: "User already registered",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.body.id } });
    user.password = undefined;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await new doctorModel({
      ...req.body,
      status: "pending",
      id: uuid.v4(),
    });
    await newDoctor.save();
    const adminUser = await userModel.findOne({
      where: { isAdmin: true },
    });

    let notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor.id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    // adminUser.notification = JSON.stringify(notification);
    const user = await userModel.findOne({ where: { id: req.body.userId } });
    await user.update({ notification: notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for Doctor",
    });
  }
};

const getNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.body.userId } });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    //  await user.update({ seenNotification: user.seenNotification });
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.findAll({
      where: { status: "approved" }, // TODO: Add Specialization
    });
    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Doctor's",
    });
  }
};

const bookAppointmentController = async (req, res) => {
  console.log("Appointment ----------------", req.body);
  try {
    // req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    // req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({
      //where: { id: req.body.doctorInfo.userId },
      where: { id: req.body.userId },
    });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book Successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
};
