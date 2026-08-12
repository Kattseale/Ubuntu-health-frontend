import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";

import ThemeContext from "../context/ThemeContext";

import Navbar from "./Navbar";

import {
    getEmail,
    getRole,
    logout
} from "../services/authService";


export default function AppLayout() {

    const { darkMode, setDarkMode } =
        useContext(ThemeContext);

    const navigate = useNavigate();

    const email = getEmail();
    const role = getRole();


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    // =====================================================
    // PAGE STYLES
    // =====================================================

    const pageStyle = {

        minHeight: "100vh",

        backgroundColor:
            darkMode
                ? "#121212"
                : "#f4f8fb",

        color:
            darkMode
                ? "#ffffff"
                : "#212529",

        transition: "background-color 0.3s ease, color 0.3s ease"

    };


    // =====================================================
    // TOP HEADER
    // =====================================================

    const headerStyle = {

        backgroundColor:
            darkMode
                ? "#1b1b1b"
                : "#0d6efd",

        color: "white",

        padding: "12px 24px",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        gap: "20px",

        flexWrap: "wrap",

        boxShadow:
            "0 3px 10px rgba(0,0,0,0.15)"

    };


    return (

        <div style={pageStyle}>

            {/* =================================================
                TOP HEADER
            ================================================= */}

            <header style={headerStyle}>


                {/* =================================================
                    EMAIL
                ================================================= */}

                <div
                    style={{
                        flex: "1 1 200px",
                        minWidth: 0
                    }}
                >

                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {email || "User"}
                    </div>

                </div>


                {/* =================================================
                    BRAND
                ================================================= */}

                <div
                    style={{
                        flex: "1 1 250px",
                        textAlign: "center"
                    }}
                >

                    <div
                        style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            lineHeight: "1.1"
                        }}
                    >
                        Ubuntu Health Clinic
                    </div>

                    <div
                        style={{
                            fontSize: "16px",
                            marginTop: "3px"
                        }}
                    >
                        {role || "USER"}
                    </div>

                </div>


                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div
                    style={{
                        flex: "1 1 200px",

                        display: "flex",

                        justifyContent: "flex-end",

                        alignItems: "center",

                        gap: "10px",

                        flexWrap: "wrap"
                    }}
                >


                    {/* DARK MODE */}

                    <button
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        style={{
                            border: "none",

                            borderRadius: "6px",

                            padding: "8px 12px",

                            fontSize: "20px",

                            backgroundColor:
                                darkMode
                                    ? "#333333"
                                    : "#ffffff",

                            color:
                                darkMode
                                    ? "#ffffff"
                                    : "#212529",

                            cursor: "pointer",

                            minWidth: "45px",

                            minHeight: "38px"
                        }}
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>


                    {/* LOGOUT */}

                    <button
                        onClick={handleLogout}
                        style={{
                            border: "none",

                            borderRadius: "6px",

                            padding: "8px 14px",

                            fontSize: "16px",

                            fontWeight: "bold",

                            backgroundColor:
                                darkMode
                                    ? "#ffffff"
                                    : "#ffffff",

                            color: "#212529",

                            cursor: "pointer",

                            minHeight: "38px"
                        }}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* =================================================
                NAVIGATION
            ================================================= */}

            <Navbar />


            {/* =================================================
                PAGE CONTENT
            ================================================= */}

            <main
                style={{
                    width: "100%",
                    boxSizing: "border-box"
                }}
            >

                <Outlet />

            </main>

        </div>

    );
}