import {Navigate} from "react-router-dom";
import {useUser} from "../api";

export function ProtectedRoute({children}) {
    const currentUser = useUser();
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }
    return children;
}