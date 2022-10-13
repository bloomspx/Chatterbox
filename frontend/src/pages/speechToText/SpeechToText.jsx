import "./speechToText.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import FormControl from '@mui/material/FormControl';
import callSTT from "../../utils/callSTT";
import styled from "@emotion/styled";
import ListCard from "../../components/ListCard/ListCard";

export default function SpeechToText() {
  
  const location = useLocation();
  const [files, setFiles] = useState(location.state);
  const [fileNames, setFilenames] = useState(files.map(f => f.name))
  const [currentFileName, setCurrentFileName] = useState(fileNames[0])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false);

  const StyledFormControl = styled(FormControl)(
    `background-color: rgba(255, 255, 255, 0.8)`
  );

  function checkfile(results) {
    const sfileNames = []
    for (let i=0; i<fileNames.length; i++){
      if (results[i]['result'] !== "")
        sfileNames.push(fileNames[i])
    }
    return sfileNames
  }


  useEffect(() => {
    const fetchData = () => {
      try { 
        setLoading(true);
        let promises = location.state.map((obj) => {
          return callSTT("speech2text", obj);
        });

        Promise.all(promises). then(function(results){
          setResults(results);
          const sfileNames = checkfile(results);
          setFilenames(sfileNames)
          //console.log("results: ", results)
          if (results.length == fileNames.length){
            setLoading(false);
          }

        })
      }
      catch(err) {
        setLoading(false);
      }

      

    };
      fetchData();
  }, [location]);

  // console.log(files[0])
  console.log("setResults: ", results)
  console.log("fileNames: ", fileNames)

  function download(content, fileName, contentType){
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
   }
   
  function onDownload() {
    for (let i=0; i<results.length; i++){
      download(JSON.stringify(results[i]['result']), fileNames[i]+".txt", "text/plain");
    }

  }

  
  return  (
      <div className="tts-container">
        <div className='body'>
        <div className="dashboard-header">
            <h1>Chatterbox Dashboard</h1>
        </div>
        {loading &&  results.length === 0 && <Loader/>}
        {!loading &&  results.length > 0 &&
        <div className='dashboard-container'>
          <div className="tts-header">
            <h2>Speech-To-Text</h2>
            <button className = "download-button" type = "button" onClick= {onDownload} >Download as text</button>
          </div>
            <div className="visuals table"> 
            <ListCard
                  type="stt"
                  listText="Overall Result"
                  listSubtext="The following files has been transcribed into text"
                  content={fileNames}
                />
            </div>
        </div>}
        </div>
      </div>
  )
}