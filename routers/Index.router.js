const express = require("express");
const router = express.Router();

const postRouter = require("./Post.router");
const authRouter = require("./Auth.router");
const userRouter = require("./User.router");

router.use("/post", postRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;