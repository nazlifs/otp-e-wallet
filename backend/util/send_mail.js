import nodemailer from "nodemailer";

export async function sendMail(toMail, otpCode) {
  const mailSender = process.env.EMAIL;
  const mailPass = process.env.EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: mailSender,
      pass: mailPass,
    },
  });

  return transporter.sendMail({
    from: mailSender,
    to: toMail,
    subject: "no.reply,otp code",
    text: otpCode,
  });
}
