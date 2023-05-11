const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorBySpecializationController,
  getDoctorByIdController,
  // doctorAppointmentsController,
  // updateStatusController,
} = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/get-doctor-info", authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/update-profile", authMiddleware, updateProfileController);

// To get All doctor of the same specialization
router.post(
  "/get-doctor-by-specialization",
  authMiddleware,
  getDoctorBySpecializationController
);

// To get a single doctor
router.post("/get-doctor-by-id", authMiddleware, getDoctorByIdController);
//
// //GET Appointments
// router.get(
//   "/doctor-appointments",
//   authMiddleware,
//   doctorAppointmentsController
// );
//
// //POST Update Status
// router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
