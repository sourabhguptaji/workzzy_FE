import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import workzzyLogo from "../../assets/logo/logo.png"; // White logo
import signupIllustration from "../../assets/images/signupIllustration.svg";
import axios from "../../api/axiosInstance"; // Import axios
import Footer from "../Footer/Index";

const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: #f4f7fc;
  font-family: "Inter", sans-serif;
  position: relative;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Logo = styled.img`
  height: 40px;  // Adjust the size as needed
`;

const SignupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 900px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const IllustrationWrapper = styled.div`
  max-width: 400px;
  flex: 1;
  text-align: left;
  color: #333;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Illustration = styled.img`
  width: 100%;
  margin-bottom: 1rem;
`;

const PromoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  font-weight: 500;
`;

const SignupCard = styled(motion.div)`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Header = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Subheader = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  transition: 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #ff758c;
    box-shadow: 0 0 5px rgba(255, 117, 140, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #ff758c;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5a7a;
  }
`;

const FooterText = styled.p`
  font-size: 0.5rem;
  color: #555;
  margin-top: 1.5rem;
`;


const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate(); // To handle redirection after successful signup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Basic form validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Replace with your backend API endpoint
      const response = await axios.post("/api/auth/signup", formData);
      
      // On success, redirect user to login or dashboard page
      if (response.status === 201) {
        navigate("/", { state: {from: "signup", success: true }}); // Assuming you have a login page
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        // Handle known errors (e.g. validation errors)
        setError(err.response.data.message || "Something went wrong!");
      } else {
        // Handle network or unexpected errors
        setError("Network error, please try again later.");
      }
    }
  };

  return (
    <>
      <SignupContainer>
        <LogoWrapper>
          <Logo src={workzzyLogo} alt="Workzzy Logo" />
        </LogoWrapper>

        <SignupWrapper>
          <IllustrationWrapper>
            <Illustration src={signupIllustration} alt="Signup Illustration" />
            <PromoSection>
              <p>Join thousands of professionals simplifying their work-life with Workzzy. Don’t get left behind!</p>
            </PromoSection>
          </IllustrationWrapper>

          <SignupCard initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Header>Create Your Account</Header>
            <Subheader>Sign up to access all the features.</Subheader>

            {/* Display error if any */}
            {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

            <Form onSubmit={handleSubmit}>
              <Input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              <Input type="text" name="phone" placeholder="Enter your phone" value={formData.phone} onChange={handleChange} required />
              <Input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </SubmitButton>
            </Form>

            <FooterText>
              Already have an account? <Link to="/" state={{ from: "signup" }}>Log In</Link>
            </FooterText>
          </SignupCard>
        </SignupWrapper>

        <Footer />
      </SignupContainer>
    </>
  );
};

export default SignupPage;
