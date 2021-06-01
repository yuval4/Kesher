const StaffsRepository = require("../repositories/StaffsRepository");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getStaffByEmailAndPassword = async (email, password) => {
    return await StaffsRepository.getStaffByEmailAndPassword(email, password);
};

const getStaffById = async (id) => {
    return await StaffsRepository.findStaffById(id);
};

module.exports = {
    getStaffById,
    getStaffByEmailAndPassword,
};
