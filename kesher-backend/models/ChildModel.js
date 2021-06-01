const mongoose = require("mongoose");
const { Schema } = mongoose;

const image =
    "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";

const nameSchema = new Schema({
    first: String,
    last: String,
});

const childSchema = new Schema({
    name: {
        type: nameSchema,
        required: true,
    },
    profilePic: { type: String, default: image },
    birthDate: { type: Date, required: true },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    active: { type: Boolean, required: true, default: true },
});

const Child = new mongoose.model("Children", childSchema);
module.exports = { Child };
