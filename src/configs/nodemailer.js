const nodemailer = require("nodemailer");
const CONSTANTS = require("../constants");
const { NodemailerTransportOptions } = CONSTANTS;

const transporter = nodemailer.createTransport(NodemailerTransportOptions);

module.exports = transporter;
