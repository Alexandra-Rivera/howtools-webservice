const express = require('express');
const router = express.Router();

const { registerValidator, loginValidator } = require("../validators/auth.validators");
const validateFields = require("../validators/index.middleware");
const authController = require("../controllers/auth.controller");

router.post("/register",registerValidator, validateFields, authController.register);
router.post("/login", loginValidator, validateFields, authController.login);


module.exports = router;