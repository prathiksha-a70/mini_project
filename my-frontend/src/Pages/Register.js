import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Box, Link, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('student');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'User Name is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      await axios.post('http://localhost:5000/api/auth/register', { 
        username: name, 
        password, 
        role, 
        phone 
      });
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) { 
        alert('Username already taken'); 
      } else { 
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-bg-div">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="transparent">
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
          <Typography variant="h4" align="center" gutterBottom color="black">
            Registration
          </Typography>

          <TextField
            label="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
          />

          {/* Role Dropdown */}
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="secondary" sx={{ background: "red" }} onClick={handleRegister}>
              Register
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already registered?{' '}
              <Link href="/" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Register;
