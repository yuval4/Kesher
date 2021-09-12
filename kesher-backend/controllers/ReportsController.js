const express = require("express");
const router = express.Router();
const ReportsService = require("../services/ReportsService");
const { authenticateToken } = require("../auth/auth");
const { upload } = require("../utils/utils");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const reports = await ReportsService.getChildReports(req.params.id);
    res.send(reports);
});

router.post("/attendances", async (req, res) => {
    const childrenAttendance = await ReportsService.getChildrenAttendance(
        req.body.ids
    );
    res.send(childrenAttendance);
});

router.post("/newreport", async (req, res) => {
    await ReportsService.createDailyReport([req.params.id]);
    res.sendStatus(200);
});

router.patch("/child/:id", async (req, res) => {
    await ReportsService.updateChildAttendance(
        req.params.id,
        req.body.attendance
    );
    res.sendStatus(200);
});

router.patch("/subreport/:id", async (req, res) => {
    await ReportsService.addSubReportToReport(
        req.params.id,
        req.body.subReports,
        req.user._id
    );
    res.sendStatus(200);
});

router.patch("/comment/:reportId", async (req, res) => {
    await ReportsService.addCommentToReport(
        req.user.id,
        req.user.role,
        req.params.reportId,
        req.body.comment
    );
    res.sendStatus(200);
});

router.post("/image", upload.single("photo"), async (req, res) => {
    req.body.profilePic = req.file.path;
    // const childId = await ChildrenService.createNewChild(req.body);
    res.sendStatus(200);
});

module.exports = router;
