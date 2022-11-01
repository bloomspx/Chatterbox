import "./summary.css"
import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import callApi from "../../utils/callApi";
import { MdHome } from "react-icons/md";

const Summary = () => {
    
    let navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])

    const navigateHome  = () => {
      navigate('/');
    }

    const downloadText = (result) => {
      const link = document.createElement('a');
      
      const { filename, summary, overall_sentiment, topics, ...data } = result;
      const savedData = convertText({filename, summary, overall_sentiment, topics})

      // const { filename, overall_sentiment, topics, ...data } = result;
      // const savedData = convertText({filename, overall_sentiment, topics})
      
      const blob = new Blob([savedData], {type: "text/plain"});
      link.href = URL.createObjectURL(blob);
      link.download = result["filename"] + '_results.txt';
      link.click();
    }

    const convertText = (obj) => {
      const result = []
      result.push("Filename: " + obj["filename"])
      result.push("Summary: " + obj["summary"])
      result.push("Sentiment: " + obj["overall_sentiment"])
      result.push("Topic Words: " + obj["topics"].map(function(item){ return item.value}))
      return result.join("\n")
    }
  
    const handleAllDownloads = () => {
      results.forEach((result) => {
        downloadText(result);
      })
    }

    useEffect(() => {
        const fetchFileResults = async () => {
            try { 
              setLoading(true);
              let promises = location.state.map((obj) => {
                return callApi("fetch-results", obj)
              });
              Promise.allSettled(promises)
                .then((results) => {
                  const allResults = (results.filter(p => p.status === "fulfilled" ))
                    .map(c=>c.value);
                  setResults(allResults);
                  setLoading(false);
                })
            }
            catch(err) {
              setLoading(false);
            }
        }

        fetchFileResults()
      }, []);

    console.log(results)

      
    return (
        <div className='body'>
            {loading && results.length === 0 && <Loader/>}
            {!loading && results.length > 0 &&  <>
            <div className="dashboard-header">
              <div className="header">
                <MdHome className="header-icon" onClick={navigateHome}/>
                <h1 className="summary-title">Summary Dashboard</h1>
              </div>
              <button className="button" type="button" onClick={handleAllDownloads}>Download All Results</button>
            </div>
            <div className="dashboard-container">
                <>{results.map((e) => (
                    <SummaryCard 
                        key={e.filename}
                        data={e}/>
                ))}</>
            </div>
            </>}
        </div>
    )
}

export default Summary