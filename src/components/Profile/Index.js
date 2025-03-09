import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaBriefcase, FaCalendar, FaSignOutAlt, FaTicketAlt, FaBars } from 'react-icons/fa';
import Navbar from "../dashboard/AdminNavbar";
import Profile from './ProfileMenu';
import JobListing from './DraftJobListing';
import EventListing from './DraftEventListing';

const Container = styled.div`
  display: ${(props) => (props.isOpen ? '' : '')};
  height: ${(props) => (props.isOpen ? '90vh' : '')};
  margin: auto;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? '250px' : '60px')};
  background: white;
  padding: 20px;
  margin-top: -4rem;
  position: fixed;
  z-index: 99;
  display: flex;
  max-height: 90vh;
  height: 90vh;
  flex-direction: column;
  align-items: flex-start;
  transition: width 0.3s ease-in-out;
  border: 2px dashed #ddd;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 100%;
    z-index: 10;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  background: ${(props) => (props.active ? '#f0f0f0' : 'transparent')};
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [isOpen, setIsOpen] = useState(false);

  const sections = {
    Profile: <Profile />,
    Job: <JobListing />,
    Events: <EventListing />,
    // Ticket: <h2>Ticket Section</h2>,
  };

  return (
    <>
      <Navbar />

      <Container isOpen={isOpen}>
          <ToggleButton style={{alignItems: 'normal', marginTop: '1.5rem', marginLeft: '1rem'}} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '⤬' : <FaBars />}
          </ToggleButton>
          {isOpen && (
        <Sidebar isOpen={isOpen}>
          {/* Toggle button inside sidebar */}
          <ToggleButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '⤬' : <FaBars />}
          </ToggleButton>
            <Menu>
              {Object.keys(sections).map((item) => (
                <MenuItem key={item} active={activeSection === item} onClick={() => {
                  setActiveSection(item);
                  setIsOpen(false);
                }}>
                  {item === 'Profile' ? <FaUser /> :
                   item === 'Job' ? <FaBriefcase /> :
                   item === 'Events' ? <FaCalendar /> :
                   item === 'Ticket' ? <FaTicketAlt /> :
                   <FaSignOutAlt />}
                  {isOpen && item}
                </MenuItem>
              ))}
            </Menu>
        </Sidebar>
          )}

        <Content>
          {sections[activeSection]}
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
