import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../dashboard/AdminNavbar";
import axiosInstance from "../../api/axiosInstance";
import Footer from "../Footer/Index";
import { FaFilePdf } from "react-icons/fa";

const JobApplications = () => {
  const { postId } = useParams();
  const [job, setJob] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(`/api/post/applications/${postId}`);
        if (response?.data?.success) {
          setJob(response.data?.jobData?.jobPost);
          setApplications(response.data?.jobData?.applications);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [postId]);

  return (
    <>
      <Navbar />
      <Container>
        <Title>Job Applications</Title>
        <JobTitle>{job?.title}</JobTitle>
        <Subtitle>Total Applications: <strong>{applications?.length}</strong></Subtitle>

        <ApplicationsList>
          {applications?.length > 0 ? (
            applications?.map((applicant) => (
              <ApplicationCard key={applicant?._id}>
                <ApplicantName>{applicant?.applicatorId?.name}</ApplicantName>
                <ApplicantEmail>Email: {applicant?.applicatorId?.email}</ApplicantEmail>
                {applicant?.applicatorId?.resume && (
                  <ResumeLink href={applicant?.applicatorId?.resume} download>
                    <FaFilePdf color="orange" />  Download Resume
                  </ResumeLink>
                )}
              </ApplicationCard>
            ))
          ) : (
            <NoApplications>No applications yet.</NoApplications>
          )}
        </ApplicationsList>
      </Container>
      <Footer />
    </>
  );
};

/* Styled Components */
const Container = styled.div`
  min-height: 80vh;
  margin: auto;
  padding: 40px;
  margin-top: 2rem;
  margin-bottom: 2rem;
//   background: linear-gradient(135deg, rgb(51 51 51), rgb(51 51 51));
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffcc00;
`;

const JobTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 10px;
  color: #1e1e1e;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #ffcc00;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
   max-width: 900px;
   margin: auto;
`;

const ApplicationsList = styled.div`
  margin-top: 20px;
  max-width: 900px;
  margin: auto;
`;

const ApplicationCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  margin: 15px 0;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: left;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
`;

const ApplicantName = styled.h3`
  font-size: 1.3rem;
  color: #ffcc00;
  font-weight: bold;
`;

const ApplicantEmail = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

const ResumeLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #ffcc00;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    text-decoration: underline;
    color: #ff9900;
  }
`;

const NoApplications = styled.p`
  font-size: 1rem;
  color: #bbb;
`;

export default JobApplications;