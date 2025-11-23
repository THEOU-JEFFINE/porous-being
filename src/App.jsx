import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import News from "./Pages/News";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleLandingComplete = () => {
    setShowLanding(false);
    sessionStorage.setItem('hasSeenLanding', 'true');
  };

  return (
    <Router>
      {showLanding && <Landing onComplete={handleLandingComplete} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} /> {/* Home page */}
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
