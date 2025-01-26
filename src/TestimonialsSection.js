import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import smiley from './smiley.svg'

// Styled Components
const TestimonialsContainer = styled.section`
  padding: 5rem 2rem;
//   background-color: #f9f9f9;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
`;

const IllustrationWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto 3rem;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.2));
  }
`;

const TestimonialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    gap: 3rem;
  }
`;

const Testimonial = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 3px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  background: #fff;
  max-width: 800px;
  margin: 0 auto;
  text-align: left;

  &:hover {
    border-color: #1e88e5;
    transition: border-color 0.3s ease;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  font-style: italic;
  flex: 1;
`;

const Author = styled.strong`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

const TestimonialsSection = () => {
  return (
    <TestimonialsContainer>
      <Title>What Our Clients Say</Title>
      <IllustrationWrapper>
        <img
          src={smiley}
          alt="Illustration"
        />
      </IllustrationWrapper>
      <TestimonialWrapper>
        {/* Testimonial 1 */}
        <Testimonial
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <QuoteText>
            "I’ve been using their WhatsApp group to find flexible gig workers,
             and it’s been incredibly efficient. With the MVP coming soon,
              I’m confident this platform will make the process even smoother.
               Great initiative for both businesses and job seekers!"
          </QuoteText>
          <Author>- Rohit K.</Author>
        </Testimonial>

        {/* Testimonial 2 */}
        <Testimonial
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <QuoteText>
          "Running a warehouse means constant deadlines, and sometimes I need extra help at the last minute. I posted my requirement in their WhatsApp group, and within 20 minutes, I had multiple profiles to choose from. The worker showed up the same day, and the process couldn’t have been smoother!"
          </QuoteText>
          <Author>- Amit P.</Author>
        </Testimonial>

        <Testimonial
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <QuoteText>
          "One of my neighbors told me about their WhatsApp group for quick staffing. I needed last-minute help for my restaurant over the weekend, so I decided to give it a try. A quick post in the group brought in a few reliable profiles, and I hired Priya within minutes. The process was smooth, efficient, and saved my day!"
          </QuoteText>
          <Author>- Dolly D.</Author>
        </Testimonial>
      </TestimonialWrapper>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
