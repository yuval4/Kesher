const mongoose = require("mongoose");
const { Schema } = mongoose;

const nameSchema = new Schema({
    first: String,
    last: String,
});

const adressSchema = new Schema({
    city: String,
    street: String,
    number: Number,
});

const staffSchema = new Schema({
    name: {
        type: nameSchema,
        required: true,
    },
    address: {
        type: adressSchema,
        required: true,
    },
    role: { type: String, required: true },
    profilePic: { type: String },
    birthDate: { type: Date, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    schools: [{ type: Schema.Types.ObjectId, ref: "School" }],
    active: { type: Boolean, required: true, default: true },
});

const Staff = new mongoose.model("Staff", staffSchema);
module.exports = { Staff };
