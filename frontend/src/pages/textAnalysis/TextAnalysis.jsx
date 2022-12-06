import "./textAnalysis.css";
import { useLocation, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Loader } from "../../components/Loader/Loader";
import callApi from "../../utils/callApi";
import Dashboard from "../dashboard/Dashboard";
import styled from "@emotion/styled";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { MdHome } from "react-icons/md";


export default function TextAnalysis() {
  
  let navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(location.state);
  const [fileNames, setFilenames] = useState([])
  const [currentFileName, setCurrentFileName] = useState()
  const [currentIndex, setCurrentIndex] = useState("#1")
  const [currentResult, setCurrentResult] = useState([])
  const [results, setResults] = useState([])
  const [timeTaken, setTimeTaken] = useState([])
  const [changeFiles, setChangeFiles] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  
  const StyledFormControl = styled(FormControl)(
    ` 
      background-color: rgba(255, 255, 255, 0.8);
    `
    );

  const handleChangeFileName = async(event) => {
    setLoading(true);
    setShowSummary(false);
    setCurrentFileName(event.target.value);
    setChangeFiles(true);
  }
    
  const downloadText = (result) => {
    const link = document.createElement('a');
    const { filename, summary, overall_sentiment, topics, ...data } = result;
    const savedData = convertText({filename, summary, overall_sentiment, topics})
    const blob = new Blob([savedData], {type: "text/plain"});
    link.href = URL.createObjectURL(blob);
    link.download = result["filename"] + '_results.txt';
    link.click();
  }

  const handleAllDownloads = () => {
    results.forEach((result) => {
      downloadText(result);
    })
  }

  const convertText = (obj) => {
    const result = []
    result.push("Filename: " + obj["filename"])
    result.push("Summary: " + obj["summary"])
    result.push("Sentiment: " + obj["overall_sentiment"])
    result.push("Topic Words: " + obj["topics"].map(function(item){ return item.value}))
    return result.join("\n")
  }

  const handleSummary = () => {
    if (results.length !== 0) {
      setShowSummary(!showSummary);
    }
  }

  const navigateHome  = () => {
    navigate('/');
  }
  
  useEffect(() => {
    const fetchFileResults = async () => {
      try { 
        setLoading(true);
        var startTime = performance.now()
        let promises = location.state.map((obj) => {
          return callApi("text-analysis", obj)
        });
        Promise.allSettled(promises)
          .then((results) => {
            const allResults = (results.filter(p => p.status === "fulfilled" ))
              .map(c=>c.value);
            setResults(allResults);
            setCurrentResult(allResults[0])
            setFilenames(allResults.map(f => f.filename))
            setCurrentFileName(allResults[0].filename)
            var endTime = performance.now()
            setTimeTaken(((endTime - startTime)/1000).toFixed(2))
            setLoading(false);
          })
      }
      catch(err) {
        setLoading(false);
      }
    };
    fetchFileResults()
  }, [files]);

  useEffect(() => {
    const fetchFileData = () => {
      if (changeFiles) {
        setLoading(true);
        setCurrentResult({})
        const newFile = results.find(f => f.filename === currentFileName)
        const newIndex = results.indexOf(newFile)
        setCurrentIndex("#" + (newIndex + 1))
        setCurrentResult(newFile);
        setChangeFiles(false)
        setLoading(false);
        };
      }
      fetchFileData()
    }, [changeFiles]);

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }
  
  // console.log(files)  
  // console.log(results)

  return  (
    <div className="ta-container">
        <div className='body'>
        {loading && results.length === 0 && <Loader/>}
        {!loading && results.length > 0 &&  <>
        <div className="dashboard-header">
          <div className="header">
            <MdHome className="header-icon" onClick={navigateHome}/>
            {!showSummary && <h1>Document Overview</h1>}
            {showSummary && <h1>Summary Overview</h1>}
          </div>
            <div className="header-container">
                {!showSummary && <>
                  <span className="header-text">Time: {timeTaken}s | Document:</span>
                  <StyledFormControl className="dropdown">
                      <Select className="menu"
                          value={currentFileName}
                          onChange={handleChangeFileName}
                          >
                      {fileNames.map((e) => (
                        <MenuItem className="menu"
                        key={e} 
                        value={e}>
                              {e}
                          </MenuItem>
                      ))}
                      </Select>
                  </StyledFormControl>
                </>}
                {!showSummary && <button className="summary button" type="button" onClick={handleSummary}>View Summary</button>}
                {showSummary && <button className="summary button" type="button" onClick={handleSummary}>View Documents</button>}
                <button className="button" type="button" onClick={handleAllDownloads}>Download All Results</button>
            </div>
        </div>
          {!loading && isNotEmpty(currentResult) && !showSummary && <>
            <Dashboard data={currentResult} id={currentIndex}/>
          </>}
          {!loading && isNotEmpty(results) && showSummary && <>
            <div className="dashboard-container">
                <>{results.map((e) => (
                    <SummaryCard 
                        key={e.filename}
                        data={e}/>
                ))}</>
            </div>
          </>}
        </>}
      </div>
    </div>
  )
}