import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer () {

const Footer = styled.div`
  margin-top: 4rem;
  padding: 1rem;
  text-align: center;
  width: 100%;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.6rem;
  a {
    color: #121212;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

    return (
        <Footer>
        <p>&copy; 2025 Workzzy. All Rights Reserved.</p>
        {/* <FooterLinks>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </FooterLinks> */}
      </Footer>
    )
}