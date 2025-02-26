import React from "react";
import styled from "styled-components";
import { FaHome, FaUser, FaRegEdit } from "react-icons/fa";
import WorkzzyLogo from "../../assets/logo/logo.png"
import { useLocation, useNavigate } from "react-router-dom";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
//   border-radius: 12px;
//   position: fixed;
//   top: 10px;
  left: 50%;
//   transform: translateX(-50%);
//   max-width: 95%;
  z-index: 1000;
  
  @media (min-width: 768px) {
    // max-width: 80%;
    padding: 14px 30px;
  }
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  width:150px;
  color: white;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 14px;
  list-style: none;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.9);

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
  }

  @media (max-width: 500px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <NavbarContainer>
      <Logo><img style={{width:'150px'}} src={WorkzzyLogo} alt="Workzzy" /></Logo>
      <NavLinks>
        <NavItem onClick={() => navigate('/create-post')}>
          <FaRegEdit size={14} /> Create Post
        </NavItem>
        {
          location?.pathname === '/profile' 
          ?  <NavItem onClick={() => navigate('/dashboard')}>
          <FaHome size={14} />
        </NavItem>
          : <NavItem onClick={() => navigate('/profile')}>
          <FaUser size={14} />
        </NavItem>
        }
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
