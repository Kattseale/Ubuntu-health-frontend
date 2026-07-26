import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../services/authService";

export default function RoleProtectedRoute({
                                               children,
                                               allowedRoles
                                           }) {

    const token = getToken();
    const role = getRole();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/home" replace />;
    }

    return children;
}