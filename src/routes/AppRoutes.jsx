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

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/community" element={<Community />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/reports" element={<Reports />} />
        </Routes>
    );
};

export default AppRoutes;