const express = require("express");
const router = express.Router();
const ReportsService = require("../services/ReportsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const reports = await ReportsService.getChildReports(req.params.id);
    console.log("controller", reports);
    res.send(reports);
});

router.post("/attendances", async (req, res) => {
    const childrenAttendance = await ReportsService.getChildrenAttendance(
        req.body.ids
    );
    res.send(childrenAttendance);
});

router.patch("/child/:id", async (req, res) => {
    console.log(req.body);
    await ReportsService.updateChildAttendance(
        req.params.id,
        req.body.attendance
    );
    res.sendStatus(200);
});

router.patch("/subreport/:id", async (req, res) => {
    console.log(req.body);
    await ReportsService.addSubReportToReport(
        req.params.id,
        req.body.subReports,
        req.user._id
    );
    res.sendStatus(200);
});

module.exports = router;
