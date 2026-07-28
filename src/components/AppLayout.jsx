import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { logout } from "../services/authService";
import { getEmail, getRole } from "../services/authService";

export default function AppLayout() {

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const navigate = useNavigate();
    const email = getEmail();
    const role = getRole();
    console.log("Current role:", role);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#0d6efd" : (darkMode ? "#fff" : "#333"),
        fontWeight: isActive ? "bold" : "500",
        padding: "10px 15px",
        borderRadius: "8px",
        transition: "0.3s"
    });

    return (

        <div
            style={{
                minHeight: "100vh",
                background: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "#fff" : "#000"
            }}
        >

            {/* HEADER */}

            <header
                style={{
                    background: "#0d6efd",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 40px"
                }}
            >
<span
    style={{
        alignSelf: "center",
        fontWeight: "bold"
    }}
>
    {email}
</span>
                <div>

                    <h2 style={{ margin: 0 }}>
                        Ubuntu Health Clinic
                    </h2>

                    <small>
                        {role}
                    </small>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            </header>

            {/* NAVIGATION */}

            <nav
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    padding: "15px 30px",
                    background: darkMode ? "#1f1f1f" : "#fff",
                    borderBottom: "1px solid #ddd"
                }}
            >

                <NavLink to="/home" style={navStyle}>
                    🏠 Home
                </NavLink>

                {(role === "PATIENT" || role === "ADMIN") && (
                    <NavLink to="/announcements" style={navStyle}>
                        📢 Announcements
                    </NavLink>
                )}

                {role === "PATIENT" && (
                    <>
                        <NavLink to="/appointments" style={navStyle}>
                            📅 Appointments
                        </NavLink>

                        <NavLink to="/community" style={navStyle}>
                            👥 Community
                        </NavLink>
                    </>
                )}
                {role === "ADMIN" && (
                    <>
                        <NavLink to="/dashboard" style={navStyle}>
                            📊 Dashboard
                        </NavLink>

                        <NavLink to="/patients" style={navStyle}>
                            👥 Patients
                        </NavLink>

                        <NavLink to="/clinics" style={navStyle}>
                            🏥 Clinics
                        </NavLink>

                        <NavLink to="/medications" style={navStyle}>
                            💊 Medications
                        </NavLink>

                        <NavLink to="/reports" style={navStyle}>
                            📈 Reports
                        </NavLink>
                    </>
                )}

            </nav>
            {/* PAGE CONTENT */}

            <main
                style={{
                    padding: "30px"
                }}
            >

                <Outlet />

            </main>

        </div>

    );

}