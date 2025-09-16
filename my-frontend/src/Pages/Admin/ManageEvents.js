import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";


const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    description: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events", err));
  };

  const handleOpen = () => {
    setFormData({ event_name: "", event_date: "", description: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    axios
      .post("http://localhost:5000/api/events", formData)
      .then(() => {
        fetchEvents();
        handleClose();
      })
      .catch((err) => console.error("Error adding event", err));
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios
        .delete(`http://localhost:5000/api/events/${id}`)
        .then(() => fetchEvents())
        .catch((err) => console.error("Error deleting event", err));
    }
  };

  const columns = [
    { field: "event_id", headerName: "ID", width: 100 },
    { field: "event_name", headerName: "Event Name", width: 250 },
    { field: "event_date", headerName: "Date", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteEvent(params.row.event_id)}
          color="error"
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <Box display="flex">
     
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Manage Events
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ mb: 2 }}
          >
            Add Event
          </Button>

          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={events}
              columns={columns}
              pageSize={10}
              getRowId={(row) => row.event_id}
            />
          </div>
        </Paper>
      </Box>

      {/* Add Event Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Event Name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            type="date"
            label="Event Date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageEvents;
