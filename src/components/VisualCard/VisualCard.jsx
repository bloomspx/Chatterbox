import React from 'react';
import './visualCard.css';

const VisualCard = (props) => {

    const { content , visualText, visualSubtext } = props;

    return (
    <div className="visual-card">
            <div className="visual-header">
                <b>{visualText}</b>
                <h4>{visualSubtext}</h4>
            </div>
            <div className="visual-content">
                {content}
            </div>
    </div>
    );
};

export default VisualCard;
