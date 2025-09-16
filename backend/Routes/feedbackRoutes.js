const express = require("express");
const router = express.Router();
const db = require("../db");

// ----------------- ADMIN SIDE -----------------

// Get all feedback (Admin)
router.get("/", (req, res) => {
    const sql = "SELECT * FROM feedback ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching feedback:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

// ----------------- STUDENT SIDE -----------------

// Post feedback (Student)
router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("Error inserting feedback:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json({ message: "Feedback submitted successfully!" });
    });
});

module.exports = router;
