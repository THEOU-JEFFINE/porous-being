import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import News from "./Pages/News";
import Projects from "./Pages/Projects";
import About from "./Pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} /> {/* Home page */}
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
