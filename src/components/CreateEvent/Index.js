import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../dashboard/AdminNavbar";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/Alert";
import Footer from "../Footer/Index";
import { FaTag, FaMapMarkerAlt, FaInfoCircle, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { Dropdown, FormHeader } from "../CreatePost/Index";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";

const themeColors = {
  primary: "#1A1A2E",
  secondary: "#16213E",
  accent: "#0F3460",
  background: "#EAEAEA",
  textPrimary: "#1A1A2E",
  textSecondary: "#666",
  border: "#D3D3D3",
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  // background-color: ${themeColors.background};
  font-family: "Poppins", sans-serif;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  background: #fff;
  padding: 40px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 2px solid ${themeColors.border};
  border-radius: 8px;
  &:focus {
    border-color: ${themeColors.accent};
    outline: none;
  }
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${themeColors.primary};
  padding: 20px;
  width: 100%;
  max-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin: 0 auto; /* Centering */
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-top: 10px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    max-height: 200px;
  }
`;


const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, ${themeColors.primary}, ${themeColors.accent});
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: ${themeColors.secondary};
  }
`;

const EventTypeContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
    display: flex;
  align-items: center;
`;

const CustomDatePicker = styled(DatePicker)`
 flex: 1; 
  width: 100%;
  padding: 14px 16px 14px 45px; /* Adjusted left padding for icon */
  font-size: 16px;
  border: 2px solid ${themeColors.border};
  border-radius: 8px;
  background-color: #fff; /* Light background */
  color: ${themeColors.textPrimary};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: ${themeColors.accent};
    outline: none;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: ${themeColors.textSecondary};
  }
`;

const Icon = styled(FaCalendarAlt)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${themeColors.textSecondary};
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;
   z-index: 10;
   pointer-events: none;

  &:hover {
    color: ${themeColors.accent};
  }
`;



const CreateEvent = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [eventType, setEventType] = useState("free");
  const [entryFee, setEntryFee] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !city || !address|| !startDate || !endDate) {
      showToast("All fields are required!", "error");
      return;
    }
    if (eventType === "paid" && !entryFee) {
      showToast("Please enter an entry fee for the paid event.", "error");
      return;
    }

    const postData = {
      title,
      description: DOMPurify.sanitize(description),
      category,
      city,
      address,
      image: file,
      eventType,
      entryFee: eventType === "paid" ? entryFee : "0",
      startDate,
      endDate,
    };

    try {
      const postResponse = await axiosInstance.post("/api/event", postData);
      if (postResponse?.data?.success) {
        showToast("Your event has been saved in draft successfully!", "success");
        navigate("/profile");
      }
      else {
        showToast(postResponse?.data?.message, "error");
      }
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <FormContainer>
           <FormHeader>
                     Create an Event
                    </FormHeader>
          <form onSubmit={handlePostSubmit}>
            <FormField>
              <Label>Title</Label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormField>
            <FormField>
              <Label>Description</Label>
              <ReactQuill value={description} onChange={setDescription} theme="snow" />
            </FormField>
            <FormField>
              <Label>Category</Label>
              <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </FormField>
            <FormField>
              <Label>City</Label>
              <Dropdown value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select City</option>
                <option value="indore">Indore</option>
                <option value="bhopal">Bhopal</option>
                <option value="jabalpur">Jabalpur</option>
              </Dropdown>
            </FormField>
              <FormField>
                            <Label htmlFor="address">
                             Address
                            </Label>
                            <Input
                              id="address"
                              type="text"
                              placeholder="Enter your address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            {/* {error.address && <ErrorMessage>{error.address}</ErrorMessage>} */}
                          </FormField>
<FormField>
  <Label>Select Event Date Range</Label>
  <DatePickerContainer>
    <Icon />
    <CustomDatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select Start & End Date"
      showPopperArrow={false}
      />
  </DatePickerContainer>
</FormField>

            <FormField>
              <Label>Event Type</Label>
              <EventTypeContainer>
                <input type="radio" name="eventType" value="free" checked={eventType === "free"} onChange={() => setEventType("free")} /> Free
                <input type="radio" name="eventType" value="paid" checked={eventType === "paid"} onChange={() => setEventType("paid")} /> Paid
              </EventTypeContainer>
            </FormField>
      {eventType === "paid" && (
        <FormField>
          <Label>Entry Fee</Label>
          <Input type="number" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} />
        </FormField>
      )}

              <Label>Event Poster</Label>
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {file ?<ImagePreview src={file} alt="Preview" /> : <p>Drag & drop an image <strong>(mobile size)</strong> or click to upload</p>}
            </DropzoneContainer>
            <SubmitButton type="submit">Save in Draft</SubmitButton>
          </form>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default CreateEvent;
