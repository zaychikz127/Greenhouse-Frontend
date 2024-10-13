import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminComponent from './components/AdminComponent';
import ChangePasswordComponent from './components/ChangePasswordComponent'; // เพิ่มการนำเข้า ChangePasswordComponent
import IndexComponent from './components/IndexComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/change-password" element={<ChangePasswordComponent />} /> {/* เพิ่มเส้นทางใหม่ */}
      </Routes>
    </Router>
  );
}

export default App;
