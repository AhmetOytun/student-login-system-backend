const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
});

const Announcement = model("Announcement", announcementSchema);

module.exports = Announcement;
