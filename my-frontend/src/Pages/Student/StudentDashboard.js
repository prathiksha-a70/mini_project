import React from "react";
import StudentNavbar from "./StudentNavbar";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Profile",
      description: "View and edit your student details.",
      path: "/Student/StudentProfile",
    },
    {
      title: "My Events",
      description: "Check upcoming and past events.",
      path: "/student/events",
    },
    {
      title: "Feedback",
      description: "Give feedback to the admins.",
      path: "/Student/StudentFeedback",
    },
    {
      title: "Notifications",
      description: "Stay updated with announcements.",
      path: "/student/notifications",
    },
  ];

  return (
    <div>
      {/* Top Navbar */}
      <StudentNavbar />

      {/* Dashboard Content */}
      <Box sx={{ p: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🎓 Student Dashboard
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: 3,
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
                onClick={() => navigate(card.path)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default StudentDashboard;
