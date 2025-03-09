import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import workzzyLogo from "../../assets/logo/logo.png";
import signupIllustration from "../../assets/images/signupIllustration.svg";

const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #121212;
  padding: 2rem;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Illustration = styled.img`
  max-width: 400px;
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SignupCard = styled(motion.div)`
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 1.5rem;
`;

const Header = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const Subheader = styled.p`
  font-size: 1rem;
  color: #bbb;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #333;
  background: #222;
  color: #fff;
  border-radius: 6px;
  width: 100%;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 1.5rem;

  a {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <SignupContainer>
      <ContentWrapper>
        <Illustration src={signupIllustration} alt="Signup Illustration" />
        <SignupCard initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Logo src={workzzyLogo} alt="Workzzy Logo" />
          <Header>Create Your Account</Header>
          <Subheader>Sign up to access all the features.</Subheader>
          <Form onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            <Input type="text" name="phone" placeholder="Enter your phone" value={formData.phone} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </Form>
          <FooterText>
            Already have an account? <Link to="/" state={{ from: "signup" }}>Log In</Link>
          </FooterText>
        </SignupCard>
      </ContentWrapper>
    </SignupContainer>
  );
};

export default SignupPage;
