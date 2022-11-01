import "./dashboard.css"
import { MdDescription, MdSubject, MdPin, MdSentimentNeutral, MdSentimentSatisfiedAlt, MdSentimentVeryDissatisfied, MdTextFormat, MdAnalytics } from 'react-icons/md';
import StatsCard from "../../components/StatsCard/StatsCard";
import VisualCard from "../../components/VisualCard/VisualCard";
import SentimentBarGraph from "../../components/Graph/SentimentBarGraph";
import WordCard from "../../components/WordCard/WordCard";
import { TagCloud } from 'react-tagcloud'

const Dashboard = (props) => {
    
    const { data, id } = props
    const sentiment = data["overall_sentiment"]

    const handleSentiment = () => {
        if (sentiment === "Negative") {
          return (<MdSentimentVeryDissatisfied color='#c05c5c'/>)
        } else if (sentiment === "Neutral"){
          return (<MdSentimentNeutral color='#5cb1c0'/>)
        } else {
          return (<MdSentimentSatisfiedAlt color='#5cc05c'/>)
        }
      }
      
    return (
        <div className="dashboard-container">
            <div className="stats table">
                <StatsCard 
                    statsText="Document ID"
                    icon={<MdDescription color="#7380ec" />}
                    statsValue={id}
                />
                <StatsCard 
                    statsText="Sentence Count"
                    icon={<MdSubject color="#ff7782" />}
                    statsValue={data["sentcount"]}
                />
                <StatsCard 
                    statsText="Wordcount"
                    icon={<MdPin color="#41f1b6" />}
                    statsValue={data["wordcount"]}
                />
                <StatsCard 
                    statsText="Sentiment"
                    icon={handleSentiment()}
                    statsValue={sentiment}
                />
            </div>
            <div className="header-title">
                <MdTextFormat className="header-icon"/>
                <h2>Text Analysis</h2>
            </div>
            <div className="sentences table">
                <WordCard
                    type="summary"
                    wordText="Summary"
                    wordSubtext="Extracts most important information from document"
                    sentiment={sentiment}
                    content={
                        <>{data['summary']}</>
                    }
                />
            </div>
            <div className="visual table">
                <VisualCard
                    visualText="Topic Modelling"
                    visualSubtext="Lists key words and topics in document"
                    content={
                        <>
                            <TagCloud
                                minSize={25}
                                maxSize={25}
                                tags={data["topics"]}
                                className="simple-cloud"
                                colorOptions={{ luminosity: 'dark'}}
                                style={{ width: '100%', textAlign: 'center' }}
                            />
                        </>
                    }
                />
                <VisualCard
                    visualText="Word Cloud"
                    visualSubtext="Visual depiction of words used in document"
                    content={
                        <>
                            <img
                            src={'data:image/png;base64,' + data['wordcloud']}
                            alt="wordcloud"
                            />
                        </>
                      }
                    />
            </div>
            <div className="header-title">
                <MdAnalytics className="header-icon"/>
                <h2>Text Classification</h2>
            </div>
            <div className="sentences table">
                <WordCard
                    type="sentiment-text"
                    wordText="Overall Text"
                    wordSubtext="Text is broken down into sentences and color coded by sentiment type"
                    content={data["sentiment_distribution"]}
                />
            </div>
            <div className="visual table">
                <VisualCard
                    visualText="Sentiment Sentence Distribution"
                    visualSubtext="Overall sentiment distribution of text by sentence"
                    content={
                        <>
                            <SentimentBarGraph 
                                data={data['sentiment_count']}
                                legend="no of sentences"
                                layout="vertical" />
                        </>
                      }
                /> 
                <VisualCard
                    visualText="Sentiment Score Distribution"
                    visualSubtext="Overall sentiment score distribution of text"
                    content={
                        <>
                            <SentimentBarGraph 
                                data={data['overall_score']}
                                legend="score"
                                layout="vertical" />
                        </>
                      }
                /> 
            </div>
        </div>
    )
}

export default Dashboard