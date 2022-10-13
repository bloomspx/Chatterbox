import React, {useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import "./upload.css";
import Dropzone from 'react-dropzone';
import { TiDeleteOutline } from 'react-icons/ti';
import { DocumentPdf, DocumentStore, DocumentTxt } from 'grommet-icons';

const UploadTA = () => {
  
  let navigate = useNavigate();
  const [files, setFiles] = useState([]);
  
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map( (file, index) => {
      const reader = new FileReader();

      reader.onload = function(e) {
        const filename = file.name
        setFiles ((prevState) => [
          ...prevState,
          {id: index, 
           name: filename, 
           type: filename.substring(filename.lastIndexOf('.') + 1, filename.length),
           data: e.target.result, 
           size: file.size},
        ])
      };
      reader.readAsDataURL(file)
      return file;
    });
  }, []);

  const handleFileType = (type) => {
    if (type === "pdf") {
      return (<DocumentPdf color='#c05c5c'/>)
    } else if (type === "txt"){
      return (<DocumentTxt color='#5cb1c0'/>)
    } else if (type === "json") {
      return (<DocumentStore color='#5cc069'/>)
    }
  }

  const deleteFile = (deletedFile) => {
    setFiles(files.filter((_, index) => index !== deletedFile));
  };

  const analyzeText = () => {
    const textFiles = files.filter((file, i) => file.type !== "json");
    if (textFiles.length !== 0) {
      navigate('/text-analysis', {state:textFiles, replace:false});
    } else {
      alert('No pdf or txt files uploaded');
    }
  }

  const generateSummary = () => {
    const jsonFiles = files.filter((file, i) => file.type === "json");
    if (jsonFiles.length !== 0) {
      navigate('/summary', {state:jsonFiles, replace:false});
    } else {
      alert('No json files uploaded');
    }
  }

  // console.log(files)
  
  return  (
    <div className="upload-container">
          <div className="dropzone-container">
            <Dropzone
              onDrop={handleDrop}
              accept={{"text/plain":['.txt'], 'application/pdf':['.pdf'], 'application/json':['.json']}}
            >
            {({
                getRootProps,
                getInputProps,
                isDragAccept,
                isDragActive,
                isDragReject,
            }) => {
                const acceptClass = isDragAccept ? 'acceptStyle' : '';
                const rejectClass = isDragReject ? 'rejectStyle' : '';
                const activeClass = isDragActive ? 'activeStyle' : '';
                
                return (
                <div
                    {...getRootProps({
                    className: `dropzone ${acceptClass} ${rejectClass} ${activeClass}`,
                    })}
                >
                    <input {...getInputProps()} />
                    {isDragAccept && <span>All files will be accepted</span>}
                    {isDragReject && <span>Some files will be rejected</span>}
                    {!isDragActive && <span>Drop files or click to select 📂</span>}
                    <div className="dropzone-footnote">
                        <p>Text Analysis: pdf or txt files only</p>
                        <p>Summary: json files only</p>
                    </div>
                </div>
                );
            }}
            </Dropzone>
          </div>
          <div className="upload-body">
            <div className='upload-header'>
              <h1>Uploaded Files</h1>
              <span>{files.length} Files</span>
            </div>
            <hr className='divider'/>
            <div className="files-parent-container">
              <div className="files-child-container">
                {files.map((file, index) => {
                  return (
                    <div className="uploaded-file-container" key={index}>
                      <div className='file-information'>
                        {handleFileType(file.type)}
                        <div className="uploaded-file-details">
                          <span className='filename'>{file.name}</span>
                          <span className='subtext'>{(file.size / 1000).toFixed(2)}KB</span>
                        </div>
                       </div>
                      <div className="delete-uploaded-file">
                        <TiDeleteOutline
                          size={26}
                          color="#f13232"
                          onClick={() => deleteFile(index)}
                        />
                      </div>
                    </div>);
                })}
              </div>
            </div>
            <div className="upload-buttons-container">
              <button className="button" type="button" onClick={analyzeText}> 
                Analyze Text
              </button>
              <button className="summary button" type="button" onClick={generateSummary}> 
                Generate Summary
              </button>
            </div>
          </div>
    </div>
  )
}

export default UploadTA