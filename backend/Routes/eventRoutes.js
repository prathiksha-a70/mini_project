const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/events", (req, res) => {
  const { event_name, event_date, description } = req.body;
  db.query(
    "INSERT INTO events (event_name, event_date, description) VALUES (?, ?, ?)",
    [event_name, event_date, description],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Event added successfully" });
    }
  );
});

router.delete("/events/:id", (req, res) => {
  db.query("DELETE FROM events WHERE event_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Event deleted successfully" });
  });
});

module.exports = router;
