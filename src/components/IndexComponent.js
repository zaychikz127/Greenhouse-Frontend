import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './IndexComponent.css';
import PlantChart from './PlantChart';

function IndexComponent() {
    const [data, setData] = useState([]);
    const [plantData, setPlantData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [ldrValue, setLdrValue] = useState(null); // สร้าง state สำหรับค่าเซนเซอร์

    useEffect(() => {
        // Fetch ข้อมูล indexs
        //fetch('http://localhost:4500/api/indexs')
        fetch('https://dev-got.planriean.com/api/indexs')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching indexs:', error));

        // Fetch ข้อมูลพืช
        //fetch('http://localhost:4500/api/plants/daily-plant-data')
        fetch('https://dev-got.planriean.com/api/plants/daily-plant-data')
            .then(response => response.json())
            .then(data => {
                setPlantData(data);
                const currentDate = new Date();
                const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
                const currentYear = currentDate.getFullYear().toString();
                
                setSelectedMonth(currentMonth);
                setSelectedYear(currentYear);
            })
            .catch(error => console.error('Error fetching plant data:', error));

        // Fetch ข้อมูลเซนเซอร์ LDR ทุก ๆ 1 วินาที
        const fetchLdrValue = async () => {
            try {
                const response = await fetch('https://dev-got.planriean.com/api/ldr');
                const data = await response.text();
                setLdrValue(data);
            } catch (error) {
                console.error('Error fetching LDR value:', error);
            }
        };

        const interval = setInterval(fetchLdrValue, 1000); // Fetch ทุก ๆ 1 วินาที
        return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
    }, []);

    const months = [...new Set(plantData.map(entry => new Date(entry.date).toLocaleString('default', { month: 'long' })))];
    const years = [...new Set(plantData.map(entry => new Date(entry.date).getFullYear()))];

    const filteredPlantData = plantData.filter(entry => {
        const entryMonth = new Date(entry.date).toLocaleString('default', { month: 'long' });
        const entryYear = new Date(entry.date).getFullYear();
        return entryMonth === selectedMonth && entryYear.toString() === selectedYear;
    });

    return (
        <div className="index-container">
            <div className="sticky-bar">
                <div className="dropdowns">
                    <select onChange={e => setSelectedMonth(e.target.value)} value={selectedMonth}>
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>

                    <select onChange={e => setSelectedYear(e.target.value)} value={selectedYear}>
                        <option value="">Select Year</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <Link to="/login">
                    <button className="login-button">Go to Login</button>
                </Link>

                {/* แสดงค่าเซนเซอร์ LDR */}
                <div className="ldr-display">
                    <h3>LDR Value: {ldrValue ?? 'Loading...'}</h3>
                </div>
            </div>

            <div className="items-list">
                {data.map((item, index) => (
                    <div key={index} className="item-container">
                        <h3>{item.title}</h3>
                        {item.image_blob ? (
                            <img
                                src={item.image_blob}
                                alt={item.title}
                                className="item-image"
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="chart-container">
                <PlantChart filteredPlantData={filteredPlantData} selectedMonth={selectedMonth} selectedYear={selectedYear} />
            </div>
        </div>
    );
}

export default IndexComponent;
