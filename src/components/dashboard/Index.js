import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaFilter, FaMapMarkerAlt, FaTag, FaClock, FaHeart, FaTimes, FaSearch } from 'react-icons/fa';
import Navbar from './AdminNavbar'; // Import the Navbar
import axiosInstance from '../../api/axiosInstance';
import PostList from './PostList';
import EventList from './EventList';
import { useParams } from 'react-router-dom';

// Theme Colors
const themeColors = {
  primary: '#FF6F61', // Vibrant coral for primary actions
  secondary: '#F7C6A0', // Soft peach for highlights
  background: '#F0F4F8', // Light cream for background
  textPrimary: '#2C3E50', // Dark navy for primary text
  textSecondary: '#34495E', // Slate gray for secondary text
  border: '#BDC3C7', // Light border color
};

const Container = styled.div`
  display: flex;
  // padding: 20px;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
  // background-color: ${themeColors.background};
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  // margin-top: 20px;
  // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
`;

const SideFilter = styled.div`
  width: 280px;
  padding: 25px;
  margin-top: 20px;
  border: 1px dashed black;
  // border-right: 1px solid ${themeColors.border};
  // position: relative;
  top: 0;
  height: 60vh;
  // background: #fff;
  display: ${props => (props.show ? 'block' : 'none')};
  // box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
 border-radius: 12px;
 z-index: 999;
  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterHeader = styled.h3`
  font-size: 22px;
  color: ${themeColors.textPrimary};
  margin-bottom: 20px;
  font-weight: 600;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid ${themeColors.border};
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
`;

const FilterButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ApplyButton = styled.button`
  padding: 12px 20px;
 background: #111;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
   background: #222;
  }
`;

const ClearButton = styled.button`
  padding: 12px 20px;
  background-color: #f1f1f1;
  color: ${themeColors.textPrimary};
  border: 1px solid ${themeColors.border};
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  color: ${themeColors.primary};

  @media (min-width: 768px) {
    display: none;
  }
`;

const FilterPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FilterContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12 px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px dashed black;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  padding-right: 40px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  color: ${themeColors.textSecondary};
  cursor: pointer;
`;


const Input = styled.input`
  width: 48%;
  padding: 10px;
  margin: 10px 1%;
  border: 1px solid ${themeColors.border};
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-top: 10px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const CustomCheckbox = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  display: inline-block;
  border: 2px solid #007bff;
  position: relative;
  transition: all 0.3s;

  ${HiddenCheckbox}:checked + & {
    background-color: #007bff;
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
  }
`;

