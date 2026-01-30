const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// @route   POST /api/appointments
// @desc    Book an appointment
// @access  Public (should be private in production)
router.post('/', async (req, res) => {
    try {
        const { patient, doctor, hospital, date, timeSlot } = req.body;

        // Basic validation
        if (!patient || !doctor || !hospital || !date || !timeSlot) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        const newAppointment = new Appointment({
            patient,
            doctor,
            hospital,
            date,
            timeSlot
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/appointments/:patientId
// @desc    View patient appointments
// @access  Public (should be private in production)
router.get('/:patientId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.params.patientId })
            .populate('doctor', 'name specialization')
            .populate('hospital', 'name address')
            .sort({ date: -1 }); // Sort by date descending

        if (!appointments) {
            return res.status(404).json({ msg: 'No appointments found' });
        }

        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Patient not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
