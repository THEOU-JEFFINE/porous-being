import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import News from "./Pages/News";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleLandingComplete = () => {
    setShowLanding(false);
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        {showLanding && <Landing onComplete={handleLandingComplete} />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Projects />} /> {/* Home page */}
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* Redirect all undefined routes to home */}
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
