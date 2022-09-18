import "./textAnalysis.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import callApi from "../../components/callApi";

export default function TextAnalysis() {
  
  const location = useLocation();
  const [files, setFiles] = useState([]);
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        setLoading(true);
        setFiles(location.state);
        const response = await callApi("textanalysis", location.state[0])
        setData(response)
        setLoading(false);
      } catch(err) {
        setLoading(false);
      }
    };
      fetchData()
  }, [location]);

  // console.log(files[0]['text'])
  console.log(data)


  return  (
    <>
      <div className="ta-container">
        {loading && <Loader/>}
        {!loading && <div className='body'>
          <p>Work in Progress - TA Results</p>
          <p>{JSON.stringify(files)}</p>
          <p>"-------------------------"</p>
          <div className="data">{JSON.stringify(data["result"]["overall_sentiment"])}</div>
          <div className="data">{JSON.stringify(data["result"]["overall_score"])}</div>
          <div className="data">{JSON.stringify(data["result"]["sentiment_count"])}</div>
          <div className="data">{JSON.stringify(data["result"]["summary"])}</div>
          <div className="data">{JSON.stringify(data["result"]["wordcloud"])}</div>
        </div>}
      </div>
    </>
  )
}