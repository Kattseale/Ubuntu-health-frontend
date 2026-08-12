import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";


import { useEffect, useState } from "react";

import "./styles/responsive.css";

import { AuthProvider } from "./context/AuthContext";

import AppLayout from "./components/AppLayout";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import ThemeContext from "./context/ThemeContext";
import ResendVerification from "./pages/ResendVerification";

// =========================================================
// PAGES
// =========================================================

import Home from "./pages/Home";
import Clinics from "./pages/Clinics";
import Patients from "./pages/Patients";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import Announcements from "./pages/Announcements";
import Dashboard from "./pages/Dashboard";
import HomeM from "./pages/HomeM";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import AdminAppointments from "./pages/AdminAppointments";



function App() {

    const [darkMode, setDarkMode] = useState(false);


    // =====================================================
    // PREVENT BROWSER BACK BUTTON
    // =====================================================

    useEffect(() => {

        window.history.pushState(
            null,
            "",
            window.location.href
        );

        window.onpopstate = () => {

            window.history.go(1);

        };

        return () => {

            window.onpopstate = null;

        };

    }, []);


    return (

        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        >

            <AuthProvider>

                <ThemeContext.Provider
                    value={{
                        darkMode,
                        setDarkMode
                    }}
                >

                    <div
                        style={{
                            backgroundColor: darkMode
                                ? "#121212"
                                : "#f4f8fb",

                            color: darkMode
                                ? "white"
                                : "black",

                            minHeight: "100vh"
                        }}
                    >

                        <Routes>

                            {/* =================================================
                                PUBLIC ROUTES
                            ================================================= */}

                            <Route
                                path="/"
                                element={<HomeM />}
                            />

                            <Route
                                path="/login"
                                element={<Login />}
                            />

                            <Route
                                path="/register"
                                element={<Register />}
                            />
                            <Route
                                path="/verify-email"
                                element={<VerifyEmail />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />dd
                            <Route
                                path="/resend-verification"
                                element={<ResendVerification />}
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetPassword />}
                            />


                            {/* =================================================
                                PROTECTED APPLICATION ROUTES
                            ================================================= */}

                            <Route
                                element={

                                    <ProtectedRoute>

                                        <AppLayout />

                                    </ProtectedRoute>

                                }
                            >

                                {/* =================================================
                                    HOME
                                ================================================= */}

                                <Route
                                    path="/home"
                                    element={<Home />}
                                />


                                {/* =================================================
                                    PATIENT APPOINTMENTS
                                ================================================= */}

                                <Route
                                    path="/appointments"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "PATIENT"
                                            ]}
                                        >

                                            <Appointments />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    COMMUNITY
                                ================================================= */}

                                <Route
                                    path="/community"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "PATIENT"
                                            ]}
                                        >

                                            <Community />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ANNOUNCEMENTS
                                ================================================= */}

                                <Route
                                    path="/announcements"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "PATIENT",
                                                "ADMIN"
                                            ]}
                                        >

                                            <Announcements />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ADMIN DASHBOARD
                                ================================================= */}

                                <Route
                                    path="/dashboard"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "ADMIN"
                                            ]}
                                        >

                                            <Dashboard />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ADMIN PATIENTS
                                ================================================= */}

                                <Route
                                    path="/patients"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "ADMIN"
                                            ]}
                                        >

                                            <Patients />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ADMIN CLINICS
                                ================================================= */}

                                <Route
                                    path="/clinics"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "ADMIN"
                                            ]}
                                        >

                                            <Clinics />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ADMIN MEDICATIONS
                                ================================================= */}

                                <Route
                                    path="/medications"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "ADMIN"
                                            ]}
                                        >

                                            <Medications />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ADMIN REPORTS
                                ================================================= */}

                                <Route
                                    path="/reports"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "ADMIN"
                                            ]}
                                        >

                                            <Reports />

                                        </RoleProtectedRoute>

                                    }
                                />


                                {/* =================================================
                                    ADMIN APPOINTMENTS
                                    
                                    THIS WAS PREVIOUSLY RENDERING REPORTS.
                                    IT NOW RENDERS AdminAppointments.
                                ================================================= */}

                                <Route
                                    path="/admin/appointments"
                                    element={

                                        <RoleProtectedRoute
                                            allowedRoles={[
                                                "ADMIN"
                                            ]}
                                        >

                                            <AdminAppointments />

                                        </RoleProtectedRoute>

                                    }
                                />

                            </Route>

                        </Routes>

                    </div>

                </ThemeContext.Provider>

            </AuthProvider>

        </BrowserRouter>

    );

}

export default App;

