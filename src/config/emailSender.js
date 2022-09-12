const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "justmegiang@gmail.com",
    pass: "egpbcdthnouvjhwy"
  }
})

/**
 * async
 * @param {*} mailOptions 
 * @returns true if sucess and false if not 
 */
module.exports = async (mailOptions) => {
  return new Promise((res) => {
    transporter.sendMail({from: "justmegiang@gmail.com",
    ...mailOptions}, (err, sucess) => {
      if(err) {
        throw err
      } else {
        console.log(`Sending reset password email to ${mailOptions.to} sucess`)
        res(true)
      }
    })
  })
  
}