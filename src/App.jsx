import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ThemeContext from "./context/ThemeContext";

import Home from "./pages/Home";
import Clinics from "./pages/Clinics";
import Patients from "./pages/Patients";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import Announcements from "./pages/Announcements";
import Dashboard from "./pages/Dashboard";

function App() {

    const [darkMode, setDarkMode] = useState(false);

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}
        >

            <div
                style={{
                    backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                    color: darkMode ? "white" : "black",
                    minHeight: "100vh"
                }}
            >

                <BrowserRouter>

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/clinics"
                            element={<Clinics />}
                        />

                        <Route
                            path="/patients"
                            element={<Patients />}
                        />

                        <Route
                            path="/medications"
                            element={<Medications />}
                        />

                        <Route
                            path="/appointments"
                            element={<Appointments />}
                        />

                        <Route
                            path="/community"
                            element={<Community />}
                        />

                        <Route
                            path="/announcements"
                            element={<Announcements />}
                        />

                        <Route
                            path="/reports"
                            element={<Reports />}
                        />

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                    </Routes>

                </BrowserRouter>

            </div>

        </ThemeContext.Provider>

    );

}

export default App;