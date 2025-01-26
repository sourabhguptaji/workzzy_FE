import React from "react";
import styled from "styled-components";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import HeroStandOut from './heroStandOut.svg'
import WaitlistSection from "./Waitlist";

// Styled Components
const HeroContainer = styled.section`
//   background-color:rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  padding: 2rem;
`;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-transform: uppercase;
  background: linear-gradient(90deg, #f74c60, #ffb74d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  color: #555;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HighlightText = styled.span`
  color: #f74c60;
  font-weight: 700;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: start;
    gap: 20px;
  }
`;

const HeroButton = styled(motion.button)`
  background-color: ${({ primary }) => (primary ? "#f74c60" : "#1e88e5")};
  color: white;
  font-size: 1rem;
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s ease;

  svg {
    margin-right: 8px;
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateY(-5px);
    background-color: ${({ primary }) => (primary ? "#f25d6d" : "#1565c0")};
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 15px 30px;
  }
`;

const IllustrationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 500px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));

    @media (max-width: 768px) {
      max-width: 300px;
    }
  }
`;


const HeroSection = () => {
  return (
    <>
    <HeroContainer>
      <HeroWrapper>
        {/* Left Content */}
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            >
            Find Jobs or Hire <HighlightText>On-Demand</HighlightText>
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
            A dedicated platform for <HighlightText>labor jobs</HighlightText>,
            <HighlightText> part-time work</HighlightText>, and{" "}
            <HighlightText>flexible gigs</HighlightText>. Empowering individuals
            and businesses to connect and collaborate seamlessly.
          </HeroSubtitle>
          <ButtonGroup>
            <HeroButton
              primary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
              <FaUserPlus /> Hire Talent
            </HeroButton>
            <HeroButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaSearch /> Find Gigs
            </HeroButton>
          </ButtonGroup>
        </HeroContent>

        {/* Right Illustration */}
        <IllustrationContainer>
          <motion.img
            src={HeroStandOut}
            alt="Hero Illustration"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            />
        </IllustrationContainer>
      </HeroWrapper>
  {/* Centered Waitlist Button */}
  <WaitlistSection />
  </HeroContainer>
            </>
  );
};

export default HeroSection;
