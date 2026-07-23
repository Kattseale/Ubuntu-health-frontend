import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clinics from "./pages/Clinics";
import Patients from "./pages/Patients";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import Recommendations from "./pages/Recommendations";
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
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;