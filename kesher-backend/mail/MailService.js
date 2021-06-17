const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
});

const mailOptions = {
    from: process.env.MAIL,
    to: "xxturrent@gmail.com, didi19289@gmail.com",
    subject: "Sending Email using Node.js",
    html: `<html><head><style>h1 {color:#804ED9;}</style></head><body> <h1>your password is:<h1> </body></html>`,
};

const sendMail = () => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = { sendMail };
