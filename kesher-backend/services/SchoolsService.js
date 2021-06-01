const SchoolsRepository = require("../repositories/SchoolsRepository");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getChildrenBySchoolId = async (id) => {
    return await SchoolsRepository.findChildrenBySchoolId(id);
};

module.exports = {
    getChildrenBySchoolId,
};
