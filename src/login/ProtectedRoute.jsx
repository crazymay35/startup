import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, userState }) {
  const { email, user } = userState;

  if (!email) return <Navigate to="/" replace />;
  if (!user) return <main>Loading...</main>;

  return children;
}