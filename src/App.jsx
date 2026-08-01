import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import useLenis from "./lib/useLenis";
import ScrollManager from "./lib/ScrollManager";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <ScrollManager ready={ready} />
      <Header ready={ready} />
      <main>
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
