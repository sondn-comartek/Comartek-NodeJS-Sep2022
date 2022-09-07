const joi = require("joi");

const PasswordValidator = joi.object({
  password: joi
    .string()
    .min(6)
    .alphanum()
    .messages({
      "string.min": "Mật khẩu có độ dài tối thiểu 6 ký tự",
      "string.alphanum": "Mật khẩu chỉ tồn tại chữ cái hoặc số",
    }),
});

module.exports = PasswordValidator;
