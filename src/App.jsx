import { useState } from "react";
import useLenis from "./lib/useLenis";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import MarketingCallout from "./components/MarketingCallout";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Leadership from "./components/Leadership";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <TrustBar />
        <Services />
        <MarketingCallout />
        <WhyChooseUs />
        <About />
        <Leadership />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
