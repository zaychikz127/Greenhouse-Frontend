import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง
import './ChangePasswordComponent.css'; // นำเข้าไฟล์ CSS

function ChangePasswordComponent() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // สร้างตัวแปร navigate สำหรับการเปลี่ยนเส้นทาง

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // ดึงชื่อผู้ใช้จาก Local Storage
        const username = localStorage.getItem('username');

        if (!username) {
            setMessage('Please log in to change your password.');
            return;
        }

        try {
            const response = await fetch('https://got-api-fnlp.plutopon.site/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // แสดงข้อความตอบกลับจากเซิร์ฟเวอร์
                
                // เปลี่ยนไปหน้า admin ทันที
                navigate('/admin', { state: { successMessage: 'เปลี่ยนรหัสผ่านสำเร็จ' } }); // เปลี่ยนเส้นทางไปที่หน้า admin พร้อมข้อความ
            } else {
                // จัดการข้อผิดพลาดที่เกิดขึ้น
                setMessage(data.message || 'Error changing password. Please try again.');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <div className="change-password-container">
            <h2>เปลี่ยนรหัสผ่าน</h2>
            <form onSubmit={handleChangePassword}>
                <div className="input-group">
                    <label htmlFor="oldPassword">รหัสผ่านเก่า : </label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="newPassword">รหัสผ่านใหม่ : </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">ยืนยันการเปลี่ยนรหัสผ่าน</button>
            </form>
            {message && <p className="response-message">{message}</p>} {/* แสดงข้อความตอบกลับ */}
        </div>
    );
}

export default ChangePasswordComponent;
