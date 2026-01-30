const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // hashed with bcrypt
    phone: String
});

module.exports = mongoose.model("Patient", patientSchema);
