import React from 'react';
import { style } from 'glamor';
import './ListCard.css';

const ListCard = (props) => {

    const { content, type, listText, listSubtext } = props;

    return (
    <div className="list-card">
            <div className="list-header">
                <b>{listText}</b>
                <h4>{listSubtext}</h4>
            </div>
            {type === "stt" && <div className="list-content">
              {content.map(fName => (
                <li>{fName}</li>
              ))}
            </div>}
    </div>
    );
};

export default ListCard;
