import "./home.css";
import ai from '../../images/ai.png';
import { useNavigate } from "react-router-dom"


const Home = () => {
    
    const navigate = useNavigate();
    const onNavigateToTTS = () => navigate(`/upload-videos`)
    const onNavigatetoTA = () => navigate(`/upload-text`)

    return (
        <div className="home-container">
            <div className="header-body">
                <div className="header-container">
                    <h1>Perform Speech Recognition and Text Analysis with Chatterbox</h1>
                </div>
                
                <div className="header-content">
                    <button type="button" onClick={onNavigateToTTS}>
                        Upload mp4 files to convert them from <b style={{textDecoration:"underline"}}>speech to text</b>
                    </button>
                    <button type="button" onClick={onNavigatetoTA}>
                        Upload text or pdf documents to perform <b style={{textDecoration:"underline"}}>text analysis</b>
                    </button>
                </div>
            </div>
            <div className="header-image">
                <img src={ai} alt="ai"/>
            </div>
        </div>
    )
}

export default Home