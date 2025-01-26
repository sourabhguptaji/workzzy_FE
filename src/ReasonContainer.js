import React from "react";
import styled from "styled-components";
import { FaHandHoldingUsd, FaCashRegister, FaCheckCircle, FaTruck } from "react-icons/fa";

// Styled Components
const ReasonsContainer = styled.section`
  padding: 3rem 1.5rem;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #333;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    max-width: 900px;
    margin: 0 auto;
  }
`;

const ReasonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #f74c60;
`;

const ReasonText = styled.div`
  text-align: left;

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #222;
  }

  p {
    font-size: 0.9rem;
    color: #666;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const ReasonsSection = () => {
  return (
    <ReasonsContainer>
      <Title>Reasons Why Employers Choose Us</Title>
      <ReasonsGrid>
        <ReasonItem>
          <IconWrapper>
            <FaCashRegister />
          </IconWrapper>
          <ReasonText>
            <h3>No Platform Fee</h3>
            <p>Our platform is free of cost for employers. Focus on hiring without worrying about extra charges.</p>
          </ReasonText>
        </ReasonItem>
        <ReasonItem>
          <IconWrapper>
            <FaHandHoldingUsd />
          </IconWrapper>
          <ReasonText>
            <h3>Pay for Work Done</h3>
            <p>Only pay for the work completed, ensuring fair pricing for both employers and workers.</p>
          </ReasonText>
        </ReasonItem>
        <ReasonItem>
          <IconWrapper>
            <FaTruck />
          </IconWrapper>
          <ReasonText>
            <h3>Cash on Delivery Payment</h3>
            <p>Choose the flexibility of COD payment options to suit your convenience.</p>
          </ReasonText>
        </ReasonItem>
        <ReasonItem>
          <IconWrapper>
            <FaCheckCircle />
          </IconWrapper>
          <ReasonText>
            <h3>Work Assurance</h3>
            <p>Your money stays secure until the work is done and verified, ensuring peace of mind.</p>
          </ReasonText>
        </ReasonItem>
      </ReasonsGrid>
    </ReasonsContainer>
  );
};

export default ReasonsSection;
