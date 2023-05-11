const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-all-users", authMiddleware, getAllUsersController);

router.get("/get-all-doctors", authMiddleware, getAllDoctorsController);

router.post(
  "/change-account-status",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
