import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    FaHome,
    FaChartBar,
    FaHospital,
    FaUserInjured,
    FaPills,
    FaCalendarAlt,
    FaUserCircle,
    FaUsers,
    FaBullhorn,
    FaBars,
    FaTimes
} from "react-icons/fa";

import { getRole } from "../services/authService";

export default function Navbar() {

    const location = useLocation();

    const [currentTime, setCurrentTime] =
        useState(new Date());

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const role = getRole();


    // =====================================================
    // CLOCK
    // =====================================================

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);


    // =====================================================
    // CLOSE MOBILE MENU WHEN PAGE CHANGES
    // =====================================================

    useEffect(() => {

        setMobileMenuOpen(false);

    }, [location.pathname]);


    // =====================================================
    // GREETING
    // =====================================================

    const hour = currentTime.getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    } else if (hour < 18) {

        greeting = "Good Afternoon";

    }


    // =====================================================
    // DATE
    // =====================================================

    const date =
        currentTime.toLocaleDateString(
            "en-ZA",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    // =====================================================
    // TIME
    // =====================================================

    const time =
        currentTime.toLocaleTimeString(
            "en-ZA",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    // =====================================================
    // NAVIGATION LINK STYLE
    // =====================================================

    const getLinkStyle = (path) => ({

        color: "white",

        textDecoration: "none",

        padding: "11px 14px",

        borderRadius: "8px",

        fontWeight: "bold",

        display: "flex",

        alignItems: "center",

        gap: "8px",

        backgroundColor:
            location.pathname === path
                ? "#084298"
                : "transparent",

        transition: "0.2s",

        whiteSpace: "nowrap"

    });


    // =====================================================
    // CLOSE MENU
    // =====================================================

    const closeMenu = () => {

        setMobileMenuOpen(false);

    };


    return (

        <>

            {/* =================================================
                MAIN NAVBAR
            ================================================= */}

            <nav
                style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.2)",
                    position: "relative",
                    zIndex: 1000
                }}
            >


                {/* =================================================
                    TOP SECTION
                ================================================= */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px 30px",
                        gap: "20px"
                    }}
                >


                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <div>

                        <h2
                            style={{
                                margin: 0,
                                fontSize: "24px",
                                whiteSpace: "nowrap"
                            }}
                        >
                            🏥 Ubuntu Health
                        </h2>

                        <small>
                            {greeting}
                        </small>

                    </div>


                    {/* =================================================
                        DESKTOP USER INFO
                    ================================================= */}

                    <div
                        className="navbar-user-desktop"
                        style={{
                            textAlign: "right"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                justifyContent: "flex-end"
                            }}
                        >

                            <FaUserCircle size={28} />

                            <strong>
                                {role || "User"}
                            </strong>

                        </div>

                        <small>
                            {date}
                        </small>

                        <br />

                        <small>
                            {time}
                        </small>

                    </div>


                    {/* =================================================
                        MOBILE HAMBURGER
                    ================================================= */}

                    <button
                        className="mobile-menu-button"
                        onClick={() =>
                            setMobileMenuOpen(
                                !mobileMenuOpen
                            )
                        }
                        aria-label="Toggle navigation menu"
                        style={{
                            display: "none",
                            backgroundColor: "transparent",
                            border: "2px solid white",
                            color: "white",
                            borderRadius: "8px",
                            padding: "9px 11px",
                            fontSize: "22px",
                            cursor: "pointer"
                        }}
                    >

                        {mobileMenuOpen
                            ? <FaTimes />
                            : <FaBars />
                        }

                    </button>

                </div>


                {/* =================================================
                    NAVIGATION MENU
                ================================================= */}

                <div
                    className={
                        mobileMenuOpen
                            ? "navbar-menu mobile-open"
                            : "navbar-menu"
                    }
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding:
                            "0 30px 15px 30px",
                        flexWrap: "wrap"
                    }}
                >


                    {/* =================================================
                        HOME
                    ================================================= */}

                    <Link
                        to="/home"
                        style={getLinkStyle("/home")}
                        onClick={closeMenu}
                    >
                        <FaHome />
                        Home
                    </Link>


                    {/* =================================================
                        ADMIN
                    ================================================= */}

                    {role === "ADMIN" && (

                        <>

                            <Link
                                to="/dashboard"
                                style={getLinkStyle(
                                    "/dashboard"
                                )}
                                onClick={closeMenu}
                            >
                                <FaChartBar />
                                Dashboard
                            </Link>


                            <Link
                                to="/admin/appointments"
                                style={getLinkStyle(
                                    "/admin/appointments"
                                )}
                                onClick={closeMenu}
                            >
                                <FaCalendarAlt />
                                Appointments
                            </Link>


                            <Link
                                to="/clinics"
                                style={getLinkStyle(
                                    "/clinics"
                                )}
                                onClick={closeMenu}
                            >
                                <FaHospital />
                                Clinics
                            </Link>


                            <Link
                                to="/patients"
                                style={getLinkStyle(
                                    "/patients"
                                )}
                                onClick={closeMenu}
                            >
                                <FaUserInjured />
                                Patients
                            </Link>

                            <Link
                                to="/medications"
                                style={getLinkStyle(
                                    "/medications"
                                )}
                                onClick={closeMenu}
                            >
                                <FaPills />
                                Medications
                            </Link>


                            <Link
                                to="/reports"
                                style={getLinkStyle(
                                    "/reports"
                                )}
                                onClick={closeMenu}
                            >
                                <FaChartBar />
                                Reports
                            </Link>

                        </>

                    )}


                    {/* =================================================
                        PATIENT APPOINTMENTS
                    ================================================= */}

                    {role === "PATIENT" && (

                        <Link
                            to="/appointments"
                            style={getLinkStyle(
                                "/appointments"
                            )}
                            onClick={closeMenu}
                        >
                            <FaCalendarAlt />
                            My Appointments
                        </Link>

                    )}


                    {/* =================================================
                        COMMUNITY
                    ================================================= */}

                    {role === "PATIENT" && (

                        <Link
                            to="/community"
                            style={getLinkStyle(
                                "/community"
                            )}
                            onClick={closeMenu}
                        >
                            <FaUsers />
                            Community
                        </Link>

                    )}


                    {/* =================================================
                        ANNOUNCEMENTS
                    ================================================= */}

                    {(role === "PATIENT" ||
                        role === "ADMIN") && (

                        <Link
                            to="/announcements"
                            style={getLinkStyle(
                                "/announcements"
                            )}
                            onClick={closeMenu}
                        >
                            <FaBullhorn />
                            Announcements
                        </Link>

                    )}

                </div>


                {/* =================================================
                    MOBILE USER INFORMATION
                ================================================= */}

                {mobileMenuOpen && (

                    <div
                        className="mobile-user-info"
                        style={{
                            borderTop:
                                "1px solid rgba(255,255,255,0.25)",
                            padding: "15px 20px",
                            textAlign: "center"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "5px"
                            }}
                        >

                            <FaUserCircle size={24} />

                            <strong>
                                {role || "User"}
                            </strong>

                        </div>

                        <small>
                            {date}
                        </small>

                        <br />

                        <small>
                            {time}
                        </small>

                    </div>

                )}

            </nav>


            {/* =================================================
                RESPONSIVE CSS
            ================================================= */}

            <style>
                {`

                /* ============================================
                   DESKTOP
                ============================================ */

                .navbar-menu {
                    display: flex;
                }


                /* ============================================
                   TABLET
                ============================================ */

                @media (max-width: 1000px) {

                    .navbar-menu {
                        gap: 5px !important;
                    }

                    .navbar-menu a {
                        font-size: 14px;
                        padding: 9px 10px !important;
                    }

                }


                /* ============================================
                   MOBILE
                ============================================ */

                @media (max-width: 768px) {

                    .navbar-user-desktop {
                        display: none !important;
                    }


                    .mobile-menu-button {
                        display: block !important;
                    }


                    .navbar-menu {
                        display: none !important;

                        flex-direction: column !important;

                        align-items: stretch !important;

                        width: 100%;

                        padding:
                            10px 15px 15px 15px !important;

                        gap: 5px !important;

                        box-sizing: border-box;
                    }


                    .navbar-menu.mobile-open {
                        display: flex !important;
                    }


                    .navbar-menu a {
                        width: 100%;

                        box-sizing: border-box;

                        justify-content: flex-start;

                        padding:
                            13px 15px !important;

                        font-size: 16px;

                        border-radius: 8px;
                    }


                    .navbar-menu a:hover {
                        background-color:
                            rgba(255,255,255,0.15);
                    }


                    nav > div:first-child {
                        padding:
                            13px 18px !important;
                    }


                    nav h2 {
                        font-size: 20px !important;
                    }

                }


                /* ============================================
                   SMALL PHONES
                ============================================ */

                @media (max-width: 480px) {

                    nav h2 {
                        font-size: 18px !important;
                    }


                    nav small {
                        font-size: 12px;
                    }


                    .mobile-menu-button {
                        padding:
                            8px 10px !important;

                        font-size: 19px !important;
                    }


                    .navbar-menu a {
                        font-size: 15px;
                    }

                }

                `}
            </style>

        </>

    );
}