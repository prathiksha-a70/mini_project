const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user by ID
router.get("/:id", (req, res) => {
  const sql = "SELECT user_id, username, phone, role, created_at FROM users WHERE user_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
});

// Update user profile (no password updates here)
router.put("/:id", (req, res) => {
  const { username, phone } = req.body;
  const sql = "UPDATE users SET username=?, phone=? WHERE user_id=?";
  db.query(sql, [username, phone, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    res.json({ user_id: req.params.id, username, phone });
  });
});

module.exports = router;
