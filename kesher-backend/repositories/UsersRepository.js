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

module.exports = {
    findUserById,
    getUserByEmailAndPassword,
};
