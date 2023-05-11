const doctorModel = require("../models/Doctor");
const userModel = require("../models/User");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.findAll();
    users.password = undefined;
    res.status(200).send({
      success: true,
      message: "All Registered Users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Users list",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.findAll();
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Doctors list",
      error,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    //const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const doctor = await doctorModel.findOne({
      where: { id: doctorId },
    });

    await doctor.update({ status: status });

    const user = await userModel.findOne({ where: { id: doctor.userId } });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has Been ${status} `,
      onClickPath: "/notification",
    });
    const newStatus = doctor.status;
    (await newStatus) === "approved"
      ? user.update({ isDoctor: true })
      : user.update({ isDoctor: false });
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};
