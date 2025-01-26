import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const AboutContainer = styled.section`
  padding: 4rem 2rem;
//   background-color: #f9f9f9;
  text-align: center;

  @media (min-width: 768px) {
    padding: 6rem 4rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  background: linear-gradient(180deg, #f74c60, #ffb74d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const StoryText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

const HighlightText = styled.span`
  font-weight: 700;
  color: #f74c60;
`;

const AboutUs = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          From Small Beginnings to Big Dreams: Our Journey to the MVP
        </Title>
        <StoryText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Like many others, we started with stable, full-time employment, climbing the corporate ladder. But the desire for freedom and flexibility led us to explore freelancing. While freelancing offered the independence we craved, it came with its own challenges—uncertainty, lack of consistency, and scattered opportunities.
        </StoryText>
        <StoryText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Frustrated by the gaps in both traditional employment and freelancing, we decided to create something better. It all started with a simple <HighlightText>WhatsApp group</HighlightText>, where we connected friends, neighbors, and local businesses to reliable workers. The group quickly grew into a thriving community of people helping each other with job opportunities and tasks.
        </StoryText>
        <StoryText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Seeing the impact of this small initiative, we knew it was time to take it to the next level. That’s why we’re launching our <HighlightText>Minimum Viable Product (MVP)</HighlightText>—a platform built to make hiring and finding work seamless, efficient, and accessible for everyone.
        </StoryText>
        <StoryText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Our mission is to empower individuals and businesses alike, creating a space where collaboration and success go hand in hand. Join us on this journey as we redefine how work gets done.
        </StoryText>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default AboutUs;
