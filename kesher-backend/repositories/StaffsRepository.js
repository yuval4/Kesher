const { Staff } = require("../models/StaffModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const findStaffById = async (id) => {
    return await Staff.findById(id, "name schools");
};

const getStaffByEmailAndPassword = async (email, password) => {
    return await Staff.findOne(
        { email: email, password: password },
        "name schools"
    );
};

module.exports = { getStaffByEmailAndPassword, findStaffById };
