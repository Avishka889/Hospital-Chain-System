const mongoose = require("mongoose");

const doctorAvailabilitySchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    day: String, // Mon, Tue, etc
    timeSlots: [String] // ["9:00-10:00", "10:00-11:00"]
});

module.exports = mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
