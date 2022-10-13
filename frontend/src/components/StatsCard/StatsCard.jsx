import React from 'react';
import './statsCard.css';

const StatsCard = (props) => {

    const { icon , statsText, statsValue } = props;


    return (
    <div className="stats-card">
        <div className="card-content">
            <div className="stats">
                <b>{statsText}</b>
                <p>{statsValue}</p>
            </div>
        </div>
        <div className='icons'>{icon}</div>
    </div>
    );
};

export default StatsCard;
