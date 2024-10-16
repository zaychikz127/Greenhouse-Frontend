import React from 'react';

const MonthYearDropdowns = ({ months, years, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear }) => {
    return (
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
    );
};

export default MonthYearDropdowns;
