const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSignupInput(data) {
    let errors = [];

    data.name = !isEmpty(data.name) ? data.name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmpass = !isEmpty(data.confirmpass) ? data.confirmpass : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.push("Name field is required");
    }
    //username check
    if (Validator.isEmpty(data.username)) {
        errors.push("Username field is required");
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.push("Email is invalid");
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.push("Password field is required");
    }
    if (Validator.isEmpty(data.confirmpass)) {
        errors.push("Confirm password field is required");
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.push("Password must be at least 6 characters");
    }
    if (!Validator.equals(data.password, data.confirmpass)) {
        errors.push("Passwords must match");
    }
    return {
        errors,
        isValid: errors.length === 0
    };
};