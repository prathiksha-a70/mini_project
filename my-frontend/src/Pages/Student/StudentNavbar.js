import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#3f51b5",
        borderRadius: "0 0 15px 15px",
        mb: 3, // adds space below navbar
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/student/dashboard")}
        >
          Student Portal
        </Typography>

        <Button color="inherit" onClick={() => navigate("/Student/StudentDashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/Student/StudentProfile")}>
          Profile
        </Button>
        <Button color="inherit" onClick={() => navigate("/student/events")}>
          Events
        </Button>
        <Button color="inherit" onClick={() => navigate("/Student/StudentFeedback")}>
          Feedback
        </Button>
        <Button color="inherit" onClick={() => navigate("/")}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
