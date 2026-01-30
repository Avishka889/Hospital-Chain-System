const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const DoctorAvailability = require('../models/doctorAvailability');

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find().select('-password');
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/doctors/:id/availability
// @desc    Get hospitals & time slots for a specific doctor
// @access  Public
router.get('/:id/availability', async (req, res) => {
    try {
        const availability = await DoctorAvailability.find({ doctor: req.params.id })
            .populate('hospital', 'name address contact');

        if (!availability) {
            return res.status(404).json({ msg: 'Availability not found' });
        }

        res.json(availability);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Doctor not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
