const nodemailer = require("nodemailer");

const sendEmail = (email, link) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });

    const mailOptions = {
        from: 'phuctt@comartek.com',
        to: email,
        subject: 'Reset Password Link ',
        html: '<p>You requested for reset password, kindly use this <a href="' + link + '">link</a> to reset your password</p>'
    };

    // transporter.sendMail(mailOptions, function(error, info) {
    //     if (error) {
    //         console.log(error);
    //         return false;
    //     }
    //     return true;
    // })
    return true;
};

module.exports = { sendEmail };