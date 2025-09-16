import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminNavbar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {/* Renders the child route */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
