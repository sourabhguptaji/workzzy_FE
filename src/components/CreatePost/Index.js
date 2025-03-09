import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import DOMPurify from "dompurify";
import {
  FaTag,
  FaMapMarkerAlt,
  FaUser,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Navbar from "../dashboard/AdminNavbar";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/Alert";
import Footer from "../../Footer";



export const themeColors = {
  primary: "#1A1A2E",
  secondary: "#16213E",
  accent: "#0F3460",
  background: "#EAEAEA",
  textPrimary: "#1A1A2E",
  textSecondary: "#666",
  border: "#D3D3D3",
};

export const RadioWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${themeColors.textPrimary};
  cursor: pointer;
`;

export const RadioInput = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  accent-color: ${themeColors.primary};
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
`;


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 40px;
  background-color: ${themeColors.background};
  font-family: "Poppins", sans-serif;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  background: #fff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 40px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const FormHeader = styled.h2`
  font-size: 26px;
  color: ${themeColors.textPrimary};
  margin-bottom: 25px;
  font-weight: 700;
  text-align: center;
`;

export const FormField = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

export const Label = styled.label`
  font-size: 16px;
  color: ${themeColors.textPrimary};
  font-weight: 500;
  display: block;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 2px solid ${themeColors.border};
  border-radius: 8px;
  background-color: #fff;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: ${themeColors.accent};
    outline: none;
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 2px solid ${themeColors.border};
  border-radius: 8px;
  background-color: #fff;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: ${themeColors.accent};
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 14px 20px;
  background: linear-gradient(135deg, ${themeColors.primary}, ${themeColors.accent});
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${themeColors.secondary};
  }
`;


const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const CreatePost = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [budgetType, setBudgetType] = useState("fixed");
  const [budget, setBudget] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    address: "",
    budget: "",
    contact: "",
  });

  const createPostApi = async (postData) => {
    try {
      const response = await axiosInstance.post("/api/post/create", postData);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const submitContactApi = async (contactData) => {
    try {
        const postId = localStorage.getItem('postId')
      const response = await axiosInstance.put(
        `/api/post/contact/${postId}`,
        contactData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting contact info:", error);
      throw error;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newError = { ...error };

    if (!title) {
      newError.title = "Title is required";
      valid = false;
    }
    if (!description) {
      newError.description = "Description is required";
      valid = false;
    }
    if (!category) {
      newError.category = "Category is required";
      valid = false;
    }
    if (!city) {
      newError.city = "City is required";
      valid = false;
    }
    if (!address) {
      newError.address = "Address is required";
      valid = false;
    }

    if (budgetType === "fixed" && !budget) {
      newError.budget = "Please enter a fixed budget";
      valid = false;
    }
    if (budgetType === "range" && (!budgetMin || !budgetMax)) {
      newError.budget = "Please enter both min and max budgets";
      valid = false;
    }
    if (budgetType === "range" && Number(budgetMin) > Number(budgetMax)) {
      newError.budget = "Min budget cannot be higher than max budget";
      valid = false;
    }
    if (
      isNaN(budget) ||
      (budgetType === "range" && (isNaN(budgetMin) || isNaN(budgetMax)))
    ) {
      newError.budget = "Please enter valid numeric values for the budget";
      valid = false;
    }

    setError(newError);
    if (valid) {
      const postData = {
        title,
        description: DOMPurify.sanitize(description),
        category,
        city,
        address,
        budgetType,
        budget,
        budgetMin,
        budgetMax,
      };
      try {
        const postResponse = await createPostApi(postData);
        if (postResponse.success) {
          localStorage.setItem("postId", postResponse?.post?._id);
          // setCurrentStep(2); // Go to the next step (contact info)
          showToast("Your job has been saved in draft successfully!", "success")
          navigate('/profile')
        }
      } catch (error) {
        console.log(error?.message);
        showToast(error?.message, "error")
      }
    }
  };

  // const handleContactSubmit = async (e) => {
  //   e.preventDefault();
  //   let valid = true;
  //   const newError = { ...error };

  //   if (!email && !phone) {
  //     newError.contact = "Please provide either an email or a phone number.";
  //     valid = false;
  //   }

  //   setError(newError);
  //   if (valid) {
  //     const contactData = {
  //       email,
  //       phone,
  //     };
  //     try {
  //       const contactResponse = await submitContactApi(contactData);
  //       if (contactResponse.success) {
  //         console.log("Post created successfully!");
  //         navigate('/profile')
  //       }
  //     } catch (error) {
  //       console.log("Error occurred while submitting contact info.");
  //     }
  //   }
  // };

  return (
    <>
      <Navbar />
      <Container>
        <FormContainer>
          <FormHeader>
            {currentStep === 1 ? "Create a New Post" : "Your Contact Info"}
          </FormHeader>
          {currentStep === 1 && (
            <form onSubmit={handlePostSubmit}>
              <FormField>
                <Label htmlFor="title">
                  <FaInfoCircle /> Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error.title && <ErrorMessage>{error.title}</ErrorMessage>}
              </FormField>

              <FormField>
  <Label htmlFor="description">
    <FaInfoCircle /> Description
  </Label>
  <ReactQuill
    value={description}
    onChange={setDescription}
    modules={modules}
    theme="snow" 
    placeholder="Enter job description..."
  />
  {error.description && <ErrorMessage>{error.description}</ErrorMessage>}
</FormField>

              <FormField>
                <Label htmlFor="category">
                  <FaTag /> Category
                </Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Enter category/tag"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {error.category && (
                  <ErrorMessage>{error.category}</ErrorMessage>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="city">
                  <FaMapMarkerAlt /> City
                </Label>
                <Dropdown
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  <option value="indore">Indore</option>
                  <option value="bhopal">Bhopal</option>
                  <option value="jabalpur">Jabalpur</option>
                </Dropdown>
                {error.city && <ErrorMessage>{error.city}</ErrorMessage>}
              </FormField>

              <FormField>
                <Label htmlFor="address">
                  <FaInfoCircle /> Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error.address && <ErrorMessage>{error.address}</ErrorMessage>}
              </FormField>

              <FormField>
                <Label>Budget</Label>
                <RadioWrapper>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name="budgetType"
                      value="fixed"
                      checked={budgetType === "fixed"}
                      onChange={() => setBudgetType("fixed")}
                    />
                    Fixed
                  </RadioLabel>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name="budgetType"
                      value="range"
                      checked={budgetType === "range"}
                      onChange={() => setBudgetType("range")}
                    />
                    Range
                  </RadioLabel>
                </RadioWrapper>
                {error.budget && <ErrorMessage>{error.budget}</ErrorMessage>}

                {budgetType === "fixed" && (
                  <Input
                    type="number"
                    placeholder="Enter budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                )}

                {budgetType === "range" && (
                  <>
                    <Input
                      type="number"
                      placeholder="Min budget"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max budget"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                    />
                  </>
                )}
              </FormField>

              <SubmitButton type="submit">Save in Draft</SubmitButton>
            </form>
          )}

        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePost;
