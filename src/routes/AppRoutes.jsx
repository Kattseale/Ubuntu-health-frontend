import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Notifications from "../pages/notifications/Notifications";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";

// Pages
import Patients from "../pages/patients/Patients";
import Appointments from "../pages/appointments/Appointments";
import MedicalRecords from "../pages/medicalRecords/MedicalRecords";
import Medications from "../pages/medications/Medications";
import Clinics from "../pages/clinics/Clinics";
import Users from "../pages/users/Users";
import Doctors from "../pages/doctors/Doctors";
import Reports from "../pages/Reports";

const AppRoutes = () => {

    return (

        <Routes>

            {/* Redirect Root */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* ===========================
               PUBLIC ROUTES
            ============================ */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* ===========================
               PROTECTED ROUTES
            ============================ */}

            {/* Dashboard */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Users */}

            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Users />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Patients */}

            <Route
                path="/patients"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Patients />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Doctors */}

            <Route
                path="/doctors"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Doctors />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Clinics */}

            <Route
                path="/clinics"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Clinics />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Appointments */}

            <Route
                path="/appointments"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Appointments />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Medical Records */}

            <Route
                path="/medical-records"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <MedicalRecords />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Medications */}

            <Route
                path="/medications"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Medications />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* ===========================
               404 PAGE
            ============================ */}

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

            {/*Notifications*/}
            <Route
             path="/notifications"
             element={
            <ProtectedRoute>
                <DashboardLayout>
                      <Notifications />
                  </DashboardLayout>
            </ProtectedRoute>
    }
/>
          
            {/* Reports & Analytics*/}
            <Route
            path="/reports"
            element={
             <ProtectedRoute>
                  <DashboardLayout>
                 <Reports />
               </DashboardLayout>
        </ProtectedRoute>
    }
/>

        </Routes>



    );

};

export default AppRoutes;