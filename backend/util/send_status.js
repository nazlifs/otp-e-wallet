import nodemailer from "nodemailer";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export async function sendStatus(toMail, name, nominal) {
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

  console.log({ toMail, name, nominal });

  return transporter.sendMail({
    from: mailSender,
    to: toMail,
    subject: "Pembayaran Berhasil",
    text: `Berhasil Transfer ke ${name} sejumlah ${formatter.format(nominal)}`,
  });
}
