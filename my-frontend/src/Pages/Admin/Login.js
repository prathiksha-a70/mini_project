import React,{useState,useEffect} from "react";
import {Button,TextField,Box, Typography,Paper,Link}from '@mui/material';
import {useNavigate}from "react-router-dom";
import axios from "axios";

const Login = () => {
    const[user_name,setUser]=useState("");
    const[password,setPassword]=useState("");

    const navigate=useNavigate();
    useEffect(() => {
        const storedUserName = localStorage.getItem("user_name");
        if (storedUserName) {
          setUser(storedUserName);
        }
      }, []);

      const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { user_name, password });
    
            console.log("API Response:", response.data); // Debugging log
    
            const { user_type, user_id, user_name: returnedUserName } = response.data || {}; 
    
            if (!user_id) {
                console.error("user_id is undefined!");
                alert("Login failed, please try again.");
                return;
            }
    
            // Store user_id and user_name in localStorage
            localStorage.setItem("user_id", user_id);
            localStorage.setItem("user_name", returnedUserName || user_name);
            localStorage.setItem("user_type", user_type);
    
            console.log('User Type:', user_type);
            console.log('User ID:', user_id);
            console.log('User Name:', returnedUserName);
    
            // Redirect based on role
            if (user_type === "admin") {
                navigate('/admin/AdminDash');
            } else if (user_type === 'user') {
                navigate('/User/Home');
            } else if (user_type === "employee") {
                navigate('/employee/EmployDash');
            } else {
                alert('Role not recognized');
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert('Invalid credentials');
        }
    };
    

    return (
        <div className="login-bg-div">
        <Box 
        sx={{scale:'0.8'}}
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        bgcolor="transparent"
        >
        <Paper 
        elevation={3} 
        sx={{ padding: 4, maxWidth: 400, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}

>        <Typography variant="h4" align="center" gutterBottom >
        Login
        </Typography>

        <TextField
        label="User Name"
        type="user_name"
        onChange={(e) => setUser(e.target.value)}
        fullWidth
        margin="normal"
        />

        <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="secondary" sx={{background:'red'}} onClick={handleLogin}>
        Login
        </Button>
        </Box>
        <Box mt={2} textAlign="center">
        <Typography variant="body2">
        Don't have an account?{' '}
        <Link href="/register" underline="hover">
        Register here
        </Link>
        </Typography>

        <Typography variant="body2" mt={1}>
        <Link href="/forgot-password" underline="hover">
        Forgot Password?
        </Link>
        </Typography>
        </Box>
        </Paper>
        </Box>
        </div>
        );
};
export default Login;