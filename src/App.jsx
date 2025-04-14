import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Loader from './Components/Loader/Loader';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import QR from './Components/Pages/Qr-code/QR';
import Todo from './Components/Pages/Todo-list/Todo';
import Fitness from './Components/Pages/Fitness/Fitness';
import Resume from './Components/Pages/ResumeAi/Resume';
import Refraser from './Components/Pages/Refraser/Rephraser';
import Mail from './Components/Pages/Mail/Mail';
import Rephraser from './Components/Pages/Refraser/Rephraser';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/qrcode-gen" element={<QR />} />
          <Route path="/todo-list" element={<Todo />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/resume-ai" element={<Resume />} />
          <Route path="/refraser-ai" element={<Rephraser />} />
          <Route path="/mail-ai" element={<Mail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;