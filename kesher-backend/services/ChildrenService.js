const ChildrenRepository = require("../repositories/ChildrenRepository");
const { Child } = require("../models/ChildModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getChildNameAndPic = async (id) => {
    return await ChildrenRepository.getNameAndPicById(id);
};

const getChildrenNameAndPic = async (ids) => {
    let childrenList = [];
    for (i = 0; i < ids.lenlength; i++) {
        let child = await ChildrenRepository.getNameAndPicById(id);
        childrenList.push(child);
    }
    return childrenList;
};

const createNewChild = async (data) => {
    let child = new Child({
        name: {
            first: data.childFirstName,
            last: data.childLastName,
        },
        birthDate: new Date(data.year, data.month, data.day - 1),
        school: new objectId(data.school),
        active: true,
    });
    child = await child.save();
    return child._id;
};

module.exports = { getChildNameAndPic, createNewChild, getChildrenNameAndPic };
