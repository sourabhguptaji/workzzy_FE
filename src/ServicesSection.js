import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import teamIcon from './team.svg'

// Styled Components
const ServicesSectionContainer = styled.section`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 1rem 1.5rem;
//   background-color: #f9f9f9;
  min-height: 90vh;
  width: 80%;
  margin: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 2rem;
  }
`;

const IllustrationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  img {
    width: 40%;
    max-width: 400px;
    min-width: 250px;
    padding-top: 30px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));

    @media (min-width: 768px) {
      margin-bottom: 0;
      width: 100%;
      max-width: 500px;
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h2`
 font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-transform: uppercase;
  background: linear-gradient(90deg, #f74c60, #ffb74d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

// const SubTitle = styled.h2`
//   font-size: 2.5rem;
//   margin-bottom: 3rem;
//   color: #333;
//   margin-top: 30px;
//   text-align: center;
// `;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ServicesList = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

const ServiceItem = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.5;
  }
`;

const ServicesSection = () => {
  return (
    <>
    {/* <SubTitle>Our Services</SubTitle> */}
    <ServicesSectionContainer>
      {/* Illustration */}
      <IllustrationContainer>
        <motion.img
          src={teamIcon}
          alt="Services Illustration"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          />
      </IllustrationContainer>

      {/* Text Content */}
      <ContentWrapper>
        <Title>Empowering Your Work Journey</Title>
        <Description>
          Whether you're looking for skilled labor, part-time opportunities, or
          a team to get the job done, we've got you covered. Join our platform
          to discover flexible solutions tailored for everyone.
        </Description>

        {/* Services List */}
        <ServicesList>
          <ServiceItem>
            <h4>Flexible Work Opportunities</h4>
            <p>
              Connect with part-time gigs and find work that fits your schedule,
              allowing you to balance life and earnings seamlessly.
            </p>
          </ServiceItem>
          <ServiceItem>
            <h4>Skilled Labor Solutions</h4>
            <p>
              Access experienced laborers and professionals for your projects.
              Hire reliable talent in just a few clicks.
            </p>
          </ServiceItem>
          <ServiceItem>
            <h4>Quick Gig Connections</h4>
            <p>
              Browse on-demand jobs and get started immediately. Perfect for
              workers seeking short-term, high-impact roles.
            </p>
          </ServiceItem>
          <ServiceItem>
            <h4>Seamless Collaboration</h4>
            <p>
              Build teams effortlessly. Whether you're an entrepreneur or a
              business owner, collaborate effectively with the right people.
            </p>
          </ServiceItem>
        </ServicesList>
      </ContentWrapper>
 
    </ServicesSectionContainer>
          </>
  );
};

export default ServicesSection;
