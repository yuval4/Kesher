const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
});

const mailOptions = (email, name, password) => {
    return {
        from: process.env.MAIL,
        to: email,
        subject: "ברוך הבא לאפליקציית קשר!",
        html: `<html><head><style>h1 {color:#804ED9;}</style></head><body> <h1>שלום ${name}, וברוכים הבאים לאפליקציית Kesher!<h1> <h3>הסיסמה שלך היא: ${password}</h3></body></html>`,
    };
};

const sendWelcomeMail = (email, name, password) => {
    transporter.sendMail(mailOptions(email, name, password), (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = { sendWelcomeMail };
