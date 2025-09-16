import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCommentDots, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <Box className="sidebar">
      <Typography 
  variant="h6" 
  className="sidebar-title" 
  gutterBottom
  sx={{ marginBottom: "40px" }} // space between heading and first menu item
>
  COLLEGE EVENT <br /> MANAGEMENT
</Typography>


      <div className="menu">
        <Button className="menu-item" onClick={() => navigate("/Admin/AdminDashboard")}>
          <FaTachometerAlt /> Dashboard
        </Button>
         <Button className="menu-item" onClick={() => navigate("/Admin/ViewAdmin")}>
        <FaUsers />View Admins
      </Button>
        <Button className="menu-item" onClick={() => navigate("/Admin/ViewFeedback")}>
          <FaCommentDots /> View Feedback
        </Button>
        <Button className="menu-item" onClick={() => navigate("/Admin/ManageEvents")}>
          <FaCalendarAlt /> Manage Events
        </Button>
        <Button className="menu-item" onClick={() => navigate("/Admin/ManageStudents")}>
          <FaUsers /> Manage Students
        </Button>

      </div>

      <Button className="logout-btn" onClick={() => navigate("/")}>
        <FaSignOutAlt /> Logout
      </Button>
    </Box>
  );
};

export default AdminNavbar;
