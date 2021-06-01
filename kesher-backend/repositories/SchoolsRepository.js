const mongoose = require("mongoose");
const { School } = require("../models/SchoolModel");

const findChildrenBySchoolId = async (id) => {
    return await School.findById(id, "children")
        .populate("children", "name profilePic")
        .lean();
};

module.exports = { findChildrenBySchoolId };
