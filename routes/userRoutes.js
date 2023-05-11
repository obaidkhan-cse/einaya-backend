const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/user-data", authMiddleware, authController);
router.post("/apply-doctor", authMiddleware, applyDoctorController);
router.post("/get-notifications", authMiddleware, getNotificationController);
router.get("/get-all-doctors", authMiddleware, getAllDoctorsController);
router.post("/book-appointment", authMiddleware, bookAppointmentController);

module.exports = router;
