const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    date: Date,
    timeSlot: String,
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
