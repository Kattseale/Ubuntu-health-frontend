import { Navigate } from "react-router-dom";
import { getRole, isAuthenticated } from "../services/authService";

export default function RoleRoute({ children, allowedRoles }) {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const userRole = getRole();

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}