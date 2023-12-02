const validators = {};
const { body, param } = require('express-validator');

validators.createPostValidator = [
    param("id") 
        .optional()
        .isMongoId().withMessage("id must be mongo id"),
    body("title")
       .notEmpty().withMessage("Title cannot be empty!")
       .isLength({min: 2}).withMessage("Title should be at least 2 characters long"),
    body("description") 
        .notEmpty().withMessage("Description cannot be empty!")
        .isLength({min: 2}).withMessage("Description should be at least 2 characters long"),
]

validators.updatePostValidator = [
    body('title')
      .optional()
      .isString().withMessage("title should be a string")
      .trim()
      .isLength({ min: 2 }).withMessage("title should have at least 2 characters"),
  
    body('description')
      .optional()
      .isString().withMessage("review should be a string")
      .trim()
      .isLength({min: 2}).withMessage("Description should be at least 2 characters long")
  ];



module.exports = validators;