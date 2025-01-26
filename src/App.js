import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import ReasonsSection from "./ReasonContainer";
import AboutUs from "./AboutUs";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <HeroSection />
      <ReasonsSection />
      <ServicesSection />
      <TestimonialsSection />
      <AboutUs />
      <Footer />
    </>
  );
}

export default App;
