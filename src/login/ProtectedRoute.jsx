import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, userState }) {
    const { email, user } = userState;

    // Still loading user from API
    if (email && !user) {
        return <main>Loading...</main>;
    }

    // No logged-in user → redirect to login
    if (!email) {
        return <Navigate to="/" replace />;
    }

    // User exists → allow access
    return children;
}
