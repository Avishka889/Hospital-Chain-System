const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');
const auth = require('../middleware/auth');

// @route   GET /api/hospitals
// @desc    Get all hospitals
// @access  Public
router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/hospitals
// @desc    Add a new hospital
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied: Admins only' });
    }

    try {
        const { name, address, contact } = req.body;

        // Validation
        if (!name) {
            return res.status(400).json({ msg: 'Please enter a hospital name' });
        }

        const newHospital = new Hospital({
            name,
            address,
            contact
        });

        const hospital = await newHospital.save();
        res.json(hospital);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
