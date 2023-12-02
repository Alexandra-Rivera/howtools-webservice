const { body, param } = require("express-validator");
const validators = [];


const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
validators.registerValidator = [
    body("name")
        .notEmpty().withMessage("Name is required"),

    body("lastName")
        .notEmpty().withMessage("Last name is required"),
    
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email format incorrect"),
    
    body("password")
        .notEmpty().withMessage("Password is required")
        .matches(passwordRegexp).withMessage("Password format incorrect"),

    body("image") 
        .notEmpty().withMessage("Image is required")
        .isURL().withMessage("Profile Picture should be a valid URL")
];

validators.idInParams = [
    param("id")
       .notEmpty().withMessage("id field is required")
       .isMongoId().withMessage("id must be mongo id")
]

validators.loginValidator = [
    body("email") 
       .notEmpty().withMessage("Email should not be empty")
       .matches(emailRegexp).withMessage("Bad email format"),
    body("password")
        .notEmpty().withMessage("Password should not be empty")
]

module.exports = validators;