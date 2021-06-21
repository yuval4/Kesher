const SchoolsRepository = require("../repositories/SchoolsRepository");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getChildrenBySchoolId = async (id) => {
    return await SchoolsRepository.findChildrenBySchoolId(id);
};

const addChildToSchool = async (schoolId, childId) => {
    return await SchoolsRepository.addIdChildToSchool(schoolId, childId);
};

const getEventsBySchoolId = async (id) => {
    return await SchoolsRepository.findEventsBySchoolId(id);
};

const addNewEventToSchool = async (schoolId, event, creatorId) => {
    event.creatorId = new objectId(creatorId);
    return await SchoolsRepository.addNewEventToSchoolById(schoolId, event);
};

module.exports = {
    getChildrenBySchoolId,
    addChildToSchool,
    getEventsBySchoolId,
    addNewEventToSchool,
};
