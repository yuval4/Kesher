const ReportsRepository = require("../repositories/ReportsRepository");
const mongoose = require("mongoose");
const { Report } = require("../models/ReportModel");
const objectId = mongoose.Types.ObjectId;

const createDailyReport = async (ids) => {
    await ids.forEach(async (id) => {
        let report = new Report({
            date: new Date(),
            child: new objectId(id),
            attendance: false,
        });
        report = await report.save();
    });
};

const getChildReports = async (id) => {
    return await ReportsRepository.getChildReportsById(id);
};

const updateChildAttendance = async (id, attendance) => {
    await ReportsRepository.updateAttendanceByChildId(id, attendance);
};

const getAndCreateChildrenAttendance = async (ids) => {
    let attendances =
        await ReportsRepository.getChildrenAttendanceByChildernIds(ids);
    if (attendances.length === 0) {
        await createDailyReport(ids);
        attendances =
            await ReportsRepository.getChildrenAttendanceByChildernIds(ids);
    }
    return attendances;
};

const addSubReportToReport = async (id, subReports, creatorId) => {
    subReports.forEach(async (item) => {
        const subCategory = {
            date: new Date(),
            creator: new objectId(creatorId),
            category: item.title,
            details: item.details,
        };
        console.log(item.catrgory);

        await ReportsRepository.addSubReportToReportByChildId(
            id,
            item.category,
            subCategory
        );
    });
};

const addCommentToReport = async (creatorId, role, reportId, message) => {
    const comment = {
        date: new Date(),
        creator: new objectId(creatorId),
        message: message,
        user: role,
    };
    await ReportsRepository.addCommentToReportByReportId(reportId, comment);
};

const addImageToReport = async (data, creatorId, role) => {
    const image = {
        date: new Date(),
        creator: new objectId(creatorId),
        user: role.charAt(0).toUpperCase() + role.slice(1),
        image: data.profilePic,
    };
    await ReportsRepository.addImageToReportByReportId(
        data.currentComment,
        image
    );
};

module.exports = {
    getAndCreateChildrenAttendance,
    createDailyReport,
    updateChildAttendance,
    addSubReportToReport,
    getChildReports,
    addCommentToReport,
    addImageToReport,
};
