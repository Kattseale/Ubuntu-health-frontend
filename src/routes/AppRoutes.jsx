import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import HomeM from "../pages/HomeM";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Patients from "../pages/Patients";
import Clinics from "../pages/Clinics";
import Medications from "../pages/Medications";
import Appointments from "../pages/Appointments";
import Community from "../pages/Community";
import Announcements from "../pages/Announcements";
import Reports from "../pages/Reports";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<HomeM />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard */}

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

            {/* Patients */}

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

            {/* Clinics */}

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

            {/* Medications */}

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

            {/* Appointments */}

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

            {/* Community */}

            <Route
                path="/community"
                element={
                    <ProtectedRoute>
                        <Community />
                    </ProtectedRoute>
                }
            />

            {/* Announcements */}

            <Route
                path="/announcements"
                element={
                    <ProtectedRoute>
                        <Announcements />
                    </ProtectedRoute>
                }
            />

            {/* Reports */}

            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <RoleRoute allowedRoles={["ADMIN"]}>
                            <Reports />
                        </RoleRoute>
                    </ProtectedRoute>
                }
            />

            {/* 404 */}

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>
    );
};

export default AppRoutes;