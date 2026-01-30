const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // .env load karanna

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Test route
app.get("/", (req, res) => {
    res.send("Hospital Backend Running");
});

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/appointments', require('./routes/appointment'));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));