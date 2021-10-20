const { User } = require("../models/UserModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const findUserById = async (id) => {
    return await User.findById(id, "name children schools role")
        .populate("children", "name school profilePic")
        .populate("schools", "name")
        .lean();
};

const getUserByEmailAndPassword = async (email, password) => {
    return await User.findOne(
        { email: email, password: password },
        "name children schools role"
    );
};

const addSchoolToUserById = async (userId, schoolId) => {
    console.log(userId, schoolId);
    return await User.findOneAndUpdate(
        {
            _id: new objectId(userId),
        },
        { $push: { schools: new objectId(schoolId) } }
    );
};

module.exports = {
    findUserById,
    getUserByEmailAndPassword,
    addSchoolToUserById,
};
