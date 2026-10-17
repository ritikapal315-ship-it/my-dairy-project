
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  const result = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });

  return result;
};
const verifyMailer = async () => {
  await transporter.verify();
  console.log("SMTP connection is ready");
};

module.exports = { sendMail, verifyMailer };
