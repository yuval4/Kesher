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
    const pit = await Report.aggregate([
        { $match: { child: objectId(id) } },
        { $unwind: "$subReports" },
        // { $objectToArray: { subReports } },
        { $project: { subReports: 1 } },
    ]);
    console.log(typeof [...pit]);
    return pit;
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

module.exports = {
    getChildrenAttendanceByChildernIds,
    updateAttendanceByChildId,
    addSubReportToReportByChildId,
    getChildReportsById,
};
