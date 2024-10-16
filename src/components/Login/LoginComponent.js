import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`https://got-api-fnlp.plutopon.site/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
            if (response.ok && data.message === 'Login successful') {
                setMessage('Login successful');
                localStorage.setItem('username', username);
                navigate('/admin');
            } else {
                setMessage(data.message || 'Invalid username or password');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>เข้าสู่ระบบสำหรับผู้ดูแลระบบ</h2>
                <label>
                    ชื่อผู้ใช้ :
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    รหัสผ่าน :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">เข้าสู่ระบบ</button>
                <p className="login-message">{message}</p>
                <button type="button" onClick={handleForgotPassword}>
                    ลืมรหัสผ่าน?
                </button> {/* ลิงก์ไปหน้าลืมรหัสผ่าน */}
            </form>
        </div>
    );
}

export default LoginComponent;
