import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const Logout=()=>{
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('userid');
        navigate('/');
    };
    return (
        <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
        </Button>
    );
};
export default Logout;