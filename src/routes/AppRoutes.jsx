import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Patients from "../pages/Patients";
import Clinics from "../pages/Clinics";
import Medications from "../pages/Medications";
import Appointments from "../pages/Appointments";
import Recommendations from "../pages/Recommendations";
import Community from "../pages/Community";
import Announcements from "../pages/Announcements";
import Reports from "../pages/Reports";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/patients"
                element={
                    <ProtectedRoute>
                        <RoleRoute
                            allowedRoles={[
                                "ADMIN",
                                "DOCTOR",
                                "NURSE",
                                "RECEPTIONIST"
                            ]}
                        >
                            <Patients />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/clinics"
                element={
                    <ProtectedRoute>
                        <RoleRoute
                            allowedRoles={[
                                "ADMIN",
                                "RECEPTIONIST"
                            ]}
                        >
                            <Clinics />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/medications"
                element={
                    <ProtectedRoute>
                        <RoleRoute
                            allowedRoles={[
                                "ADMIN",
                                "DOCTOR",
                                "NURSE"
                            ]}
                        >
                            <Medications />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/appointments"
                element={
                    <ProtectedRoute>
                        <RoleRoute
                            allowedRoles={[
                                "ADMIN",
                                "DOCTOR",
                                "NURSE",
                                "RECEPTIONIST",
                                "PATIENT"
                            ]}
                        >
                            <Appointments />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/recommendations"
                element={
                    <ProtectedRoute>
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <Recommendations />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/community"
                element={
                    <ProtectedRoute>
                        <Community />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/announcements"
                element={
                    <ProtectedRoute>
                        <Announcements />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <RoleRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <Reports />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>
    );
};

export default AppRoutes;