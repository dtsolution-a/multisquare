import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import MarketingCallout from "../components/MarketingCallout";
import WhyChooseUs from "../components/WhyChooseUs";
import About from "../components/About";
import Leadership from "../components/Leadership";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <TrustBar />
      <Services />
      <MarketingCallout />
      <WhyChooseUs />
      <About />
      <Leadership />
      <Testimonials />
      <Contact />
    </>
  );
}
