const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: String,
    email: { type: String, unique: true },
    phone: String,
    password: String // hashed with bcrypt
});

module.exports = mongoose.model("Doctor", doctorSchema);
