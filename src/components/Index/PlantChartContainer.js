import React from 'react';
import PlantChart from './PlantChart';

const PlantChartContainer = ({ filteredPlantData, selectedMonth, selectedYear }) => {
    return (
        <div className="chart-container">
            <PlantChart filteredPlantData={filteredPlantData} selectedMonth={selectedMonth} selectedYear={selectedYear} />
        </div>
    );
};

export default PlantChartContainer;
