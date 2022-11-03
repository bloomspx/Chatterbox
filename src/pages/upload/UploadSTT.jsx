import React, {useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import "./upload.css";
import Dropzone from 'react-dropzone';
import { TiDeleteOutline } from 'react-icons/ti';
import { DocumentVideo , DocumentSound} from 'grommet-icons';

const UploadSTT = (props) => {
  
  let navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map( (file, index) => {
      const reader = new FileReader();

      console.log("Reading file");
      reader.onload = function(e) {
        console.log(e.target);
        setFiles ((prevState) => [
          ...prevState,
          {id: index, 
           name: file.name, 
           video: e.target.result, 
           size: file.size},
        ])
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const handleFileType = (filename) => {
    const type = filename.substring(filename.lastIndexOf('.') + 1, filename.length)
    if (type === "mp4") {
      return (<DocumentVideo color='#5cb1c0'/>)
    } else if (type === "mp3"){
      return (<DocumentSound color='#c05c5c'/>)
    }
  }

  const deleteFile = (deletedFile) => {
    setFiles(files.filter((_, index) => index !== deletedFile));
  };

  const redirectFiles = () => {
    if (files.length !== 0) {
      navigate('/speech-to-text', {state:files, replace:false});
    } else {
      alert('No files uploaded');
    }
  }


  
  return  (
    <div className="upload-container">
          <div className="dropzone-container">
            <Dropzone
              onDrop={handleDrop}
              accept={{"video/*":['.mp4'], "audio/*":['.mp3']}}
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
                    {!isDragActive && <span>Drop file or click to select 📂</span>}
                    <div className="dropzone-footnote">
                        <p>Speech Analysis: mp4 or mp3 files only</p>
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
                        {handleFileType(file.name)}
                        <div className="uploaded-file-details">
                          <span>{file.name}</span>
                          <span className='subtext'>{(file.size / 1000000).toFixed(2)} MB</span>
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
              <button className="button" type="button" onClick={redirectFiles}> 
                Analyze Video
              </button>
            </div>
          </div>
    </div>
  )
}

export default UploadSTT