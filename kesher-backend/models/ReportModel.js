const mongoose = require("mongoose");
const { Schema } = mongoose;

const subReportSchema = new Schema({
    date: Date,
    creator: { type: Schema.Types.ObjectId, ref: "Staff" },
    category: String,
    name: String,
    details: String,
});

const commentSchema = new Schema({
    date: Date,
    creator: { type: Schema.Types.ObjectId, ref: "Parent" },
    // reportId: { type: Schema.Types.ObjectId, ref: "Report" },
    message: String,
});

const reportSchema = new Schema({
    date: { type: Date, required: true },
    child: { type: Schema.Types.ObjectId, ref: "Children", required: true },
    attendance: { type: Boolean, required: true, defualt: false },
    subReports: [{ type: subReportSchema }],
    comments: [{ type: commentSchema }],
});

const Report = new mongoose.model("Report", reportSchema);
module.exports = { Report };
