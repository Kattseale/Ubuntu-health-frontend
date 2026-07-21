import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clinics from "./pages/Clinics";
import Patients from "./pages/Patients";
import Medications from "./pages/Medications";
import Recommendations from "./pages/Recommendations";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clinics" element={<Clinics />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/medications" element={<Medications />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;