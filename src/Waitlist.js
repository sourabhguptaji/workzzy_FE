import React from "react";
import styled from "styled-components";
// import { motion } from "framer-motion";
import JoinWaitlistPopup from "./JoinWaitlistPopup";

// Styled Components
const WaitlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
//   background-color: #f8f9fa;
  border-radius: 12px;
  margin: 2rem auto;
  max-width: 800px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-transform: uppercase;
//   background: linear-gradient(90deg, #f74c60, #ffb74d);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 2.0rem;
  }
`;
const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;



const WaitlistSection = ({joinWaitlistRef}) => {
  return (
    <>
    <WaitlistContainer>
      <Title>Be Your Own Boss</Title>
      <Subtitle>
        Take control of your career and work on your terms! Be your own boss and
        unlock your potential with flexible, on-demand opportunities. Don’t
        wait—join our waitlist today and be among the first to shape the future
        of freelancing.
      </Subtitle>
    <JoinWaitlistPopup joinWaitlistRef={joinWaitlistRef}/>
    </WaitlistContainer>
    </>
  );
};

export default WaitlistSection;
