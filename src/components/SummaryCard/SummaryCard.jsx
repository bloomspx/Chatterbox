import React from 'react';
import './summaryCard.css';
import { MdDescription} from 'react-icons/md';
import WordCard from '../WordCard/WordCard';
import { TagCloud } from 'react-tagcloud';

const SummaryCard = (props) => {

    const { data } = props;

    const downloadText = (result) => {
        const link = document.createElement('a');
        const { filename, summary, overall_sentiment, topics, ...data } = result;
        const savedData = convertText({filename, summary, overall_sentiment, topics})
        const blob = new Blob([savedData], {type: "text/plain"});
        link.href = URL.createObjectURL(blob);
        link.download = result["filename"] + '_results.txt';
        link.click();
    }

    const handleOneDownload = () => {
        downloadText(data);
    }

    const convertText = (obj) => {
        const result = []
        result.push("Filename: " + obj["filename"])
        result.push("Summary: " + obj["summary"])
        result.push("Sentiment: " + obj["overall_sentiment"])
        result.push("Topic Words: " + obj["topics"].map(function(item){ return item.value}))
        return result.join("\n")
    }


    return (
    <div className="summary-card">
        <div className='file-header'>
            <div className='file-icon'>{<MdDescription color="#7380ec" />}</div>
            <h2>{data["filename"]}</h2>
            <button className="download button" type="button" onClick={handleOneDownload}>Download as TXT</button>
        </div>
        <div className='summary-container'>
            <div className="stats-table">
                <div className='subtable one'>
                    <WordCard 
                        wordText={"Sentiment: "} 
                        type="sentiment"
                        sentiment={data["overall_sentiment"]}
                        content={
                            <p>
                                {Object.keys(data["sentiment_count"]).map(function (key) {
                                    return "" + key + ": " + data["sentiment_count"][key];
                                }).join(", ")}
                            </p>
                        }
                    />
                    <WordCard
                        type="topics"
                        wordText="Topic Keywords"
                        content={
                        <>
                            <TagCloud
                                tags={data["topics"]}
                                className="simple-cloud"
                                colorOptions={{ luminosity: 'dark'}}
                                style={{ width: '100%', textAlign: 'left' }}
                                />
                        </>}
                    />
                </div>
                <div className='subtable two'>
                    <WordCard
                        type="summary"
                        wordText="Summary"
                        sentiment={data["overall_sentiment"]}
                        content={
                            <>{data['summary']}</>
                        }
                    />
                </div>
            </div>
            <div className='stats-table'>
            </div>
        </div>  
    </div>
    );
};

export default SummaryCard;
