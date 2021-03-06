const ParentsRepository = require("../repositories/ParentsRepository");
const { Parent } = require("../models/ParentModel");
const mailService = require("../mail/MailService");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createNewParent = async (data, childId) => {
    const password = Math.random().toString(36).substring(7);
    mailService.sendWelcomeMail(data.email, data.parentFirstName, password);

    let parent = new Parent({
        name: {
            first: data.parentFirstName,
            last: data.parentLastName,
        },
        address: {
            city: data.city,
            street: data.street,
            number: data.number,
        },
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: password,
        active: true,
    });
    parent.children.push(new objectId(childId));
    parent.schools.push(new objectId(data.school));
    parent = await parent.save();
};

const getParentByEmailAndPassword = async (email, password) => {
    return await ParentsRepository.getParentByEmailAndPassword(email, password);
};

const getParentById = async (id) => {
    return await ParentsRepository.findParentById(id);
};

const getChildrenByParentId = async (id) => {
    return await ParentsRepository.findChildrenByParentId(id);
};

module.exports = {
    createNewParent,
    getParentByEmailAndPassword,
    getParentById,
    getChildrenByParentId,
};
