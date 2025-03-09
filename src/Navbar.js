import React from "react";
import styled from "styled-components";
import Logo from "./assets/logo/logo.png"

// Styled Components
const NavBar = styled.nav`
  background-color: #111;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: relative;
  z-index: 1000;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem 10rem;
  }

  & > div {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0;
  cursor: pointer;
  transition: color 0.3s;
  font-weight: 600;

  &:hover {
    color: #f74c60;
  }
`;

const JoinButton = styled.button`
  background-color: #f74c60;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c53949;
  }
`;

const MobileMenu = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #000000;
  padding: 1rem;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;

  & > button {
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Navbar = ({joinWaitlistRef}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleJoinWaitlistClick = () => {
    if (joinWaitlistRef.current) {
      joinWaitlistRef.current.click();
    }
  };
  return (
    <NavBar>
      <div><img style={{width:'150px', display: 'flex'}} src={Logo} alt="WorkZzy" /></div>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </MenuButton>
      <NavList>
        <NavItem>
          <JoinButton onClick={handleJoinWaitlistClick}>Login</JoinButton>
        </NavItem>
      </NavList>
      <MobileMenu isOpen={isOpen}>
        <JoinButton onClick={handleJoinWaitlistClick}>Login</JoinButton>
      </MobileMenu>
    </NavBar>
  );
};

export default Navbar;
