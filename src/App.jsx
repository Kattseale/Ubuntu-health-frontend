import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomeM from "./pages/HomeM";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Clinics from "./pages/Clinics";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import Announcements from "./pages/Announcements";
import Recommendations from "./pages/Recommendations";

import Sidebar from "./components/Sidebar";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function Layout({ children }) {
    return (
        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    padding: "20px",
                    minHeight: "100vh",
                    background: "#f4f8fb"
                }}
            >
                {children}
            </div>
        </>
    );
}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= PUBLIC ================= */}

                <Route path="/" element={<HomeM />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ================= DASHBOARD ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Home />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* ================= PATIENTS ================= */}

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
                                <Layout>
                                    <Patients />
                                </Layout>
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                {/* ================= CLINICS ================= */}

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
                                <Layout>
                                    <Clinics />
                                </Layout>
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                {/* ================= MEDICATIONS ================= */}

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
                                <Layout>
                                    <Medications />
                                </Layout>
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                {/* ================= APPOINTMENTS ================= */}

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Appointments />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* ================= COMMUNITY ================= */}

                <Route
                    path="/community"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Community />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* ================= ANNOUNCEMENTS ================= */}

                <Route
                    path="/announcements"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Announcements />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* ================= REPORTS ================= */}

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <RoleRoute allowedRoles={["ADMIN"]}>
                                <Layout>
                                    <Reports />
                                </Layout>
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                {/* ================= RECOMMENDATIONS ================= */}

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <RoleRoute allowedRoles={["PATIENT"]}>
                                <Layout>
                                    <Recommendations />
                                </Layout>
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;