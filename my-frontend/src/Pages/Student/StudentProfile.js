import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import StudentNavbar from "./StudentNavbar";
import './StudentProfile.css'; // We'll add extra CSS here

const StudentProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Fetch data from user table
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/1") // Replace 1 with logged-in user ID
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/users/${user.id}`, user)
      .then((res) => {
        alert("Profile updated!");
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <StudentNavbar />
      <Container className="profile-container">
        <Paper elevation={3} className="profile-card">
          <Typography variant="h4" className="profile-title">
            My Profile
          </Typography>
          <Box className="profile-field">
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Box>
          <Box className="profile-field">
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Box>
          <Box className="profile-field">
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Box>
          <Box className="profile-field">
            <TextField
              label="Course"
              name="course"
              value={user.course}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Box>

          <Box className="profile-buttons">
            {editMode ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default StudentProfile;
