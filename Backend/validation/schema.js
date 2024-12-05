const Joi = require("joi");

exports.createUserSchema = Joi.object({
    Name: Joi.string().required().min(2),
    Email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    confirm_password: Joi.string().required().valid(Joi.ref("password")),
});

exports.registrationSchema = Joi.object({
    Name: Joi.string().required().min(2).max(15),
    Email: Joi.string().email().required(),
    Mobile: Joi.string().required().pattern(/^\+?[6-9][0-9]{9}$/).message({
        'string.pattern.base': 'Mobile number must be a valid 10-digit number',
        'any.required': 'Mobile number is required'
    }),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            "any.only": "Passwords do not match",
            "any.required": "Confirm password is required",
        })
});

exports.loginSchema = Joi.object({
    Email: Joi.string().email().required(),
    password: Joi.string().required()
})
