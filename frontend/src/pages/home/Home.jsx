import "./home.css";
import nlp from '../../images/nlp.png';
import { useNavigate } from "react-router-dom"


const Home = () => {
    
    const navigate = useNavigate();
    const onNavigateToSTT = () => navigate(`/upload-video`)
    const onNavigatetoTA = () => navigate(`/upload-text`)

    return (
        <div className="home-container">
            <div className="header-body">
                <div className="header-container">
                    <h1>Perform Speech Recognition & Text Analysis with Chatterbox</h1>
                </div>
                
                <div className="header-content">
                    <button type="button" onClick={onNavigateToSTT}>
                        Upload mp3 or mp4 files to convert them from <span className="title">speech to text</span>
                    </button>
                    <button type="button" onClick={onNavigatetoTA}>
                        Upload text or pdf documents to perform <span className="title">text analysis</span>
                    </button>
                </div>
            </div>
            <div className="header-image">
                <img src={nlp} alt="nlp"/>
            </div>
        </div>
    )
}

export default Home