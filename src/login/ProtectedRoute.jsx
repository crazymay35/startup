import {Navigate} from "react-router-dom";
import {useUser} from "../api";

export function ProtectedRoute({children}) {
    const {email} = useUser();
    if (!email) {
        return <Navigate to="/" replace />;
    }
}