import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ViewFeedback from './Pages/Admin/ViewFeedback';
import ManageEvents from './Pages/Admin/ManageEvents';
import ManageStudents from './Pages/Admin/ManageStudents';
import AdminLayout from './Pages/Admin/AdminLayout';
import ViewAdmin from './Pages/Admin/ViewAdmin';

import StudentDashboard from './Pages/Student/StudentDashboard';
import StudentFeedback from "./Pages/Student/StudentFeedback";
import StudentProfile from './Pages/Student/StudentProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route index element={<Login />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/Admin" element={<AdminLayout />}>
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="ViewAdmin" element={<ViewAdmin />} />
          <Route path="ViewFeedback" element={<ViewFeedback />} />
          <Route path="ManageEvents" element={<ManageEvents />} />
          <Route path="ManageStudents" element={<ManageStudents />} />
        </Route>

        {/* Student routes */}
        <Route path="/Student/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/Student/StudentProfile" element={<StudentProfile />} />
        {/* <Route path="/student/events" element={<StudentEvents />} /> */}
        <Route path="/Student/StudentFeedback" element={<StudentFeedback />} /> 

        {/* Catch-all */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
