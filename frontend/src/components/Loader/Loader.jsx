import { ProgressBar } from 'react-loader-spinner' 
import "./loader.css"

export const Loader = () => (
    <div className="loader-container">
        <span>Your data is currently being processed...</span>
        <ProgressBar
        height="100"
        width="100"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#363949'
        barColor = '#363949'
        />
    </div>
);