const express = require('express');
const router = express.Router();

const { createPostValidator, updatePostValidator } = require("../validators/post.validators.js");
const validateFields = require("../validators/index.middleware.js");

// const { authentication } = require("../middlewares/auth.middlewares.js");

const postController = require("../controllers/Post.controller");

router.get("/", postController.FindAll);
router.post(["/", "/:id"], createPostValidator, validateFields, postController.save);
router.delete("/:id", postController.deletePost);
router.patch("/:id", updatePostValidator, validateFields, postController.updatePost);

module.exports = router;