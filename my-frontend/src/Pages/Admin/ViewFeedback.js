import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";


const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedback")
      .then((res) => setFeedback(res.data))
      .catch((err) => console.error("Error fetching feedback", err));
  }, []);

  const columns = [
    { field: "feedback_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "created_at", headerName: "Date", width: 180 },
  ];

  return (
    <Box display="flex">
  

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Feedbacks
          </Typography>

          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={feedback}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.feedback_id}
            />
          </div>
        </Paper>
      </Box>
    </Box>
  );
};

export default ViewFeedback;
