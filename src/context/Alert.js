import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create Context
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={closeToast} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={closeToast} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
