import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyOTPComponent.css';

const VerifyOTPComponent = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (timer === 0) {
            setMessage('หมดเวลาในการกรอก OTP');
            return;
        }

        const email = localStorage.getItem('email');
        if (!email) {
            setMessage('ไม่พบข้อมูลอีเมล');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4500/api/reset-password/verify-otp', {
                email,
                otp,
            });

            if (response.status === 200) {
                // นำทางไปยังหน้า NewPasswordComponent เมื่อ OTP ถูกต้อง
                navigate('/new-password');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error verifying OTP');
        }
    };

    return (
        <div className="verify-otp-container">
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                    <label>OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        disabled={timer === 0}
                    />
                </div>
                <button type="submit" disabled={timer === 0}>Verify OTP</button>
            </form>
            {message && <p className="message">{message}</p>}
            {timer > 0 && <p className="timer">เวลาที่เหลือ: {timer} วินาที</p>}
        </div>
    );
};

export default VerifyOTPComponent;
