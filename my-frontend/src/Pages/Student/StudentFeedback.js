import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import StudentNavbar from "./StudentNavbar";

const StudentFeedback = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      setSuccess("Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Error submitting feedback. Try again.");
    }
  };

  return (
    <>
      <StudentNavbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Student Feedback Form
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />

            {success && (
              <Typography color="green" sx={{ mt: 2 }}>
                {success}
              </Typography>
            )}
            {error && (
              <Typography color="red" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default StudentFeedback;
