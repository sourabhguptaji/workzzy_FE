import styled from 'styled-components';
import { FaMapMarkerAlt, FaTag, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";

const EventPoster = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const PostList = ({ filteredPosts, type }) => {
  const navigate = useNavigate()
  return (
    <ListContainer>
      {filteredPosts?.length <= 0 && <NoPosts>No Posts found in your area.</NoPosts>}
      {filteredPosts.map((post) => (
        <PostCard key={post._id}>
          <PostHeader>
            <PostTitle>{post?.title.length > 50 ? post?.title.slice(0, 50) + '...' : post?.title}</PostTitle>
          </PostHeader>
          <PostDescription 
           dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              post?.description.length > 100
                ? post?.description?.replace(
                  /<\/?(strong|br|h[1-6])\s*\/?>/g,
                  (match, tag) => (tag.startsWith("h") ? "<p>" : "")
                ).slice(0, 100) + "..."
                : post?.description?.replace(
                  /<\/?(strong|br|h[1-6])\s*\/?>/g,
                  (match, tag) => (tag.startsWith("h") ? "<p>" : "")
                )
            ),
          }}/>
          <PostDetails>
            <DetailChip><StyledFaMapMarkerAlt /> {post?.city}</DetailChip>
            <DetailChip><StyledFaTag /> {post?.category}</DetailChip>
           <DetailChip><StyledFaClock /> {post?.budget ?? `${post?.budgetMin} - ${post?.budgetMax}`}</DetailChip>
          </PostDetails>
          <ApplyButton onClick={() => navigate(`/detail/${post._id}`)}>View Detail</ApplyButton>
        </PostCard>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
`;

const PostCard = styled.div`
  padding: 25px;
  border-radius: 15px;
  background: #fff;
  border: 1px dashed black;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: #222;
  font-family: 'Poppins', sans-serif;
`;

const PostDescription = styled.p`
  margin: 10px 0;
  color: #444;
  font-size: 16px;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
`;

const PostDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const DetailChip = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background:rgb(248, 244, 244);
  border: 1px dashed;
  color: #222;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  `;
  
  const StyledFaMapMarkerAlt = styled(FaMapMarkerAlt)`
  color: #ff5a5f;
  `;
  const StyledFaTag = styled(FaTag)`
  color: #00aaff;
  `;
  const StyledFaClock = styled(FaRupeeSign)`
  color: #ff9900;
`;

export const ApplyButton = styled.button`
  width: 50%;
  padding: 12px;
  background: #111;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 30px;
  transition: background 0.3s ease;
  &:hover {
    background: #000;
  }
`;

const NoPosts = styled.p`
  text-align: center;
  font-size: 18px;
  color: #777;
`;

export default PostList;
