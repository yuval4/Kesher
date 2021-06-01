const ParentsRepository = require("../repositories/ParentsRepository");
const { Parent } = require("../models/ParentModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createNewParent = async (data) => {
    let parent = new Parent({
        name: {
            first: data.parentFirstName,
            last: data.parentLastName,
        },
        adress: {
            city: data.city,
            street: data.street,
            number: data.number,
        },
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: Math.random().toString(36).substring(5), // NOTE send it by email to the parent
        active: true,
    });
    parent.children.push(new objectId("60ac134b2b8cc80e089da0df")); //TODO chage id to child id (needs also to send it)
    parent.schools.push(new objectId("60ac134b2b8cc80e089da0df")); //TODO chage id to school id (needs also to send it)
    parent = await parent.save();
};

const getParentByEmailAndPassword = async (email, password) => {
    return await ParentsRepository.getParentByEmailAndPassword(email, password);
};

const getParentById = async (id) => {
    return await ParentsRepository.findParentById(id);
};

module.exports = {
    createNewParent,
    getParentByEmailAndPassword,
    getParentById,
};
