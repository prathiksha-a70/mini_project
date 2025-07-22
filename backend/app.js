const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./Routes/authRoutes');
const otpRoutes = require('./Routes/otpRoutes');
const CustomerRoutes=require('./Routes/customers');
const vehicleRoutes=require('./Routes/vehicle');;
const feedbackRoutes=require('./Routes/route');;
const admindashRoutes = require('./Routes/admindashRoutes');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
// app.use('/api/feedback',feedbackRoutes);
app.use('/api/vehicle',vehicleRoutes);
app.use('/api/customers',CustomerRoutes);
app.use('/api',feedbackRoutes);
app.use('/api/admin', admindashRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
   });

  