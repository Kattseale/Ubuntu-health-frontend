import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logout, getUser } from "../services/authService";

export default function Sidebar() {
    const navigate = useNavigate();

    const role = getRole();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        borderRadius: "10px",
        textDecoration: "none",
        color: isActive ? "#1565f9" : "#ffffff",
        backgroundColor: isActive ? "#ffffff" : "transparent",
        fontWeight: isActive ? "600" : "500",
        transition: "0.3s ease",
    });

    return (
        <div
            style={{
                width: "260px",
                height: "100vh",
                background: "#1565f9",
                color: "#fff",
                position: "fixed",
                left: 0,
                top: 0,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
            }}
        >
            {/* Header */}

            <div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: "30px",
                        fontWeight: "700",
                    }}
                >
                    Ubuntu Health
                </h1>

                <p
                    style={{
                        marginTop: "8px",
                        marginBottom: "25px",
                        color: "#dbeafe",
                        fontSize: "14px",
                        wordBreak: "break-word",
                    }}
                >
                    {user?.email}
                </p>
            </div>

            {/* Navigation */}

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                {/* Everyone */}

                <NavLink to="/dashboard" style={linkStyle}>
                    📊 Dashboard
                </NavLink>

                <NavLink to="/home" style={linkStyle}>
                    🏠 Home
                </NavLink>

                {/* ================= ADMIN ================= */}

                {role === "ADMIN" && (
                    <>
                        <NavLink to="/patients" style={linkStyle}>
                            👨‍⚕️ Patients
                        </NavLink>

                        <NavLink to="/clinics" style={linkStyle}>
                            🏥 Clinics
                        </NavLink>

                        <NavLink to="/medications" style={linkStyle}>
                            💊 Medications
                        </NavLink>

                        <NavLink to="/appointments" style={linkStyle}>
                            📅 Appointments
                        </NavLink>

                        <NavLink to="/reports" style={linkStyle}>
                            📈 Reports
                        </NavLink>

                        <NavLink to="/community" style={linkStyle}>
                            👥 Community
                        </NavLink>

                        <NavLink to="/announcements" style={linkStyle}>
                            📢 Announcements
                        </NavLink>
                    </>
                )}

                {/* ================= DOCTOR ================= */}

                {role === "DOCTOR" && (
                    <>
                        <NavLink to="/patients" style={linkStyle}>
                            👨‍⚕️ Patients
                        </NavLink>

                        <NavLink to="/appointments" style={linkStyle}>
                            📅 Appointments
                        </NavLink>

                        <NavLink to="/medications" style={linkStyle}>
                            💊 Medications
                        </NavLink>

                        <NavLink to="/community" style={linkStyle}>
                            👥 Community
                        </NavLink>

                        <NavLink to="/announcements" style={linkStyle}>
                            📢 Announcements
                        </NavLink>
                    </>
                )}

                {/* ================= NURSE ================= */}

                {role === "NURSE" && (
                    <>
                        <NavLink to="/patients" style={linkStyle}>
                            👨‍⚕️ Patients
                        </NavLink>

                        <NavLink to="/appointments" style={linkStyle}>
                            📅 Appointments
                        </NavLink>

                        <NavLink to="/medications" style={linkStyle}>
                            💊 Medications
                        </NavLink>

                        <NavLink to="/community" style={linkStyle}>
                            👥 Community
                        </NavLink>

                        <NavLink to="/announcements" style={linkStyle}>
                            📢 Announcements
                        </NavLink>
                    </>
                )}

                {/* ================= RECEPTIONIST ================= */}

                {role === "RECEPTIONIST" && (
                    <>
                        <NavLink to="/patients" style={linkStyle}>
                            👨‍⚕️ Patients
                        </NavLink>

                        <NavLink to="/clinics" style={linkStyle}>
                            🏥 Clinics
                        </NavLink>

                        <NavLink to="/appointments" style={linkStyle}>
                            📅 Appointments
                        </NavLink>

                        <NavLink to="/community" style={linkStyle}>
                            👥 Community
                        </NavLink>

                        <NavLink to="/announcements" style={linkStyle}>
                            📢 Announcements
                        </NavLink>
                    </>
                )}

                {/* ================= PATIENT ================= */}

                {role === "PATIENT" && (
                    <>
                        <NavLink to="/appointments" style={linkStyle}>
                            📅 My Appointments
                        </NavLink>

                        <NavLink to="/recommendations" style={linkStyle}>
                            ❤️ Recommendations
                        </NavLink>

                        <NavLink to="/community" style={linkStyle}>
                            👥 Community
                        </NavLink>

                        <NavLink to="/announcements" style={linkStyle}>
                            📢 Announcements
                        </NavLink>
                    </>
                )}
            </nav>

            {/* Logout */}

            <button
                onClick={handleLogout}
                style={{
                    padding: "14px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#ef4444",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginTop: "20px",
                }}
            >
                🚪 Logout
            </button>
        </div>
    );
}