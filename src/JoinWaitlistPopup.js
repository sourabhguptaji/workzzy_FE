import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";
// Styled Components


const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #f74c60;
  font-size: 1.5rem;
  cursor: pointer;
  // transition: all 0.3s ease;

  &:hover {
    color: #d9534f;
  }
`;

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
  padding: 2rem;
  border-radius: 12px;
  width: 90vw;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const PopupHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #111;
`;

const PopupSubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  &:focus {
    outline: none;
    border-color: #f74c60;
  }
`;

const Textarea = styled.textarea`
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #f74c60;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #f74c60;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f25d6d;
  }
`;
const WaitlistButton = styled(motion.button)`
  background-color: #f74c60;
  color: white;
  font-size: 1.2rem;
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: #f25d6d;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 25px;
  }
`;

const SuccessPopup = styled.div`
  text-align: center;
  color: #111;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    color: #4caf50;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

// Main Component
const JoinWaitlistPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // Save form data to Firestore
    await addDoc(collection(db, "waitlist"), {
      email: formData.email,
      phone: formData.phone,
      feedback: formData.feedback,
      timestamp: new Date(),
    });
    setIsPopupOpen(false);
    setIsSuccess(true);
    setFormData({
      email: "",
      phone: "",
      feedback: "",
    })
    setTimeout(() => setIsSuccess(false), 3000); // Auto-hide success message after 3 seconds
  } catch (error) {
    console.error("Error saving data to Firestore:", error);
  }
  };

  const handleOverlayClick = (e) => {
    // Close the popup only if the overlay is clicked, not the popup itself
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
      setIsSuccess(false)
    }
  };

  return (
    <div>
      {/* Join Waitlist Button */}
      <WaitlistButton onClick={() => setIsPopupOpen(true)}>
        Join Waitlist
      </WaitlistButton>

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

              <PopupHeader>Join Waitlist</PopupHeader>

              <PopupSubtitle>
                Be the first to know! Provide your details and tell us what
                features you’re excited about.
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
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="feedback"
                  placeholder="What features are you looking for?"
                  value={formData.feedback}
                  onChange={handleChange}
                />
                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </SubmitButton>
              </Form>
            </PopupContainer>
          </Overlay>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccess && (
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
              <SuccessPopup>
                <h3>Thank You!</h3>
                <p>
                  Your details have been submitted successfully. We’ll keep you
                  updated!
                </p>
              </SuccessPopup>
            </PopupContainer>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinWaitlistPopup;
