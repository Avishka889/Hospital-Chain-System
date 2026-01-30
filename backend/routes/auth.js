const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');
const Admin = require('../models/admin');

// @route   POST /api/patient/register
// @desc    Register a new patient
// @access  Public
router.post('/patient/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user already exists
        let patient = await Patient.findOne({ email });
        if (patient) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new patient instance
        patient = new Patient({
            name,
            email,
            password,
            phone
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        patient.password = await bcrypt.hash(password, salt);

        await patient.save();

        // Create payload for JWT
        const payload = {
            user: {
                id: patient.id,
                role: 'patient'
            }
        };

        // Sign token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, patient: { id: patient.id, name: patient.name, email: patient.email } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/patient/login
// @desc    Authenticate patient & get token
// @access  Public
router.post('/patient/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for patient
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create payload
        const payload = {
            user: {
                id: patient.id,
                role: 'patient'
            }
        };

        // Sign token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, patient: { id: patient.id, name: patient.name, email: patient.email } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create payload
        const payload = {
            user: {
                id: admin.id,
                role: 'admin'
            }
        };

        // Sign token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, admin: { id: admin.id, email: admin.email } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
