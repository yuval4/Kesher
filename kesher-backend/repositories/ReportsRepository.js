const mongoose = require("mongoose");
const { Report } = require("../models/ReportModel");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const objectId = mongoose.Types.ObjectId;

const getChildrenAttendanceByChildernIds = async (ids) => {
    return await Report.find(
        {
            child: { $in: ids },
            date: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
        },
        "attendance child"
    );
};

// TODO get satff name by opulate. I want to bring all the data and not only the subReports.
const getChildReportsById = async (id) => {
    return await Report.find({
        child: { $in: id },
    }).populate("comments.creator", "name");
};

const updateAttendanceByChildId = async (id, attendance) => {
    return await Report.findOneAndUpdate(
        {
            child: id,
            date: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
        },
        { attendance: attendance }
    );
};

const addSubReportToReportByChildId = async (id, subReport) => {
    console.log(id, subReport);
    return await Report.updateOne(
        {
            child: { $in: id },
            date: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
        },
        { $push: { subReports: subReport } }
    );
};

// TODO change
const addCommentToReportByReportId = async (reportId, comment) => {
    return await Report.findOneAndUpdate(
        {
            _id: { $in: reportId },
        },
        { $push: { comments: comment } }
    );
};

module.exports = {
    getChildrenAttendanceByChildernIds,
    updateAttendanceByChildId,
    addSubReportToReportByChildId,
    getChildReportsById,
    addCommentToReportByReportId,
};
