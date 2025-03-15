import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const trackPageView = () => {
  if (window.location.hostname !== "localhost") {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }
};

export const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return null;
};
