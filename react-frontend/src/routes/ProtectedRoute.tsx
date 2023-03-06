import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth.auth);

  return user ? children : <Navigate to="/auth/signIn" />;
};

export default ProtectedRoute;
