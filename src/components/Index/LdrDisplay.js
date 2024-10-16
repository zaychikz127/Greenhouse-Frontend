import React from 'react';

const LdrDisplay = ({ getLdrPercentage }) => {
    return (
        <div className="ldr-display">
            <h3>ความเข้มแสง: {getLdrPercentage()}</h3>
        </div>
    );
};

export default LdrDisplay;
