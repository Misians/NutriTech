// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css'; // Or wherever your global CSS is
import Patients from './pages/Patients';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="app-container">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/login" element={<Login />} />


          {/* Optional: Add a 404 Not Found page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;