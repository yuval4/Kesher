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

const getChildReportsById = async (id) => {
    return await Report.find({
        child: { $in: id },
    }).populate("comments.creator", "name role");
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

const addSubReportToReportByChildId = async (id, category, subReport) => {
    return await Report.updateOne(
        {
            child: { $in: id },
            date: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
        },
        { $push: { [category]: subReport } }
    );
};

const addCommentToReportByReportId = async (reportId, comment) => {
    return await Report.findOneAndUpdate(
        {
            _id: { $in: reportId },
        },
        { $push: { comments: comment } }
    );
};

const addImageToReportByReportId = async (reportId, image) => {
    await Report.findOneAndUpdate(
        {
            _id: { $in: reportId },
        },
        { $push: { comments: image } }
    );
};

module.exports = {
    getChildrenAttendanceByChildernIds,
    updateAttendanceByChildId,
    addSubReportToReportByChildId,
    getChildReportsById,
    addCommentToReportByReportId,
    addImageToReportByReportId,
};
