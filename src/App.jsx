import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clinics from "./pages/Clinics";
import Patients from "./pages/Patients";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import Community from "./pages/Community";
import Announcements from "./pages/Announcements";
import Reports from "./pages/Reports";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clinics" element={<Clinics />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/medications" element={<Medications />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/community" element={<Community />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/Reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;