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

const parentSchema = new Schema({
    name: {
        type: nameSchema,
        required: true,
    },
    address: {
        type: adressSchema,
        required: true,
    },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    schools: [{ type: Schema.Types.ObjectId, ref: "School" }],
    children: [{ type: Schema.Types.ObjectId, ref: "Children" }],
    active: { type: Boolean, required: true, default: true },
});

const Parent = new mongoose.model("Parent", parentSchema);
module.exports = { Parent };
