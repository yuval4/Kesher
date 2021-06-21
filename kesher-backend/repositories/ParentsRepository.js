const { Parent } = require("../models/ParentModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const findParentById = async (id) => {
    return await Parent.findById(id, "name children")
        .populate("children", "name school profilePic")
        .lean();
};

const getParentByEmailAndPassword = async (email, password) => {
    return await Parent.findOne(
        { email: email, password: password },
        "name children"
    );
};

const findChildrenByParentId = async (id) => {
    return await Parent.findById(id, "children")
        .populate("children", "name profilePic")
        .lean();
};

module.exports = {
    getParentByEmailAndPassword,
    findParentById,
    findChildrenByParentId,
};
