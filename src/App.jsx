import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";

import "./styles/responsive.css";

import { AuthProvider } from "./context/AuthContext";

import AppLayout from "./components/AppLayout";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import ThemeContext from "./context/ThemeContext";


// Pages
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
import {Register} from "./pages/Register";


function App() {

    const [darkMode, setDarkMode] = useState(false);


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

                                element={

                                    <ProtectedRoute>

                                        <AppLayout />

                                    </ProtectedRoute>

                                }

                            >

                                <Route
                                    path="/home"
                                    element={<Home />}
                                />

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


                            </Route>

                        </Routes>


                    </div>

                </ThemeContext.Provider>

            </AuthProvider>

        </BrowserRouter>

    );

}
export default App;