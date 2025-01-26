import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #111;
  color: white;
  padding: 2rem 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Gigsy. All Rights Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
