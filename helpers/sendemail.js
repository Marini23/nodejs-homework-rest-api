import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "marina.smile1m@gmail.com", // Change to your recipient
  from: "marina.udovychenko@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

const sendEmail = (msg) => {
  return sgMail.send(msg);
};
export default sendEmail;
