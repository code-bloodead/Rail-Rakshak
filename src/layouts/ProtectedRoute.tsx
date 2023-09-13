import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (children: React.FC) => {
  return (
    <>
      {localStorage.getItem("token") ? (
        children
      ) : (
        <Navigate to="/auth" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
