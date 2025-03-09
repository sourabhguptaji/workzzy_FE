import styled from 'styled-components';
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";
import moment from "moment-timezone"

const EventPoster = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  .blur-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(2px);
    opacity: 0.5;
    z-index: 0;
  }

  .main-img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
    transition: transform 0.4s ease-in-out;
  }

  &:hover .main-img {
    transform: scale(1.1);
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    z-index: 2;
  }
`;


const EventContent = styled.div`
  padding: 15px;
  background: white;
  border-radius: 0 0 15px 15px;
`;

const EventTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;

const EventDescription = styled.p`
  color: #555;
  font-size: 15px;
  line-height: 1.4;
`;

const EventDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const DetailChip = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgb(248, 244, 244);
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
`;

const EventApplyButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff5a5f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #e0484e;
  }
`;

const EventCard = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  border-radius: 15px;
  background: #fff;
  border: 2px dashed #ddd;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    // transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
`;

const NoEvents = styled.p`
  text-align: center;
  font-size: 18px;
  color: #777;
`;

const EventList = ({ filteredPosts }) => {
  const navigate = useNavigate();

  return (
    <ListContainer>
      {filteredPosts?.length <= 0 && <NoEvents>No events found in your area.</NoEvents>}

      {filteredPosts.map((event) => (
        <EventCard key={event._id}>
       <EventPoster>
  {event.image && <img src={event.image} alt="Blurred Background" className="blur-bg" />}
  {event.image && <img src={event.image} alt="Event Poster" className="main-img" />}
</EventPoster>

          <EventContent>
            <EventTitle>{event?.title.length > 20 ? event?.title.slice(0, 50) + '...' : event?.title}</EventTitle>
            <EventDescription
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  event?.description.length > 100
                    ? event?.description.slice(0, 100) + "..."
                    : event?.description
                ),
              }}
            />
            <EventDetails>
              <DetailChip><FaMapMarkerAlt color="#ff5a5f" /> {event?.city}</DetailChip>
              <DetailChip><FaCalendarAlt color="#00aaff" /> {moment(event?.startDate)?.format("DD MMM YYYY")}</DetailChip>
              <DetailChip>
                {event?.eventType === "paid" ? (
                  <><FaRupeeSign color="#ff9900" /> {event?.entryFee}/-</>
                ) : (
                  "Free"
                )}
              </DetailChip>
            </EventDetails>
            <EventApplyButton onClick={() => navigate(`/detail-event/${event._id}`)}>
              View Event
            </EventApplyButton>
          </EventContent>
        </EventCard>
      ))}
    </ListContainer>
  );
};

export default EventList;