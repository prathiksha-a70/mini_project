
const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
  const sql = `
    SELECT user_id, username, phone, created_at 
    FROM users 
    WHERE username LIKE 'admin%' 
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching admins:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
