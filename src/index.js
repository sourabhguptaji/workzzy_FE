import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastProvider } from "./context/Alert"; 
import ReactGA from "react-ga4";

// Only initialize Google Analytics in production
// if (window.location.hostname !== "localhost") {
  ReactGA.initialize("G-RW0HCEKR36");
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);

