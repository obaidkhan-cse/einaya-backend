// const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/Doctor");
const userModel = require("../models/User");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
      where: { userId: req.body.userId },
    });
    res.status(200).send({
      success: true,
      message: "Doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
      where: { userId: req.body.userId },
    });
    await doctor.update(req.body);
    //await doctor.save();
    // const doctor = await doctorModel.findOneAndUpdate(
    //   { userId: req.body.userId },
    //   req.body
    // );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

const getDoctorBySpecializationController = async (req, res) => {
  try {
    const doctor = await doctorModel.findAll({
      where: { specialization: req.body.specialization },
    });
    res.status(200).send({
      success: true,
      message: "Doctor Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error fetching",
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
      where: { id: req.body.doctorId },
    });
    res.status(200).send({
      success: true,
      message: "Doctor Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error fetching doctor",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorBySpecializationController,
  getDoctorByIdController,
  // doctorAppointmentsController,
  // updateStatusController,
};
