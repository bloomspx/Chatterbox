import React from 'react';
import { style } from 'glamor';
import './wordCard.css';

const WordCard = (props) => {

    const { content, type, sentiment, wordText, wordSubtext } = props;

    const colorStyle = {
        "Positive": {"color": "#5cc05c"},
        "Neutral": {"color": "#5cb1c0"},
        "Negative": {"color": "#c05c5c"},
    }

    const styles = {
        hoverStyle: style({
            ":hover": {
                textDecoration:"underline",
                fontWeight: "600",
            }
        })
    };


    return (
    <div className="word-card">
            <div className="word-header">
                {type !== "sentiment" && <b>{wordText}</b>}
                {type === "sentiment" && <b>{wordText}<u style={colorStyle[sentiment]}>{sentiment}</u></b>}
                <h4>{wordSubtext}</h4>
            </div>
            {type === "sentiment-text" && <div className="word-content">
                {Object.values(content).map((chunk, index) => {
                    let color = colorStyle[chunk["sentiment"]]
                    return (
                        <p style={color} {...styles.hoverStyle} 
                            title={chunk["sentiment"] + " Sentiment Score: " + chunk["score"]}
                            key={index}>
                            {chunk["text"]}
                        </p>
                    )
                })}
            </div>}
            {type === "summary" && <div className="word-content">
                <p style={colorStyle[sentiment]}>{content}</p>
            </div>}
            {(type === "topics" || type === "sentiment") && <div className="word-content">
                {content}
            </div>}
    </div>
    );
};

export default WordCard;
