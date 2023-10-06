import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="dept-admin/*" element={<AdminLayout />} />
        <Route path="station-admin/*" element={<AdminLayout />} />
        <Route
          path="/"
          element={
            localStorage.getItem("persist") ? (
              localStorage.getItem("role") === "DEPT_ADMIN" ? (
                <Navigate to="/dept-admin/dashboard" replace />
              ) : (
                <Navigate to="/station-admin/dashboard" replace />
              )
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </ChakraProvider>
  );
};
export default App;
