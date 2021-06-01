const { Parent } = require("../models/ParentModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const findParentById = async (id) => {
    return await Parent.findById(id, "name children").lean();
};

const getParentByEmailAndPassword = async (email, password) => {
    return await Parent.findOne(
        { email: email, password: password },
        "name children"
    );
};

module.exports = { getParentByEmailAndPassword, findParentById };
