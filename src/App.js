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
import JobDetail from "./components/JobDetail/Index";
import CreateEvent from "./components/CreateEvent/Index";
import EventDetail from "./components/EventDetail/Index";
import { PageViewTracker } from "./utils/pageTracker";
import JobApplications from "./components/JobDetail/JobApplication";
import AuthChecker from "./utils/AuthChecker";

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
      <PageViewTracker />
      <AuthChecker>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<HomepageDashboard />} />
        <Route path="/dashboard/:type" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail/:postId" element={<JobDetail />} />
        <Route path="/job/application/:postId" element={<JobApplications />} />
        <Route path="/detail-event/:eventId" element={<EventDetail />} />
        {/* Add more routes here as needed */}
      </Routes>
      </AuthChecker>
    </Router>
  );
}

export default App;
