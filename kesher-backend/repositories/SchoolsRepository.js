const mongoose = require("mongoose");
const { School } = require("../models/SchoolModel");
const objectId = mongoose.Types.ObjectId;

const findChildrenBySchoolId = async (id) => {
    return await School.findById(id, "children")
        .populate("children", "name profilePic")
        .lean();
};

const addIdChildToSchool = async (schoolId, childId) => {
    console.log(schoolId, childId);
    return await School.findOneAndUpdate(
        {
            _id: new objectId(schoolId),
        },
        { $push: { children: new objectId(childId) } }
    );
};

module.exports = { findChildrenBySchoolId, addIdChildToSchool };
