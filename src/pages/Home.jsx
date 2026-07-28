import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { getRole } from "../services/authService";

export default function Home() {

    const navigate = useNavigate();
    const role = getRole();

    const { darkMode } = useContext(ThemeContext);

    const cardStyle = {
        background: darkMode ? "#1f1f1f" : "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        transition: "0.3s",
        cursor: "pointer"
    };

    const buttonStyle = {
        marginTop: "15px",
        background: "#0d6efd",
        color: "#fff",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%"
    };

    return (

        <div>

            {/* HERO */}

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "50px"
                }}
            >

                <h1>
                    Ubuntu-Health Clinic System
                </h1>

                <h3
                    style={{
                        fontWeight: "normal"
                    }}
                >
                    Clinic Management Portal
                </h3>

                <p
                    style={{
                        maxWidth: "700px",
                        margin: "20px auto",
                        color: darkMode ? "#ccc" : "#666"
                    }}
                >
                    Welcome to Ubuntu Health. Manage patients, clinics,
                    appointments, medication and healthcare services from
                    one modern platform.
                </p>

            </div>

            {/* PATIENT SERVICES */}

            {/* PATIENT SERVICES */}

            {role === "PATIENT" && (
                <>
                    <h2 style={{ color: "#198754" }}>
                        👥 Patient Services
                    </h2>

                    <p
                        style={{
                            color: darkMode ? "#ccc" : "#666",
                            marginBottom: "25px"
                        }}
                    >
                        Services available to patients.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                            gap: "25px",
                            marginBottom: "50px"
                        }}
                    >

                        {/* APPOINTMENTS */}

                        <div
                            style={cardStyle}
                            onMouseEnter={(e)=>{
                                e.currentTarget.style.transform="translateY(-8px)";
                            }}
                            onMouseLeave={(e)=>{
                                e.currentTarget.style.transform="translateY(0)";
                            }}
                        >

                            <h2>📅 Appointments</h2>

                            <p>Schedule and manage appointments.</p>

                            <button
                                style={buttonStyle}
                                onClick={()=>navigate("/appointments")}
                            >
                                Manage Appointments
                            </button>

                        </div>

                        {/* COMMUNITY */}

                        <div
                            style={cardStyle}
                            onMouseEnter={(e)=>{
                                e.currentTarget.style.transform="translateY(-8px)";
                            }}
                            onMouseLeave={(e)=>{
                                e.currentTarget.style.transform="translateY(0)";
                            }}
                        >

                            <h2>👥 Community</h2>

                            <p>Share healthcare updates with other patients.</p>

                            <button
                                style={buttonStyle}
                                onClick={()=>navigate("/community")}
                            >
                                Open Community
                            </button>

                        </div>

                        {/* ANNOUNCEMENTS */}

                        <div
                            style={cardStyle}
                            onMouseEnter={(e)=>{
                                e.currentTarget.style.transform="translateY(-8px)";
                            }}
                            onMouseLeave={(e)=>{
                                e.currentTarget.style.transform="translateY(0)";
                            }}
                        >

                            <h2>📢 Announcements</h2>

                            <p>View official clinic announcements.</p>

                            <button
                                style={buttonStyle}
                                onClick={()=>navigate("/announcements")}
                            >
                                View Announcements
                            </button>

                        </div>

                    </div>
                </>
            )}

            {/* ADMINISTRATION */}
            {role === "ADMIN" && (
                <>
            <h2 style={{ color: "#0d6efd" }}>
                🛠 Administration
            </h2>

            <p
                style={{
                    color: darkMode ? "#ccc" : "#666",
                    marginBottom: "25px"
                }}
            >
                Administrative tools for managing Ubuntu Health.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "25px"
                }}
            >

                {/* DASHBOARD */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-8px)";
                    }}
                    onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                    }}
                >

                    <h2>📊 Dashboard</h2>

                    <p>
                        View statistics and system activity.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={()=>navigate("/dashboard")}
                    >
                        Open Dashboard
                    </button>

                </div>

                {/* CLINICS */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-8px)";
                    }}
                    onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                    }}
                >

                    <h2>🏥 Clinics</h2>

                    <p>
                        Manage healthcare facilities.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={()=>navigate("/clinics")}
                    >
                        Manage Clinics
                    </button>

                </div>

                {/* PATIENTS */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-8px)";
                    }}
                    onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                    }}
                >

                    <h2>👤 Patients</h2>

                    <p>
                        Register and manage patient records.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={()=>navigate("/patients")}
                    >
                        Manage Patients
                    </button>

                </div>

                {/* MEDICATIONS */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-8px)";
                    }}
                    onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                    }}
                >

                    <h2>💊 Medications</h2>

                    <p>
                        Manage medication inventory.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={()=>navigate("/medications")}
                    >
                        Manage Medications
                    </button>

                </div>

                {/* REPORTS */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-8px)";
                    }}
                    onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                    }}
                >

                    <h2>📈 Reports</h2>

                    <p>
                        View reports and analytics.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={()=>navigate("/reports")}
                    >
                        View Reports
                    </button>

                </div>
            </div>
                </>
            )}
            {/* FOOTER */}

            <div
                style={{
                    textAlign: "center",
                    marginTop: "60px",
                    padding: "25px",
                    color: darkMode ? "#bbb" : "#666",
                    borderTop: darkMode
                        ? "1px solid #333"
                        : "1px solid #ddd"
                }}
            >

                <strong>
                    Ubuntu Health Management System
                </strong>

                <br />

                <span>
                    Version 1.0
                </span>

                <br />

                <span>
                    © 2026 Ubuntu Health. All Rights Reserved.
                </span>

            </div>

        </div>

    );

}
