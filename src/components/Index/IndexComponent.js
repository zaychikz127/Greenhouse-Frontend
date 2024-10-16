import 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './IndexComponent.css';
import ItemsList from './ItemsList';
import LdrDisplay from './LdrDisplay';
import MonthYearDropdowns from './MonthYearDropdowns';
import PlantChartContainer from './PlantChartContainer';

function IndexComponent() {
    const [data, setData] = useState([]);
    const [plantData, setPlantData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [ldrValue, setLdrValue] = useState(null);
    const [isOffline, setIsOffline] = useState(true);
    const [ldrTimeout, setLdrTimeout] = useState(null);
    const previousLdrValue = useRef(null);

    useEffect(() => {
        // Fetch ข้อมูล indexs
        const fetchIndexes = async () => {
            try {
                const response = await fetch('https://got-api-fnlp.plutopon.site/api/indexs');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching indexs:', error);
            }
        };

        // Fetch ข้อมูลพืช
        const fetchPlantData = async () => {
            try {
                const response = await fetch('https://got-api-fnlp.plutopon.site/api/plants/daily-plant-data');
                const data = await response.json();
                setPlantData(data);
                const currentDate = new Date();
                const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
                const currentYear = currentDate.getFullYear().toString();

                // ตั้งค่าที่เลือกให้เป็นเดือนและปีปัจจุบันถ้ายังไม่เลือก
                if (!selectedMonth) setSelectedMonth(currentMonth);
                if (!selectedYear) setSelectedYear(currentYear);
            } catch (error) {
                console.error('Error fetching plant data:', error);
            }
        };

        fetchIndexes();
        fetchPlantData();

        // ฟังก์ชัน Fetch ค่า LDR
        const fetchLdrValue = async () => {
            try {
                const response = await fetch('https://got-api-fnlp.plutopon.site/api/ldr');
                const data = await response.json(); // ดึงข้อมูลในรูปแบบ JSON

                // เปรียบเทียบค่า LDR ล่าสุด
                if (data.value !== previousLdrValue.current) {
                    setLdrValue(data.value);
                    setIsOffline(false);
                    previousLdrValue.current = data.value; // บันทึกค่า LDR ล่าสุด

                    // รีเซ็ต timeout ใหม่
                    if (ldrTimeout) {
                        clearTimeout(ldrTimeout);
                    }
                    const newTimeout = setTimeout(() => {
                        setIsOffline(true); // ตั้งสถานะออฟไลน์ถ้าไม่มีการอัปเดตภายใน 5 วินาที
                    }, 5000); // ตั้ง timeout 5 วินาที
                    setLdrTimeout(newTimeout);
                }
            } catch (error) {
                console.error('Error fetching LDR value:', error);
                setIsOffline(true);
            }
        };

        const interval = setInterval(fetchLdrValue, 1000); // Fetch ทุก ๆ 1 วินาที
        return () => {
            clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
            if (ldrTimeout) {
                clearTimeout(ldrTimeout); // ล้าง timeout เมื่อ component ถูก unmount
            }
        };
    }, [ldrTimeout, selectedMonth, selectedYear]);

    // ฟังก์ชันแปลงค่า LDR เป็นเปอร์เซ็นต์
    const getLdrPercentage = () => {
        if (isOffline || ldrValue === null) return 'ออฟไลน์'; // ถ้าออฟไลน์หรือไม่มีค่าให้แสดงว่าออฟไลน์
        const maxLdrValue = 4095; // ค่า LDR สูงสุด (ขึ้นอยู่กับ ADC ของ ESP32)
        const percentage = 100 - Math.round((ldrValue / maxLdrValue) * 100);
        return `${percentage}%`; // ยิ่งค่า LDR มาก เปอร์เซ็นต์จะน้อยลง
    };

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
                <Link to="/login">
                    <button className="login-button">Go to Login</button>
                </Link>
                
                <LdrDisplay getLdrPercentage={getLdrPercentage} />
            </div>
    
            <ItemsList data={data} />
    
            <MonthYearDropdowns 
                months={months} 
                years={years} 
                selectedMonth={selectedMonth} 
                selectedYear={selectedYear} 
                setSelectedMonth={setSelectedMonth} 
                setSelectedYear={setSelectedYear} 
            />
    
            <PlantChartContainer 
                filteredPlantData={filteredPlantData} 
                selectedMonth={selectedMonth} 
                selectedYear={selectedYear} 
            />
        </div>
    );
}

export default IndexComponent;
