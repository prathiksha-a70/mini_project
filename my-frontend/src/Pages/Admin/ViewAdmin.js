import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";

const ViewAdmin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admins")
      .then((res) => {
        setAdmins(
          res.data.map((admin) => ({
            id: admin.user_id, // DataGrid needs "id"
            username: admin.username,
            phone: admin.phone,
            created_at: new Date(admin.created_at).toLocaleString(),
          }))
        );
      })
      .catch((err) => console.error("Error fetching admins:", err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "phone", headerName: "Phone", width: 180 },
    { field: "created_at", headerName: "Created At", width: 250 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admins List
      </Typography>
      <Paper sx={{ p: 2, display: "inline-block" }}>
  <DataGrid
    rows={admins}
    columns={columns}
    autoHeight
    pageSize={5}
    rowsPerPageOptions={[5, 10, 20]}
    disableColumnMenu
  />
</Paper>

    </Box>
  );
};

export default ViewAdmin;
