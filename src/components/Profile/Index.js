import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaClipboard, FaCheckCircle, FaBriefcase, FaEdit } from 'react-icons/fa';
import Navbar from '../dashboard/AdminNavbar';
import axiosInstance from '../../api/axiosInstance'; // assuming axiosInstance is configured
import { useNavigate } from 'react-router-dom';

// Theme Colors
const themeColors = {
  primary: '#000',
  secondary: '#333',
  background: '#F5F7FA',
  textPrimary: '#333',
  textSecondary: '#666',
  border: '#E1E8F0',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 900px;
  margin: auto;
  background-color: ${themeColors.background};
  font-family: 'Roboto', sans-serif;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
`;

const ProfileHeader = styled.h2`
  font-size: 28px;
  color: ${themeColors.textPrimary};
  margin-bottom: 20px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Avatar = styled.div`
  background-color: #ccc;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Username = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${themeColors.textPrimary};
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  color: ${themeColors.textSecondary};
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.span`
  font-weight: 500;
  margin-top: 5px;
`;

const DraftJobsSection = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const DraftJobItem = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DraftJobTitle = styled.h4`
  font-size: 18px;
  color: ${themeColors.textPrimary};
  font-weight: 500;
`;

const DraftActions = styled.div`
  display: flex;
  gap: 10px;
`;

const DraftButton = styled.button`
  background-color: ${themeColors.primary};
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #333;
  }
`;

const Profile = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [userStats, setUserStats] = useState({
    postsCreated: 5,
    postsApplied: 8,
    worksDone: 3,
    draftJobs: [],
  });

  // Fetch published posts from the API
  useEffect(() => {
    const fetchDraftPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/post/draft'); // API call to fetch draft posts
        setPosts(response.data.posts); // Store posts in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchDraftPosts();
  }, []);
console.log(posts, "<==posts")
  // Handle publishing a draft post
  const handlePublish = async (id) => {
    try {
      const response = await axiosInstance.put(`/api/post/publish-draft/${id}`);
      if (response.status === 200) {
        // Optionally, fetch the posts again after publishing to update the UI
        const updatedPosts = posts.filter(post => post?._id !== id);
        setPosts(updatedPosts); // Remove the published job from the draft list
      }
    } catch (error) {
      console.error('Error publishing draft job:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <ProfileContainer>
          <ProfileHeader>Your Profile</ProfileHeader>
          <UserInfo>
            <Avatar />
            <Username>John Doe</Username>
            <Stats>
              <StatItem>
                <FaClipboard size={24} color={themeColors.primary} />
                <StatLabel>Posts Created</StatLabel>
                <span>{userStats.postsCreated}</span>
              </StatItem>
              <StatItem>
                <FaBriefcase size={24} color={themeColors.primary} />
                <StatLabel>Posts Applied</StatLabel>
                <span>{userStats.postsApplied}</span>
              </StatItem>
              <StatItem>
                <FaCheckCircle size={24} color={themeColors.primary} />
                <StatLabel>Works Done</StatLabel>
                <span>{userStats.worksDone}</span>
              </StatItem>
            </Stats>
          </UserInfo>

          <DraftJobsSection>
            <h3>Your Draft Jobs</h3>
            {posts.length === 0 ? (
              <p>No draft jobs available.</p>
            ) : (
              posts.map((job) => (
                <DraftJobItem key={job._id}>
                  <DraftJobTitle>{job.title}</DraftJobTitle>
                  <DraftActions>
                    <DraftButton onClick={() => handlePublish(job._id)}>
                      <FaEdit style={{ marginRight: '5px' }} /> Publish
                    </DraftButton>
                  </DraftActions>
                </DraftJobItem>
              ))
            )}
          </DraftJobsSection>
        </ProfileContainer>
      </Container>
    </>
  );
};

export default Profile;
