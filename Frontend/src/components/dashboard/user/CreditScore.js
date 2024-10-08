import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreditScoreGauge = ({ score }) => {
    // Determine the color based on the credit score
    const getColor = (score) => {
        if (score >= 800) return "#00b894"; // Excellent
        if (score >= 740) return "#fdcb6e"; // Very Good
        if (score >= 670) return "#ffeaa7"; // Good
        if (score >= 580) return "#fd9644"; // Fair
        return "#d63031"; // Poor
    };

    return (
        <div style={{ width: 200, margin: '0 auto' }}>
            <CircularProgressbar
                value={score}
                maxValue={900}
                text={`${score}`}
                styles={buildStyles({
                    pathColor: getColor(score),
                    textColor: '#000',
                    trailColor: '#dfe6e9',
                    strokeLinecap: 'round',
                })}
            />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <strong>Credit Score: {score}</strong>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span style={{ color: '#d63031' }}>Poor (300-579) </span> | 
                <span style={{ color: '#fd9644' }}> Fair (580-669) </span> | 
                <span style={{ color: '#ffeaa7' }}> Good (670-739) </span> | 
                <span style={{ color: '#fdcb6e' }}> Very Good (740-799) </span> | 
                <span style={{ color: '#00b894' }}> Excellent (800-900) </span>
            </div>
        </div>
    );
};

export default CreditScoreGauge;
