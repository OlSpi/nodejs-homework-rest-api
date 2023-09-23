require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(to, subject, text, html) {
  const msg = {
    to: to,
    from: "alena.spivakova1@gmail.com",
    subject: subject,
    text: text,
    html: html,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendEmail;
