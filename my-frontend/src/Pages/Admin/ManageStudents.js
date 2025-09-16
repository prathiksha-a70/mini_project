import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({ username: "", phone: "" }); // Removed course

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/api/users/students/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    setCurrentStudent(null);
    setFormData({ username: "", phone: "" }); // Removed course
    setOpen(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setFormData({
      username: student.username,
      phone: student.phone,
      // Removed course
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`http://localhost:5000/api/users/students/${id}`)
        .then(() => fetchStudents())
        .catch((err) => console.error("Error deleting student:", err));
    }
  };

  const handleSubmit = () => {
    if (currentStudent) {
      axios
        .put(`http://localhost:5000/api/users/students/${currentStudent.user_id}`, formData)
        .then(() => {
          fetchStudents();
          setOpen(false);
        })
        .catch((err) => console.error("Error updating student:", err));
    } else {
      axios
        .post("http://localhost:5000/api/users/students", formData)
        .then(() => {
          fetchStudents();
          setOpen(false);
        })
        .catch((err) => console.error("Error adding student:", err));
    }
  };

  const columns = [
    { field: "user_id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    // Removed course column
    { field: "created_at", headerName: "Created At", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.user_id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={4} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          Manage Students
        </Typography>

        <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
          Add Student
        </Button>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={students}
            columns={columns}
            getRowId={(row) => row.user_id}
            pageSize={7}
            rowsPerPageOptions={[5, 7, 10]}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "rgba(0, 123, 255, 0.08)",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "#fff",
                fontSize: 16,
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{currentStudent ? "Edit Student" : "Add Student"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          {/* Removed course input */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentStudent ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageStudents;
