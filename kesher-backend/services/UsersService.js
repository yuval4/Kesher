const UsersRepository = require("../repositories/UsersRepository");
const { User } = require("../models/UserModel");
const mailService = require("../mail/MailService");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createNewUser = async (data) => {
    const password = Math.random().toString(36).substring(7);
    mailService.sendWelcomeMail(data.email, data.parentFirstName, password);

    let user = new User({
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
        role: data.role,
        active: true,
        profilePic: data.profilePic,
        birthDate: data.birthDate,
    });

    if (data.role === "Parent") {
        user.children.push(new objectId(data.childId));
    } else if (data.role === "Teacher") {
        user.schools.push(new objectId(data.schoolId));
    }

    parent = await parent.save();
};

const getUserByEmailAndPassword = async (email, password) => {
    return await UsersRepository.getUserByEmailAndPassword(email, password);
};

const getUserById = async (id) => {
    return await UsersRepository.findUserById(id);
};

module.exports = {
    createNewUser,
    getUserByEmailAndPassword,
    getUserById,
};
