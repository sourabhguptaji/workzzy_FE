import styled from 'styled-components';
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../context/Alert";
import moment from 'moment-timezone';
import DOMPurify from 'dompurify';
import Navbar from '../dashboard/AdminNavbar';
import axiosInstance from '../../api/axiosInstance';
import Footer from '../Footer/Index';

const EventContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const EventPoster = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
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
    filter: blur(5px);
    opacity: 0.6;
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
`;

const EventTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-top: 20px;
`;

const EventDescription = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.6;
  margin-top: 10px;
`;

const EventDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

const DetailChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgb(248, 244, 244);
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
`;
const DetailChipRecentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 12px 18px;
  background: #ff5a5f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e0484e;
  }
`;

const EventDetail = () => {
  const { eventId } = useParams();
 const [event, setEvent] = useState(null);
 const [recentEvents, setRecentEvents] = useState(null);
   const { showToast } = useToast();
   const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0,0)
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/api/event/detail/${eventId}`);
        if (response?.data?.success) {
          setEvent(response.data?.event);
          setRecentEvents(response.data?.recentEvents);
        } else {
          showToast(response?.data?.message, "error");
        }
      } catch (error) {
        showToast(error?.message, "error");
      }
    };

    fetchEvent();
  }, [eventId]);
  if (!eventId) {
    return <EventContainer><h2>Event Not Found</h2></EventContainer>;
  }

  return (
    <>
    <Navbar />
    <EventContainer>
      <EventPoster>
        {event?.image && <img src={event.image} alt="Blurred Background" className="blur-bg" />}
        {event?.image && <img src={event.image} alt="Event Poster" className="main-img" />}
      </EventPoster>
      <EventTitle>{event?.title}</EventTitle>
      <EventDescription
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event?.description) }}
        />
      <EventDetails>
        <DetailChip><FaMapMarkerAlt color="#ff5a5f" /> {event?.city}</DetailChip>
        <DetailChip><FaCalendarAlt color="#00aaff" /> {moment(event?.startDate).format("DD MMM YYYY, h:mm A")}</DetailChip>
        <DetailChip>
          {event?.eventType === "paid" ? (
              <><FaRupeeSign color="#ff9900" /> {event?.entryFee}/-</>
            ) : (
                "Free"
            )}
        </DetailChip>
      </EventDetails>
      <BackButton onClick={() => navigate(-1)}>Back to Events</BackButton>
    </EventContainer>

    {recentEvents?.length > 0 && (
        <RecentEventsContainer>
            <div>
          <h2>Recent Events</h2>
            </div>
          <RecentEventList>
            {recentEvents?.map(event => (
              <RecentEventCard key={event?._id} onClick={() => navigate(`/detail-event/${event?._id}`)}>
                <img style={{
                    width: '250px',
                    height: '250px',
                    objectFit: "contain"
                }} src={event?.image} alt={event?.title} />
                <h3>{event?.title.length > 20 ? event?.title.slice(0, 50) + '...' : event?.title}</h3>
            <EventDescription
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  event?.description.length > 100
                    ? event?.description.slice(0, 100) + "..."
                    : event?.description
                ),
              }}
            />
                <DetailChipRecentCard style={{margin: '2px'}}><FaMapMarkerAlt color="#ff5a5f" /> {event?.city}</DetailChipRecentCard>
                <DetailChipRecentCard style={{margin: '2px'}}><FaCalendarAlt color="#00aaff" /> {moment(event?.startDate).format("DD MMM YYYY, h:mm A")}</DetailChipRecentCard>
              </RecentEventCard>
            ))}
          </RecentEventList>
        </RecentEventsContainer>
      )}
    <Footer />
            </>
  );
};



export default EventDetail;
const RecentEventsContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
//   background: #f9f9f9;
  border-radius: 15px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const RecentEventList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const RecentEventCard = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 300px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }
`;