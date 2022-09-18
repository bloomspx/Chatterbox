import React, {useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import "./upload.css";
import Dropzone from 'react-dropzone';
import { TiDeleteOutline } from 'react-icons/ti';
import { DocumentCsv, DocumentPdf, DocumentTxt } from 'grommet-icons';

const UploadTA = (props) => {
  
  // const { files, setFiles, uploadFiles, deleteFile } = props;
  let navigate = useNavigate();
  const [files, setFiles] = useState([]);
  
  // const lists = []
  // const lists = acceptedFiles.map((list) => (
  //   <li key={list.path}>
  //     {list.path} - {list.size} bytes
  //   </li>

  // const handleDrop = acceptedFiles => {
  //   setFileNames(acceptedFiles.map(file => file.path));
  //   console.log(fileNames)
  // } ));
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map( (file, index) => {
      const reader = new FileReader();

      reader.onload = function(e) {
        console.log(e.target)
        setFiles ((prevState) => [
          ...prevState,
          {id: index, 
           name: file.name, 
           text: e.target.result, 
           size: file.size},
        ])
      };
      reader.readAsText(file)
      return file;
    });
  }, []);

  const handleFileType = (filename) => {
    const type = filename.substring(filename.lastIndexOf('.') + 1, filename.length)
    if (type === "pdf") {
      return (<DocumentPdf/>)
    } else if (type === "txt"){
      return (<DocumentTxt/>)
    } else {
      return (<DocumentCsv/>)
    }
  }

  const deleteFile = (deletedFile) => {
    setFiles(files.filter((_, index) => index !== deletedFile));
  };

  const redirectFiles = () => {
    if (files.length !== 0) {
      navigate('/text-analysis', {state:files, replace:false});
    } else {
      alert('No files uploaded');
    }
  }

  console.log(files)

  
  return  (
    <div className="upload-container">
          <div className="dropzone-container">
            <Dropzone
              onDrop={handleDrop}
              accept={{"text/*":['.csv', '.txt'], 'application/pdf':['.pdf']}}
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
                        <span>Only csv, pdf and txt files are accepted</span>
                    </div>
                </div>
                );
            }}
            </Dropzone>
          </div>
          <div className="upload-body">
              <h1>Uploaded Files</h1>
              <span>{files.length} Files</span>
              <div className="files-parent-container">
                <div className="files-child-container">
                  {files.map((file, index) => {
                    return (
                      <div className="uploaded-file-container" key={index}>
                        <div className="uploaded-file-details">
                            {handleFileType(file.name)}
                            <span>{file.name}</span>
                            <span className='subtext'>{(file.size / 1000).toFixed(2)}KB</span>
                        </div>
                        <div className="delete-uploaded-file">
                          <TiDeleteOutline
                            size={28}
                            color="red"
                            onClick={() => deleteFile(index)}
                          />
                        </div>
                      </div>);
                  })}
                </div>
              </div>
              <button className="upload-button" type="button" onClick={redirectFiles}> 
                Analyze Text
              </button>
          </div>
    </div>
  )
}

export default UploadTA