const joi = require("joi");

const EmailValidator = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: ["com"] } })
    .messages({ "string.email": "Email không hợp lệ" }),
});

module.exports = EmailValidator;
