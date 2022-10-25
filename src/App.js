import { BrowserRouter, Routes, Route} from "react-router-dom";
import UploadTA from "./pages/upload/UploadTA"
import UploadSTT from "./pages/upload/UploadSTT"
import SpeechToText from "./pages/speechToText/SpeechToText";
import TextAnalysis from "./pages/textAnalysis/TextAnalysis"
import Error from "./pages/error/Error"
import Home from "./pages/home/Home"
import Dashboard from "./pages/dashboard/Dashboard";
import Summary from "./pages/summary/Summary";
import Test from "./pages/test/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path='/upload-video' element = {<UploadSTT/>}/>
        <Route path='/upload-text' element = {<UploadTA/>}/>
        <Route path='/test' element = {<Test/>}/>
        <Route path='/text-analysis' element = {<TextAnalysis/>}/>
        <Route path='/speech-to-text' element = {<SpeechToText/>}/>
        <Route path='/summary' element = {<Summary/>}/>
        <Route path='*' element = {<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
