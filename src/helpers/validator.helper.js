import Joi from "joi" ;

const validateEmail = Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': `Must be a valid email address `,
          })
    })
const validatePassword = Joi.object({
        password: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))
        .required()
        .messages({
            'string.pattern.base' : 'Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' ,
        })
    })
 
export { validateEmail , validatePassword }
