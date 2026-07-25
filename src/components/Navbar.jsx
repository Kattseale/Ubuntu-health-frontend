import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    FaHome,
    FaChartBar,
    FaHospital,
    FaUserInjured,
    FaPills,
    FaCalendarAlt,
    FaUserCircle
} from "react-icons/fa";

export default function Navbar() {

    const location = useLocation();

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const hour = currentTime.getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    } else if (hour < 18) {

        greeting = "Good Afternoon";

    }

    const date = currentTime.toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const time = currentTime.toLocaleTimeString();

    const navStyle = {
        backgroundColor: "#0d6efd",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    };

    const menuStyle = {
        display: "flex",
        gap: "12px",
        alignItems: "center"
    };

    const getLinkStyle = (path) => ({
        color: "white",
        textDecoration: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor:
            location.pathname === path
                ? "#084298"
                : "transparent",
        transition: "0.2s"
    });

    return (

        <nav style={navStyle}>

            <div>

                <h2 style={{ margin: 0 }}>
                    🏥 Ubuntu Health
                </h2>

                <small>
                    {greeting}
                </small>

            </div>

            <div style={menuStyle}>

                <Link to="/" style={getLinkStyle("/")}>
                    <FaHome />
                    Home
                </Link>

                <Link
                    to="/dashboard"
                    style={getLinkStyle("/dashboard")}
                >
                    <FaChartBar />
                    Dashboard
                </Link>

                <Link
                    to="/clinics"
                    style={getLinkStyle("/clinics")}
                >
                    <FaHospital />
                    Clinics
                </Link>

                <Link
                    to="/patients"
                    style={getLinkStyle("/patients")}
                >
                    <FaUserInjured />
                    Patients
                </Link>

                <Link
                    to="/medications"
                    style={getLinkStyle("/medications")}
                >
                    <FaPills />
                    Medications
                </Link>

                <Link
                    to="/appointments"
                    style={getLinkStyle("/appointments")}
                >
                    <FaCalendarAlt />
                    Appointments
                </Link>

                <Link
                    to="/community"
                    style={getLinkStyle("/community")}
                >
                    <FaCalendarAlt />
                    Community
                </Link>

                <Link
                    to="/announcemets"
                    style={getLinkStyle("/announcements")}
                >
                    <FaCalendarAlt />
                    Announcements
                </Link>

            </div>

            <div
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

                    <strong>Administrator</strong>

                </div>

                <small>{date}</small>

                <br />

                <small>{time}</small>

            </div>

        </nav>

    );

}