import { BrowserRouter, Routes, Route} from "react-router-dom";
import UploadTA from "./pages/upload/UploadTA"
import UploadTTS from "./pages/upload/UploadTTS"
import TextToSpeech from "./pages/textToSpeech/TextToSpeech"
import TextAnalysis from "./pages/textAnalysis/TextAnalysis"
import Error from "./pages/error/Error"
import Home from "./pages/home/Home"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/upload-videos' element = {<UploadTTS/>}/>
        <Route path='/upload-text' element = {<UploadTA/>}/>
        <Route path='/text-analysis' element = {<TextAnalysis/>}/>
        <Route path='/tts' element = {<TextToSpeech/>}/>
        <Route path='*' element = {<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
