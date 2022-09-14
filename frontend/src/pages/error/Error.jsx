import "./error.css"

const Error = () => {
    
    return (
        <div className="error-container">
            <img src={require('../../images/404.png')} alt="Error" />
            <h2 className="wordstyle">Upload Failed</h2>
        </div>
    )
}
    
export default Error