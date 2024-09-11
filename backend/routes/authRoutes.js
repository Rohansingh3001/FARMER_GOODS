const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController.js")

router.route("/register").post(authControllers.signup);
router.use("/login", authControllers.login);
module.exports = router;