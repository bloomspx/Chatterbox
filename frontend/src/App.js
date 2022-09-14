import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Upload from "./pages/upload/Upload"
import Error from "./pages/error/Error"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/upload' element = {<Upload />}/>
        <Route path='*' element = {<Error />}/>
        <Route path="/" element={<Navigate to="/upload"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
