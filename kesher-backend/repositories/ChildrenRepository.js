const { Child } = require("../models/ChildModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getNameAndPicById = async (id) => {
    return await Child.findById(new objectId(id), "name profilePic");
};

// NOTE what did we do on this function?
const setNewChild = async (data) => {
    // return await Child.findById(new objectId(id), "name profilePic");
    console.log(repo);
};

module.exports = { getNameAndPicById, setNewChild };
