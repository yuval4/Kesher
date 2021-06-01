const ReportsRepository = require("../repositories/ReportsRepository");
const mongoose = require("mongoose");
const { Report } = require("../models/ReportModel");
const objectId = mongoose.Types.ObjectId;

const createDailyReport = (ids) => {
    ids.forEach(async (id) => {
        let report = new Report({
            date: new Date(),
            child: new objectId(id),
            attendance: false,
        });
        report = await report.save();
    });
};

const getChildReports = async (id) => {
    const pit = await ReportsRepository.getChildReportsById(id);
    console.log("service" + id);
    return pit; //
};

const updateChildAttendance = async (id, attendance) => {
    await ReportsRepository.updateAttendanceByChildId(id, attendance);
};

const getChildrenAttendance = async (ids) => {
    let attendances =
        await ReportsRepository.getChildrenAttendanceByChildernIds(ids);
    if (attendances.length === 0) {
        createDailyReport(ids);
        attendances =
            await ReportsRepository.getChildrenAttendanceByChildernIds(ids);
    }
    return attendances;
};

const addSubReportToReport = async (id, subReports, creatorId) => {
    console.log(subReports);
    subReports.forEach(async (item) => {
        const subCategory = {
            date: new Date(),
            creator: new objectId(creatorId),
            category: item.category,
            name: item.title,
            details: item.report_value,
        };
        await ReportsRepository.addSubReportToReportByChildId(id, subCategory);
    });
};

module.exports = {
    getChildrenAttendance,
    createDailyReport,
    updateChildAttendance,
    addSubReportToReport,
    getChildReports,
};
