import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminComponent from './components/Admin/AdminComponent';
import ChangePasswordComponent from './components/ChangePassword/ChangePasswordComponent';
import ForgotPasswordComponent from './components/ForgotPassword/ForgotPasswordComponent';
import IndexComponent from './components/Index/IndexComponent';
import LoginComponent from './components/Login/LoginComponent';
import VerifyOTPComponent from './components/VerifyOTP/VerifyOTPComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/change-password" element={<ChangePasswordComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
        <Route path="/verify-otp" element={<VerifyOTPComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
