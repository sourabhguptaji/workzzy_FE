import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "./api/axiosInstance"; // Import axios for API calls
import { useToast } from "./context/Alert";

// Styled Components
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled(motion.div)`
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  width: 90vw;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const PopupHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #111;
  font-weight: bold;
`;

const PopupSubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.5;
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
  &:focus {
    outline: none;
    border-color: #ff758c;
    box-shadow: 0 0 5px rgba(255, 117, 140, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
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
  font-size: 0.9rem;
  color: #555;
  margin-top: 1.5rem;

  a {
    color: #ff758c;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  color: #d9534f;
  font-size: 0.9rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;

// Main Component
const JoinWaitlistPopup = ({ joinWaitlistRef }) => {
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
   const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiError: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", apiError: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous error messages
    setErrors({ ...errors, apiError: "" });

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      // Replace Firebase logic with API call
      const response = await axios.post("/api/auth/login", formData);

      if (response.data?.success) {
        setIsPopupOpen(false);
        setIsSuccess(true);
        setFormData({
          email: "",
          password: "",
        });
        localStorage.setItem('workzzy_token', response.data.token)

        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate("/dashboard");
        }, 500); // Wait for success message to appear before redirecting
      } else {
        // Handle unsuccessful login (e.g., show an error message)
        showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast(error?.response?.data?.message  || "Something went wrong! please try again later", "error");
    }
  };

  const handleOverlayClick = (e) => {
    // Close the popup only if the overlay is clicked, not the popup itself
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
      setIsSuccess(false);
    }
  };

  return (
    <div>
      {/* Join Waitlist Button */}
      <motion.button
        ref={joinWaitlistRef}
        onClick={() => setIsPopupOpen(true)}
        style={{
          backgroundColor: "#f74c60",
          color: "white",
          fontSize: "1.2rem",
          padding: "12px 30px",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Log In
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <Overlay
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PopupContainer
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <PopupHeader>Welcome!</PopupHeader>
              <PopupSubtitle>
                Log in to your account to explore and manage your dashboard.
              </PopupSubtitle>

              <Form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}

                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log In
                </SubmitButton>

                {errors.apiError && <ErrorText>{errors.apiError}</ErrorText>}
              </Form>

              <FooterText>
                Don't have an account? <a href="/signup">Sign Up</a>
              </FooterText>
            </PopupContainer>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinWaitlistPopup;
