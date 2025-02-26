import React from 'react';
import styled from 'styled-components';
import Navbar from '../dashboard/AdminNavbar';
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaTicketAlt, FaTools, FaCar, FaUtensils, FaShoppingCart, FaUsers, FaHeart, FaMusic, FaFilm, FaPaintBrush, FaDumbbell, FaLaptop, FaGraduationCap, FaHome, FaBaby, FaPaw, FaBook, FaHospital } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bussiness_deal from '../../assets/images/bussiness_deal.svg'
import Footer from '../Footer/Index';

const categories = [
  { icon: <FaBriefcase />, name: 'Jobs' , live: true},
  { icon: <FaCalendarAlt />, name: 'Local Events' , live: true},
  { icon: <FaTicketAlt />, name: 'Sell Tickets' , live: true},
  { icon: <FaTools />, name: 'Services' , live: false},
  { icon: <FaUtensils />, name: 'Food & Beverage' , live: false},
  // { icon: <FaCar />, name: 'Automotive' , live: false},
  // { icon: <FaShoppingCart />, name: 'Shopping' , live: false},
  // { icon: <FaUsers />, name: 'Community' , live: false},
  // { icon: <FaHeart />, name: 'Health & Wellness' , live: false},
  // { icon: <FaMusic />, name: 'Music' , live: false},
  // { icon: <FaFilm />, name: 'Entertainment' , live: false},
  { icon: <FaPaintBrush />, name: 'Art & Design' , live: false},
  // { icon: <FaDumbbell />, name: 'Fitness' , live: false},
  // { icon: <FaLaptop />, name: 'Technology' , live: false},
  // { icon: <FaGraduationCap />, name: 'Education' , live: false},
  // { icon: <FaHome />, name: 'Real Estate' , live: false},
  // { icon: <FaBaby />, name: 'Childcare' , live: false},
  // { icon: <FaPaw />, name: 'Pet Services' , live: false},
  // { icon: <FaBook />, name: 'Books & Literature' , live: false},
  // { icon: <FaHospital />, name: 'Medical Services', live: false }
];

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 12px;
  padding-top: 20px;
  text-align: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 30px;
  justify-content: center;
  padding-top: 28px;

   @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Stack the boxes on smaller screens */
  }
`;

const CategoryCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  font-size: 18px;
  background: #fff;
  height: 10rem;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(247, 76, 96, 0.5);
  }

  svg {
    font-size: 32px;
    margin-bottom: 10px;
    color: rgb(10, 10, 10);
  }
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 8px;
  right: -24px;
  background: linear-gradient(45deg,rgba(255, 65, 109, 0.72),rgba(255, 75, 43, 0.75));
  color: white;
  font-size: 7px;
  font-weight: bold;
  padding: 5px 25px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  transform: rotate(30deg);
  text-transform: uppercase;
`;

const IllustrationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 5rem;

  img {
    width: 100%;
    max-width: 250px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));

    @media (max-width: 768px) {
      max-width: 300px;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }

`;

const HomePageDashboard = () => {
    const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container>
        <h1>Explore Sections</h1>
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={index} onClick={() => category.live && navigate(`/dashboard/${category?.name}`)}>
              {category.icon}
              <span>{category.name}</span>
              {!category.live && <ComingSoonBadge>Coming Soon</ComingSoonBadge>}
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Container>
      <IllustrationContainer>
          <motion.img
            src={bussiness_deal}
            alt="Hero Illustration"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            />
        </IllustrationContainer>
        <Footer />
    </>
  );
};

export default HomePageDashboard;
