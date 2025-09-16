const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get user by ID (existing)
router.get("/:id", (req, res) => {
  const sql = `
    SELECT user_id, username, phone, role, created_at 
    FROM users 
    WHERE user_id = ?`;
  
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
});

// ✅ Update user profile (existing)
router.put("/:id", (req, res) => {
  const { username, phone } = req.body;

  if (!username || !phone) return res.status(400).json({ message: "Username and phone are required" });

  const sql = "UPDATE users SET username = ?, phone = ? WHERE user_id = ?";
  db.query(sql, [username, phone, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

    res.json({
      user_id: req.params.id,
      username,
      phone,
      message: "Profile updated successfully",
    });
  });
});

// --- UPDATED: Manage Students Routes (NO COURSE FIELD) ---

// Get all students
router.get("/students/all", (req, res) => {
  const sql = "SELECT user_id, username, phone, created_at FROM users WHERE role='student'";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// Add a new student
router.post("/students", (req, res) => {
  const { username, phone } = req.body;
  if (!username || !phone) return res.status(400).json({ message: "All fields are required" });

  const sql = "INSERT INTO users (username, phone, role) VALUES (?, ?, 'student')";
  db.query(sql, [username, phone], (err, result) => {
    if (err) return res.status(500).json({ message: "Insert failed" });
    res.json({ message: "Student added", user_id: result.insertId });
  });
});

// Update student
router.put("/students/:id", (req, res) => {
  const { username, phone } = req.body;

  const sql = "UPDATE users SET username=?, phone=? WHERE user_id=?";
  db.query(sql, [username, phone, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated" });
  });
});

// Delete student
router.delete("/students/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE user_id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  });
});


module.exports = router;
