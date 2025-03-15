import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("workzzy_token"); // Replace with your auth token key
    if (!token && token?.length <= 50) {
      navigate("/"); // Redirect to home/login page if no token
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthChecker;