const PostListing = () => {
  const {type} = useParams()
  const [showFilters, setShowFilters] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [jobType, setJobType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [isPaid, setIsPaid] = useState(null);

  const toggleFilters = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      try {
        let url = '/api/post/published'
        if(type === "Events"){
          url = 'api/event'
        }
        const response = await axiosInstance.get(url);
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
        const uniqueCategories = [...new Set(response.data?.posts?.map(post => post?.category))];
        setFilterCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPublishedPosts();
  }, []);

  const clearFilters = () => {
    setCategory('');
    setCity('');
    setMinBudget('');
    setMaxBudget('');
    setJobType('');
    setSearchTerm('');
    setFilteredPosts(posts);
  };

  const applyFilters = (isSearchResent=false) => {
    let filtered = posts;

    if (category) {
      filtered = filtered.filter(post => post.category === category);
    }

    if (city) {
      filtered = filtered.filter(post => post.city === city);
    }

    if (minBudget || maxBudget) {
      filtered = filtered.filter(post => {
        const budget = parseFloat(post.budget || post.budgetMin || post.budgetMax);
        const maxbudget = parseFloat(post.budget || post.budgetMax);
        return ((!minBudget || budget >= parseFloat(minBudget)) && (!maxBudget || budget <= parseFloat(maxBudget))) || ((!minBudget || maxbudget >= parseFloat(minBudget)) && (!maxBudget || maxbudget <= parseFloat(maxBudget)));
      });
    }
    if (jobType) {
      filtered = filtered.filter(post => post.jobType === jobType);
    }

    if (type === "Events" && isPaid !== null) {
      filtered = filtered.filter(post => (isPaid ? post.eventType === "paid" : post.eventType === "free"));
    }

    if (searchTerm && !isSearchResent) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase(). includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <SideFilter show={showFilters}>
          <FilterHeader>Filter {type}</FilterHeader>
          <Dropdown value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {filterCategories?.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </Dropdown>
          {/* <Dropdown value={jobType} onChange={e => setJobType(e.target.value)}>
            <option value="">All Job Types</option>
            <option value="part-time">Part-time</option>
            <option value="full-time">Full-time</option>
          </Dropdown> */}
          <Dropdown value={city} onChange={e => setCity(e.target.value)}>
            <option value="">All Cities</option>
            <option value="indore">Indore</option>
            <option value="bhopal">Bhopal</option>
            <option value="jabalpur">Jabalpur</option>
          </Dropdown>
       {type === "Posts" &&   <div>
            <Input
              type="number"
              placeholder="Min Budget"
              value={minBudget}
              onChange={e => setMinBudget(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Budget"
              value={maxBudget}
              onChange={e => setMaxBudget(e.target.value)}
            />
          </div>}
          {type === "Events" && (
            <>
            <CheckboxContainer>
  <StyledLabel>
    <HiddenCheckbox 
      checked={isPaid === true} 
      onChange={() => setIsPaid(isPaid === true ? null : true)} 
    />
    <CustomCheckbox />
    Paid
  </StyledLabel>

  <StyledLabel>
    <HiddenCheckbox 
      checked={isPaid === false} 
      onChange={() => setIsPaid(isPaid === false ? null : false)} 
    />
    <CustomCheckbox />
    Free
  </StyledLabel>
</CheckboxContainer>
         
              </>
          )}
          <FilterButton>
            <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
            <ClearButton onClick={clearFilters}>Clear</ClearButton>
          </FilterButton>
        </SideFilter>

        <MainContent>
          <FilterSection>
            <SearchContainer>
              <SearchBar
                type="text"
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  console.log(e.target.value, "<==value")
                  applyFilters(e.target?.value?.length === 0) 
                }}
                onKeyDown={handleKeyDown}
              />
              <SearchIcon onClick={applyFilters} />
            </SearchContainer>
            <FilterIcon onClick={toggleFilters}>
              <FaFilter />
            </FilterIcon>
          </FilterSection>
{
  type === "Events" ? 
  <EventList filteredPosts={filteredPosts} />
:
<PostList
filteredPosts={filteredPosts} 
/>
}
          {/* <PostList>
            {filteredPosts?.length <= 0 && <p>No posts found in your area.</p>}
            {filteredPosts.map((post) => (
              <PostItem key={post.id}>
                <PostTitle>{post?.title}</PostTitle>
                <PostDescription>{post?.description}</PostDescription>
                <PostDetails>
                  <span><FaMapMarkerAlt /> {post?.city}</span>
                  <span><FaTag /> {post?.category}</span>
                  <span><FaClock /> {post?.budget ?? `${post?.budgetMin} - ${post?.budgetMax}`}</span>
                  <span><FaHeart /> Tags: #tag1, #tag2</span>
                </PostDetails>
                <PostButton>Apply</PostButton>
              </PostItem>
            ))}
          </PostList> */}
        </MainContent>

        <FilterPopup show={showPopup}>
          <FilterContent>
            <CloseButton onClick={toggleFilters}><FaTimes /></CloseButton>
            <Dropdown value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Dropdown>
            <Dropdown value={jobType} onChange={e => setJobType(e.target.value)}>
              <option value="">All Job Types</option>
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
            </Dropdown>
            <Dropdown value={city} onChange={e => setCity(e.target.value)}>
              <option value="">All Cities</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
            </Dropdown>
            <div>
              <Input
                type="number"
                placeholder="Min Budget"
                value={minBudget}
                onChange={e => setMinBudget(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max Budget"
                value={maxBudget}
                onChange={e => setMaxBudget(e.target.value)}
              />
            </div>
            <FilterButton>
 <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
              <ClearButton onClick={clearFilters}>Clear</ClearButton>
            </FilterButton>
          </FilterContent>
        </FilterPopup>
      </Container>
    </>
  );
};

export default PostListing;