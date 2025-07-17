const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: ":SMTP",
  service: "gmail",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, message) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "test",
    body: "OTP",
    html: `<h1>${message} </h1>`,
  });
};
module.exports = sendEmail;
