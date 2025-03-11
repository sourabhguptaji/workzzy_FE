import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEdit, FaMapMarkerAlt, FaEnvelope, FaPhone, FaStar, FaBriefcase, FaCamera, FaFilePdf, FaFileUpload, FaIdBadge, FaUserTag } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';
import { useToast } from '../../context/Alert';
import { FaMedal, FaTrophy, FaCrown, FaGem } from 'react-icons/fa';

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  padding: 50px 40px;
  margin: auto;
  gap: 60px;
  background: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
    padding: 30px 20px;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ccc;
  cursor: pointer;
`;

const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 55px;
  color: #777;
  border: 3px solid #ccc;
  cursor: pointer;
`;

const UploadIcon = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EditableText = styled.span`
  font-size: ${(props) => props.size || "16px"};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  color: ${(props) => (props.color ? props.color : "#333")};
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.2s ease-in-out;

  &:hover {
    border-bottom: 2px dashed #aaa;
  }

  input {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    border: none;
    outline: none;
    background: none;
    width: 100%;
    border-bottom: 2px solid blue;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 30px;
  margin: 10px 0;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
`;

const StatValue = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: #777;
`;

const DetailsContainer = styled.div`
  font-size: 16px;
  margin-top: 25px;
  padding-bottom: 20px;
`;

const Detail = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #444;
  margin: 8px 0;
`;

const ResumeContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.2s ease-in-out;

  &:hover {
    border-bottom: 2px dashed #aaa;
  }
`;

const ResumeFile = styled.span`
  font-size: 16px;
  color: #333;
`;

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
   const { showToast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    skills: "",
    location: "",
    email: "",
    phone: "",
    resume: ""
  });

 
  const getBadge = (jobsCompleted) => {
    if (jobsCompleted > 50) return { label: "Platinum User", color: "#E5E4E2", icon: <FaGem /> }; // 💎
    if (jobsCompleted > 30) return { label: "Gold User", color: "gold", icon: <FaCrown /> }; // 🥇
    if (jobsCompleted > 10) return { label: "Silver User", color: "silver", icon: <FaTrophy /> }; // 🥈
    return { label: "Bronze User", color: "#CD7F32", icon: <FaMedal /> }; // 🥉
  };
  
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/profile');
      if (response.data?.success) {
        setProfileData(response.data?.user);
        setAvatar(response?.data?.user?.profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  useEffect(() => {

    fetchProfile();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const response = await axiosInstance.post('/api/auth/profile', {
        ...updatedData
    });
console.log(updatedData, "<==updated data")
      if (response.data?.success) {
        showToast(response.data?.message, 'success')
        fetchProfile();
      } else {
        showToast(response.data?.message, 'error')
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast(error?.response.data?.message, 'error')
    }
  };

 

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        const updatedProfile = { ...profileData, ['profile']: e.target.result };
        updateProfile(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      setResume({ name: file.name, url: e.target.result, type: file.type });
      const updatedProfile = { ...profileData, ['resume']: e.target.result };
      updateProfile(updatedProfile);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;
    handleFileChange({ target: { files: [file] } });
  };
  


  const handleEdit = (key, value) => {
    const updatedProfile = { ...profileData, [key]: value };
    setProfileData(updatedProfile);
    updateProfile(updatedProfile);
  };

  const EditableField = ({ field, size, bold, color }) => {
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(profileData[field]);

    const handleBlur = () => {
      setEditing(false);
      handleEdit(field, value);
    };

    return isEditing ? (
      <EditableText size={size} bold={bold} color={color}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
        />
      </EditableText>
    ) : (
        <>
      <EditableText size={size} bold={bold} color={color} onClick={() => setEditing(true)}>
        {value} <FaEdit style={{ cursor: "pointer", color: "#888" }} onClick={() => setEditing(true)} />
      </EditableText>
        </>
    );
  };

  const badge = getBadge(profileData?.jobsCompleted || 0);

  return (
    <ProfileWrapper>
      <AvatarContainer>
        {avatar ? (
          <Avatar src={avatar} alt="Profile Avatar" />
        ) : (
          <AvatarPlaceholder>
            <FaUser />
          </AvatarPlaceholder>
        )}
        <label htmlFor="avatar-upload">
          <UploadIcon>
            <FaCamera />
          </UploadIcon>
        </label>
        <input type="file" id="avatar-upload" style={{ display: 'none' }} accept="image/*" onChange={handleAvatarChange} />
      </AvatarContainer>

      <ProfileDetails>
        <EditableField field="name" size="26px" bold color="#333" />

        <StatsContainer>
        <Stat>
        <StatValue style={{ color: badge.color, display: "flex", alignItems: "center", gap: "5px" }}>
          {badge.icon} {badge.label}
        </StatValue>
      </Stat>
        </StatsContainer>

        <DetailsContainer>
          <Detail><FaBriefcase /> Skills: <EditableField field="skills" /></Detail>
          <Detail><FaMapMarkerAlt /> Location: <EditableField field="location" /></Detail>
          <Detail><FaEnvelope /> Email: {profileData?.email}</Detail>
          <Detail><FaPhone /> Phone: <EditableField field="phone" /></Detail>
          </DetailsContainer>
          <ResumeContainer
  onDragOver={(e) => e.preventDefault()}
  onDrop={handleDrop}
  onClick={() => document.getElementById("resume-upload").click()}
>
  <FaFileUpload />
  {profileData?.resume ? (
    profileData?.resume?.startsWith("data:image/jpeg;") ? (
      <img src={profileData?.resume} alt="Resume Preview" width="50" />
    ) : (
      <>
        <FaFilePdf color="red" /> <span>Resume (PDF)</span>
      </>
    )
  ) : (
    "Drag & Drop Resume (PDF/Image)"
  )}
  <input
    type="file"
    id="resume-upload"
    style={{ display: "none" }}
    accept="image/*, application/pdf"
    onChange={(e) => handleFileChange(e, "resume")}
  />
</ResumeContainer>

      </ProfileDetails>
    </ProfileWrapper>
  );
};

export default Profile;
