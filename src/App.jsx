import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import News from "./Pages/News";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Team from "./Pages/Team";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} /> {/* Home page */}
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
