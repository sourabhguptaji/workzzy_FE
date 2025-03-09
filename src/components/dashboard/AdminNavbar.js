import React, { useState } from "react";
import styled from "styled-components";
import { FaHome, FaUser, FaRegEdit, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import WorkzzyLogo from "../../assets/logo/logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  left: 50%;
  z-index: 1000;
  
  @media (min-width: 768px) {
    padding: 14px 30px;
  }
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  width: 150px;
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
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
  }

  @media (max-width: 500px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? "block" : "none")};
  list-style: none;
  padding: 10px 0;
  min-width: 150px;

  li {
    padding: 10px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: black;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {type} = useParams()
  console.log(type, "<==type")
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <NavbarContainer>
      <Logo>
        <img style={{ width: "150px" }} src={WorkzzyLogo} alt="Workzzy" />
      </Logo>
      <NavLinks>
        {!['/dashboard', '/create-event', '/create-post', '/detail-event'].includes(location.pathname) && !location.pathname?.startsWith('/detail-event')
        && <NavItem onClick={() => navigate(type === "Events" ? "/create-event":"/create-post", {state: {type}})}>
          <FaRegEdit size={14} /> Create
        </NavItem>}
        {location?.pathname === "/profile" ? (
          <NavItem onClick={() => navigate("/dashboard")}>
            <FaHome size={14} />
          </NavItem>
        ) : (
          <NavItem onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUser size={14} />
            <DropdownMenu open={dropdownOpen}>
              <li onClick={() => navigate("/profile")}>
                <FaUser size={14} /> Profile
              </li>
              <li onClick={() => navigate("/your-jobs")}>
                <FaBriefcase size={14} /> Your Jobs
              </li>
              <li onClick={() => navigate("/applied-jobs")}>
                <FaBriefcase size={14} /> Applied Jobs
              </li>
              <li onClick={() => {
                  navigate("/")
                  localStorage.clear()
                }}>
                <FaSignOutAlt size={14} /> Logout
              </li>
            </DropdownMenu>
          </NavItem>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;