import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const LoginContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f8fc;
  padding: 1rem;
`;

const LoginForm = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #f0f2f5;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;

  svg {
    color: #888;
    margin-right: 0.5rem;
  }

  input {
    border: none;
    outline: none;
    flex: 1;
    background: transparent;
    font-size: 1rem;
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  color: white;
  background: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background: #43a047;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-top: 1.5rem;

  a {
    color: #4caf50;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const location = useLocation()
  return (
    <LoginContainer>
      <LoginForm
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{location.state?.success ? 'Welcome Back!' : 'Welcome!'}</Title>
        <Subtitle>Log in to your account</Subtitle>

        <InputGroup>
          <FaUser />
          <input type="text" placeholder="Email or Username" />
        </InputGroup>

        <InputGroup>
          <FaLock />
          <input type="password" placeholder="Password" />
        </InputGroup>

        <LoginButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Log In
        </LoginButton>

        <FooterText>
          Don't have an account? <a href="/signup">Sign Up</a>
        </FooterText>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
