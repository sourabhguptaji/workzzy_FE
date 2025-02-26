import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import ReasonsSection from "./ReasonContainer";
import AboutUs from "./AboutUs";
import SignupPage from "./components/Signup/Index";
import Dashboard from "./components/dashboard/Index";
import CreatePost from "./components/CreatePost/Index";
import Profile from "./components/Profile/Index";
import HomepageDashboard from "./components/HomePageDashboard/Index";

function Home() {
  const joinWaitlistRef = useRef();
  return (
    <>
      <Navbar joinWaitlistRef={joinWaitlistRef} />
      <HeroSection joinWaitlistRef={joinWaitlistRef} />
      <ReasonsSection />
      <ServicesSection />
      <TestimonialsSection />
      <AboutUs />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<HomepageDashboard />} />
        <Route path="/dashboard/:category" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
