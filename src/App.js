import React, { useRef } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import ReasonsSection from "./ReasonContainer";
import AboutUs from "./AboutUs";

function App() {
  const joinWaitlistRef = useRef();
  return (
    <>
      <GlobalStyle />
      <Navbar joinWaitlistRef={joinWaitlistRef}/>
      <HeroSection joinWaitlistRef={joinWaitlistRef}/>
      <ReasonsSection />
      <ServicesSection />
      <TestimonialsSection />
      <AboutUs />
      <Footer />
    </>
  );
}

export default App;
