import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const AdminNav = () => {
    return (
        <nav
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "linear-gradient(135deg,rgb(166, 190, 209) 60%,rgb(166, 190, 209) 100%)",
                height: "100vh",
                width: "250px",
                position: "fixed",
                overflowY: "auto",
                boxShadow: "2px 0 12px rgba(0,0,0,0.08)",
                padding: "32px 0 16px 0",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    color: "#2F4156",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                }}
            >
                Moto Manage
            </h2>
            <Link to="/Admin/AdminDash" style={linkStyle} activeclassname="active">
                DashBoard
            </Link>
            <Link to="/Admin/ManageUsers" style={linkStyle} activeclassname="active">
                Manage Users
            </Link>
            <Link to="/Admin/CustomersDetails" style={linkStyle} activeclassname="active">
                Manage Customers
            </Link>
            <Link to="/Admin/ManageVehicle" style={linkStyle} activeclassname="active">
                Manage Vehicles
            </Link>
            <Link to="/Admin/ManageFeedback" style={linkStyle} activeclassname="active">
                View Feedback
            </Link>
            <Link to="/Admin/Settings" style={linkStyle} activeclassname="active">
                Change Password
            </Link>
            <div>
                <Logout />
            </div>
        </nav>
    );
};

const linkStyle = {
    color: "#2F4156",
    textDecoration: "none",
    fontSize: "18px",
    padding: "12px 24px",
    borderRadius: "8px",
    margin: "0 12px",
    transition: "background 0.2s, color 0.2s",
    border: "none",
    display: "block",
    fontWeight: 500,
};

export default AdminNav;