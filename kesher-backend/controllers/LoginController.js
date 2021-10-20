const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { authenticateToken, generateAccessToken } = require("../auth/auth");
const mailService = require("../mail/MailService");
const UsersService = require("../services/UsersService");

router.get("/hello", (req, res) => {
    console.log("hello!!");
    mailService.sendWelcomeMail("didi19289@gmail.com", "יובל", "password");
    res.send("hello");
});

// ANCHOR checks if the user is exist by his email and password and creact a uniqu token. else, send 401 status.
router.post("/login", async (req, res) => {
    let token;
    let user = await UsersService.getUserByEmailAndPassword(
        req.body.data.email,
        req.body.data.password
    );
    token = user
        ? generateAccessToken({ id: user._id, role: user.role })
        : null;

    token ? res.send(token) : res.sendStatus(401);
});

// ANCHOR getMe requset gets the user token to vertified it end returns data about the user.
router.get("/getMe", authenticateToken, async (req, res) => {
    const user = await UsersService.getUserById(req.user.id);
    user ? res.send(user) : res.sendStatus(401);
});

// // NOTE create new documents
// router.get("/createschool", async (req, res) => {
//     let school = new School({
//         name: "הגן של עדנה",
//         address: {
//             city: "נרניה",
//             street: "עוץ לי גוץ לי",
//             number: 4,
//         },
//         active: true,
//     });
//     school = await school.save();
//     console.log(school);
//     res.send("created school sec");
// });

// router.get("/createstaff", async (req, res) => {
//     let staff = new Staff({
//         name: {
//             first: "שולה",
//             last: "הגננת",
//         },
//         address: {
//             city: "פתח תקווה",
//             street: "כלנית",
//             number: 16,
//         },
//         role: "teacher",
//         birthDate: Date(),
//         phoneNumber: 053,
//         email: "a",
//         password: "1",
//         active: true,
//     });
//     staff.schools.push(new objectId("60ac12e39f1ac569ac380ea4")),
//         (staff = await staff.save());
//     console.log(staff);
//     res.send("created staff sec");
// });

// router.get("/createchild", async (req, res) => {
//     let child = new Child({
//         name: {
//             first: "מישהו",
//             last: "מישהו",
//         },
//         birthDate: Date(),
//         school: new objectId("60ac12e39f1ac569ac380ea4"),
//         active: true,
//         // TODO attendance and reports
//     });
//     child = await child.save();
//     console.log(child);
//     res.send("created child sec");
// });

// router.get("/createparent", async (req, res) => {
//     let parent = new Parent({
//         name: {
//             first: "הילה",
//             last: "האמא",
//         },
//         address: {
//             city: "פתח תקווה",
//             street: "כלנית",
//             number: 16,
//         },
//         school: new objectId("60ac12e39f1ac569ac380ea4"),
//         phoneNumber: 221,
//         email: "mail",
//         password: "pass",
//         active: true,
//     });
//     parent.children.push(new objectId("60ac134b2b8cc80e089da0df"));
//     parent = await parent.save();
//     console.log(parent);
//     res.send("created parent sec");
// });

module.exports = router;
