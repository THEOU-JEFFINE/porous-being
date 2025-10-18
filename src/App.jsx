import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import News from './Pages/News';
import Projects from './Pages/Projects';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} /> {/* Home page */}
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
