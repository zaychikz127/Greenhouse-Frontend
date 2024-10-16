import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordComponent.css'; // Import CSS

function ForgotPasswordComponent() {
    const [email, setEmail] = useState(''); // เปลี่ยนจาก phone เป็น email
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4500/api/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // ส่ง email แทน phone
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('OTP has been sent to your email.');

                // เก็บข้อมูลผู้ใช้ใน localStorage
                localStorage.setItem('userData', JSON.stringify(data.user)); // เก็บข้อมูลผู้ใช้ใน localStorage

                // นำทางไปยังหน้าที่ให้ผู้ใช้กรอก OTP ได้ที่นี่
                navigate('/verify-otp');
            } else {
                setMessage(data.message || 'Error processing your request.');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };


    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>ลืมรหัสผ่าน</h2>
                <label>
                    อีเมล :
                    <input
                        type="email" // เปลี่ยน type เป็น email
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // เปลี่ยนจาก phone เป็น email
                        required
                    />
                </label>
                <button type="submit">ส่ง OTP</button>
                <p className="forgot-password-message">{message}</p>
            </form>
        </div>
    );
}

export default ForgotPasswordComponent;
