const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { authenticateToken, generateAccessToken } = require("../auth/auth");
const mailService = require("../mail/mailService");
const { Child } = require("../models/ChildModel");
const { Parent } = require("../models/ParentModel");
const { School } = require("../models/SchoolModel");
const { Staff } = require("../models/StaffModel");
const objectId = mongoose.Types.ObjectId;
const ParentsService = require("../services/ParentsService");
const StaffsService = require("../services/StaffsService");

// ANCHOR checks if the user is exist by his email and password and creact a uniqu token. else, send 401 status.
router.post("/login", async (req, res) => {
    let token;
    if (req.body.data.role === "parent") {
        let user = await ParentsService.getParentByEmailAndPassword(
            req.body.data.email,
            req.body.data.password
        );
        token = user
            ? generateAccessToken({ id: user._id, role: "parent" })
            : null;
    } else if (req.body.data.role === "staff") {
        let user = await StaffsService.getStaffByEmailAndPassword(
            req.body.data.email,
            req.body.data.password
        );
        token = user
            ? generateAccessToken({ id: user._id, role: "staff" })
            : null;
    }
    token ? res.send(token) : res.sendStatus(401);
});

// ANCHOR getMe requset gets the user token to vertified it end returns data about the user.
router.get("/getMe", authenticateToken, async (req, res) => {
    console.log(req.user.id);
    if (req.user.role === "parent") {
        const user = await ParentsService.getParentById(req.user.id);
        user.role = "parent";
        res.send(user);
    } else if (req.user.role === "staff") {
        const user = await StaffsService.getStaffById(req.user.id);
        user.role = "staff";
        res.send(user);
    } else {
        res.sendStatus(401);
    }
});

// NOTE create new documents
router.get("/createschool", async (req, res) => {
    let school = new School({
        name: "הגן של עדנה",
        address: {
            city: "נרניה",
            street: "עוץ לי גוץ לי",
            number: 4,
        },
        active: true,
    });
    school = await school.save();
    console.log(school);
    res.send("created school sec");
});

router.get("/createstaff", async (req, res) => {
    let staff = new Staff({
        name: {
            first: "שולה",
            last: "הגננת",
        },
        address: {
            city: "פתח תקווה",
            street: "כלנית",
            number: 16,
        },
        role: "teacher",
        birthDate: Date(),
        phoneNumber: 053,
        email: "a",
        password: "1",
        active: true,
    });
    staff.schools.push(new objectId("60ac12e39f1ac569ac380ea4")),
        (staff = await staff.save());
    console.log(staff);
    res.send("created staff sec");
});

router.get("/createchild", async (req, res) => {
    let child = new Child({
        name: {
            first: "מישהו",
            last: "מישהו",
        },
        birthDate: Date(),
        school: new objectId("60ac12e39f1ac569ac380ea4"),
        active: true,
        // TODO attendance and reports
    });
    child = await child.save();
    console.log(child);
    res.send("created child sec");
});

router.get("/createparent", async (req, res) => {
    let parent = new Parent({
        name: {
            first: "הילה",
            last: "האמא",
        },
        address: {
            city: "פתח תקווה",
            street: "כלנית",
            number: 16,
        },
        school: new objectId("60ac12e39f1ac569ac380ea4"),
        phoneNumber: 221,
        email: "mail",
        password: "pass",
        active: true,
    });
    parent.children.push(new objectId("60ac134b2b8cc80e089da0df"));
    parent = await parent.save();
    console.log(parent);
    res.send("created parent sec");
});

router.get("/email", async (req, res) => {
    mailService.sendMail();
    res.sendStatus(200);
});

module.exports = router;
