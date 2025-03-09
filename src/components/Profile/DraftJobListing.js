import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBullhorn, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';


const themeColors = {
primary: '#121212',
background: '#ffffff',
text: '#333333',
cardBackground: '#f9f9f9',
buttonPrimary: '#007bff',
buttonDanger: '#dc3545',
border: '#e0e0e0'
};

const Container = styled.div`
  background: ${themeColors.background};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  color: ${themeColors.text};
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const JobGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const JobCard = styled.div`
  background: ${themeColors.cardBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  border: 1px solid ${themeColors.border};
  transition: all 0.3s ease;
  width: 100%;
    border: 1px dashed ${(props) => (props.published ? 'black' : 'red')};
  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const JobTitle = styled.h3`
  font-size: 18px;
  color: ${themeColors.text};
  font-weight: 600;
  margin: 0;
`;

const JobStatus = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${(props) => (props.published ? '#28a745' : '#6c757d')};
  align-self: flex-start;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${(props) => (props.primary ? 'black' : themeColors.buttonDanger)};
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
  white-space: nowrap;
  &:hover {
    opacity: 0.85;
  }
`;

const JobListing = () => {
  const [posts, setPosts] = useState([]);

  const fetchDraftPosts = async () => {
    try {
      const response = await axiosInstance.get('/api/post/draft');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchDraftPosts();
  }, []);

  const handlePublish = async (id, status = 'published') => {
    try {
      const response = await axiosInstance.put(`/api/post/publish-draft/${id}`, { status });
      if (response.status === 200) {
        fetchDraftPosts();
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  return (
    <Container>
      <SectionTitle>Job Listings</SectionTitle>
      <JobGrid>
        {posts.length === 0 ? (
          <JobCard>
            <JobTitle>No jobs available.</JobTitle>
          </JobCard>
        ) : (
          posts.map((job) => (
            <JobCard key={job._id} published={job.status === 'published'}>
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                {/* <JobStatus published={job.status === 'published'}>
                  {job.status}
                </JobStatus> */}
              </JobInfo>
                 <Actions>
                            {
                                job.status === 'published'
                                ?<ActionButton onClick={() => handlePublish(job._id, 'draft')}>
                                <FaTrash /> Unpublish
                              </ActionButton>
                                :<ActionButton primary onClick={() => handlePublish(job._id, 'published')}>
                                <FaBullhorn /> Publish
                              </ActionButton>
                              
                              
                            }
                          </Actions>
            </JobCard>
          ))
        )}
      </JobGrid>
    </Container>
  );
};

export default JobListing;
