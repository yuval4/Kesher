const mongoose = require("mongoose");
const { Schema } = mongoose;

const adressSchema = new Schema({
    city: String,
    street: String,
    number: Number,
});

const schoolSchema = new Schema({
    name: { type: String, required: true },
    address: {
        type: adressSchema,
        required: true,
    },
    eventsBoard: [
        {
            title: { type: String, required: true },
            details: { type: String },
            startTime: { type: Date, required: true },
            endTime: { type: Date },
            creationDate: { type: Date, default: new Date() },
            creatorId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    parents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    children: [{ type: Schema.Types.ObjectId, ref: "Children" }],
    staff: [{ type: Schema.Types.ObjectId, ref: "User" }],
    active: { type: Boolean, required: true, default: true },
});

const School = new mongoose.model("School", schoolSchema);
module.exports = { School };
// LINK https://mongoosejs.com/docs/populate.html
