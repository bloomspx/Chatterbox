import { ProgressBar } from 'react-loader-spinner' 
import "./loader.css"

export const Loader = () => (
    <div className="loader-container">
        <ProgressBar
        height="100"
        width="100"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#FFF'
        barColor = '#FFF'
        />
    </div>
);