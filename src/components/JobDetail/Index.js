import styled from "styled-components";
import {
  FaMapMarkerAlt,
  FaCode,
  FaMoneyBillWave,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import { ApplyButton } from "../dashboard/PostList";
import Navbar from "../dashboard/AdminNavbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../context/Alert";
import axiosInstance from "../../api/axiosInstance";
import { capitalize } from "@mui/material";
import moment from "moment-timezone";
import DOMPurify from "dompurify";
import Footer from "../Footer/Index";

const JobDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/post/detail/${postId}`);
        if (response?.data?.success) {
          setPost(response.data?.post);
        } else {
          showToast(response?.data?.message, "error");
        }
      } catch (error) {
        showToast(error?.message, "error");
      }
    };

    fetchPost();
  }, []);

  const applyNow = async () => {
    try {
      const response = await axiosInstance.post(`/api/post/apply/${postId}`);
      if (response?.data?.success) {
        showToast(response?.data?.message, "success");
        navigate(-1);
      } else {
        showToast(response?.data?.message, "error");
      }
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <DetailContainer>
        <h1 className="job-title">{post?.title}</h1>

        {/* Job Details */}
        <DetailGrid>
          <DetailChip>
            <StyledFaMapMarkerAlt />
            {post?.city}
          </DetailChip>
          <DetailChip>
            <StyledFaCode />
            {capitalize(post?.category || "")}
          </DetailChip>
          <DetailChip>
            <StyledFaMoneyBillWave />
            {post?.budgetType === "fixed"
              ? `$${post?.budget}`
              : `$${post?.budgetMin} - $${post?.budgetMax}`}
          </DetailChip>
          <DetailChip>
            <StyledFaClock />
            {moment(post?.createdAt).fromNow()}
          </DetailChip>
        </DetailGrid>

        <p className="job-description" style={{ marginTop: "20px" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.description) }}></p>

        {/* Job Poster Profile - Just Above Apply Button */}
        <JobPosterInfo>
          <span>
            Posted by <strong>{post?.userId?.name || "Unknown Poster"}</strong>
          </span>
          <span>
            <FaEnvelope className="icon" /> {post?.userId?.email || "No Email Provided"}
          </span>
        </JobPosterInfo>

        <ApplyButtonContainer>
          <ApplyButton onClick={() => applyNow()}>Apply Now</ApplyButton>
        </ApplyButtonContainer>
      </DetailContainer>
      <Footer />
    </>
  );
};

/* Job Poster Profile - Clean Inline Design */
const JobPosterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
  
  .icon {
    color: #007bff;
    margin-right: 6px;
  }
`;

/* Main Container */
const DetailContainer = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 40px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px dashed black;
  border-radius: 15px;
  color: #333;
  font-family: "Poppins", sans-serif;
`;

/* Styled Job Details */
const DetailGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  justify-content: start;
`;

const DetailChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  padding: 10px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #e9ecef;
    transform: scale(1.05);
  }
`;

const StyledFaMapMarkerAlt = styled(FaMapMarkerAlt)`
  color: #ff5a5f;
`;
const StyledFaCode = styled(FaCode)`
  color: #007bff;
`;
const StyledFaMoneyBillWave = styled(FaMoneyBillWave)`
  color: #28a745;
`;
const StyledFaClock = styled(FaClock)`
  color: #ffc107;
`;

const ApplyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export default JobDetail;
