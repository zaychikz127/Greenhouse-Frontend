// PlantChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const PlantChart = ({ filteredPlantData, selectedMonth, selectedYear }) => {
    // Create unique labels (days) from filtered plant data
    const uniqueDates = Array.from(
        new Set(filteredPlantData.map(entry => new Date(entry.date).getDate()))
    );

    // Prepare data for Leaf Length Line chart for tower_id 1 and 2
    const leafLengthData = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Leaf Length (Tower 1)',
                data: uniqueDates.map(day => {
                    const entry = filteredPlantData.find(e => new Date(e.date).getDate() === day && e.tower_id === 1);
                    return entry ? entry.leaf_length : null;
                }),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
            {
                label: 'Leaf Length (Tower 2)',
                data: uniqueDates.map(day => {
                    const entry = filteredPlantData.find(e => new Date(e.date).getDate() === day && e.tower_id === 2);
                    return entry ? entry.leaf_length : null;
                }),
                fill: false,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            },
        ],
    };

    // Prepare data for Leaf Width Line chart for tower_id 1 and 2
    const leafWidthData = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Leaf Width (Tower 1)',
                data: uniqueDates.map(day => {
                    const entry = filteredPlantData.find(e => new Date(e.date).getDate() === day && e.tower_id === 1);
                    return entry ? entry.leaf_width : null;
                }),
                fill: false,
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
                tension: 0.1,
            },
            {
                label: 'Leaf Width (Tower 2)',
                data: uniqueDates.map(day => {
                    const entry = filteredPlantData.find(e => new Date(e.date).getDate() === day && e.tower_id === 2);
                    return entry ? entry.leaf_width : null;
                }),
                fill: false,
                backgroundColor: 'rgba(255,159,64,0.2)',
                borderColor: 'rgba(255,159,64,1)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: `Plant Growth Data - ${selectedMonth} ${selectedYear}`, // Display selected month and year in chart title
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Measurement (cm)',
                },
                ticks: {
                    precision: 2,
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Line data={leafLengthData} options={chartOptions} />
            <Line data={leafWidthData} options={chartOptions} />
        </div>
    );
};

export default PlantChart;
