const express = require('express');
const router = express.Router();

const userController = require("../controllers/user.controller");

router.patch("/:id", userController.updateUserInfo);
router.get("/", userController.findAllUsers);
router.delete("/:id", userController.deleteUser);
router.get("/:email", userController.getUser);


module.exports = router;