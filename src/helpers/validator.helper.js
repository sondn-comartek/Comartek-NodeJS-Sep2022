import Joi from "joi" ;

const validateEmail = async (email) => {
    return Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': `Must be a valid email address `,
          })
    }).validateAsync({
        email : email ,
    })
} 
const validatePassword = async (password) => {
    return Joi.object({
        password: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))
        .required()
        .messages({
            'string.pattern.base' : 'Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' ,
        })
    }).validateAsync({
        password : password ,
    })
}
 
export { validateEmail , validatePassword }
