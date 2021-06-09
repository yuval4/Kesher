const SchoolsRepository = require("../repositories/SchoolsRepository");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getChildrenBySchoolId = async (id) => {
    return await SchoolsRepository.findChildrenBySchoolId(id);
};

const addChildToSchool = async (schoolId, childId) => {
    return await SchoolsRepository.addIdChildToSchool(schoolId, childId);
};

module.exports = {
    getChildrenBySchoolId,
    addChildToSchool,
};
