import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminComponent.css'; // นำเข้าไฟล์ CSS

function AdminComponent() {
    const location = useLocation(); // ใช้ useLocation เพื่อเข้าถึงข้อมูลที่ส่งมา
    const username = localStorage.getItem('username');
    const successMessage = location.state?.successMessage; // ดึงข้อความจาก state

    return (
        <div className="admin-container">
            <h2>ยินดีต้อนรับ, {username}</h2> {/* แสดง username */}
            <Link to="/change-password">
                <button className="change-password-button">แก้ไขรหัสผ่าน</button>
            </Link>
            {successMessage && (
                <div className="popup">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
}

export default AdminComponent;
