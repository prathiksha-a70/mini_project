import React from "react";  
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import { People, Event, Feedback } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { 
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data for charts
  const eventData = [
    { month: "Jan", events: 5 },
    { month: "Feb", events: 8 },
    { month: "Mar", events: 12 },
    { month: "Apr", events: 9 },
    { month: "May", events: 15 },
  ];

  const feedbackData = [
    { type: "Positive", count: 80 },
    { type: "Neutral", count: 30 },
    { type: "Negative", count: 10 },
  ];

  // Mock data for tables
  const latestUsers = [
    { id: 1, name: "John Doe", role: "Student" },
    { id: 2, name: "Jane Smith", role: "Organizer" },
    { id: 3, name: "Michael Lee", role: "Student" },
    { id: 4, name: "Priya Patel", role: "Student" },
    { id: 5, name: "Alex Johnson", role: "Admin" },
  ];

  const latestEvents = [
    { id: 1, name: "Tech Fest", date: "2025-08-10" },
    { id: 2, name: "Cultural Night", date: "2025-08-12" },
    { id: 3, name: "Sports Meet", date: "2025-08-15" },
    { id: 4, name: "Coding Hackathon", date: "2025-08-18" },
    { id: 5, name: "Workshop: AI Trends", date: "2025-08-20" },
  ];

  const stats = [
    {
      title: "Total Users",
      value: 120,
      icon: <People fontSize="large" />,
      path: "/Admin/ManageUsers",
    },
    {
      title: "Total Events",
      value: 25,
      icon: <Event fontSize="large" />,
      path: "/Admin/ManageEvents",
    },
    {
      title: "Feedback Received",
      value: 120,
      icon: <Feedback fontSize="large" />,
      path: "/Admin/ViewFeedback",
    },
    {
      title: "Registered Students",
      value: 200,
      icon: <People fontSize="large" />,
      path: "/Admin/ManageStudents",
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        background: "linear-gradient(to right, #f3f4f6, #e3f2fd)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              onClick={() => navigate(stat.path)}
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", color: "#1976d2" }}>
                {stat.icon}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Events Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventData}>
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Feedback Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Grid container spacing={4}>
        {/* Latest Users */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest Users
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        {/* Latest Events */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest Events
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Event</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
