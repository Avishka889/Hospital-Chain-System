const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    contact: String
});

module.exports = mongoose.model("Hospital", hospitalSchema);
