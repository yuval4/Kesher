const express = require("express");
const router = express.Router();
const SchoolsService = require("../services/SchoolsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const children = await SchoolsService.getChildrenBySchoolId(req.params.id);
    res.send(children);
});

router.post("/", async (req, res) => {
    const schoolId = await SchoolsService.createNewSchool(req.body);
    res.send(schoolId);
});

router.patch("/children", async (req, res) => {
    await SchoolsService.addChildToSchool(req.body.schoolId, req.body.childId);
    return res.sendStatus(200);
});

router.get("/events/:id", async (req, res) => {
    const events = await SchoolsService.getEventsBySchoolId(req.params.id);
    res.send(events);
});

router.patch("/events/:schoolId", async (req, res) => {
    await SchoolsService.addNewEventToSchool(
        req.params.schoolId,
        req.body.event,
        req.user.id
    );
    return res.sendStatus(200);
});

module.exports = router;
