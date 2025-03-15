
import ReactGA from "react-ga4";
const handleApplyClick = ({
    category,
    action,
    label
}) => {
    // if (window.location.hostname !== "localhost") {
      ReactGA.event({
        category,
        action,
        label
      });
    }
//   };

export default handleApplyClick