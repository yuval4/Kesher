const SchoolsRepository = require("../repositories/SchoolsRepository");
const mongoose = require("mongoose");
const { School } = require("../models/SchoolModel");
const objectId = mongoose.Types.ObjectId;

const getChildrenBySchoolId = async (id) => {
    return await SchoolsRepository.findChildrenBySchoolId(id);
};

const createNewSchool = async (data) => {
    let school = new School({
        name: data.name,
        address: {
            city: data.city,
            street: data.street,
            number: data.number,
        },
        active: true,
    });
    school = await school.save();
    return school._id;
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
    createNewSchool,
    addChildToSchool,
    getEventsBySchoolId,
    addNewEventToSchool,
};
