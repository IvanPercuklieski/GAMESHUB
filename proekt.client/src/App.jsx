import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import GameCard from './Components/GameCard'
import GameUpload from './Pages/GameUpload'
import GamePage from './Pages/GamePage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userlogin" element={< LoginPage />} />
                <Route path="/userregister" element={<RegisterPage />} />
                <Route path="/gameupload" element={<GameUpload />} />
                <Route path="/gamepage" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;