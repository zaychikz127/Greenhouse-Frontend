import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css'; // Import CSS

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            //const response = await fetch(`http://localhost:4500/login`, {
            const response = await fetch(`https://dev-got.planriean.com/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
            if (response.ok && data.message === 'Login successful') {
                setMessage('Login successful');
                // บันทึก username ใน Local Storage
                localStorage.setItem('username', username);
                // นำผู้ใช้ไปหน้า /admin
                navigate('/admin');
            } else {
                setMessage(data.message || 'Invalid username or password');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
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
            </form>
        </div>
    );
}

export default LoginComponent;
