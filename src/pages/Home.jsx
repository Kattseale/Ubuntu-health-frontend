import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        transition: "0.25s",
        cursor: "pointer"
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "12px 22px",
        backgroundColor: "#0d6efd",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "15px"
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f4f8fb",
                padding: "40px"
            }}
        >

            <div
                style={{
                    background: "linear-gradient(90deg,#0d6efd,#198754)",
                    color: "white",
                    padding: "40px",
                    borderRadius: "15px",
                    textAlign: "center",
                    marginBottom: "40px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
                }}
            >

                <h1 style={{ margin: 0 }}>
                    Ubuntu Health Management System
                </h1>

                <h3
                    style={{
                        marginTop: "10px",
                        fontWeight: "normal"
                    }}
                >
                    Clinic Management Portal
                </h3>

                <p style={{ marginTop: "15px" }}>
                    Welcome! Manage clinics, patients, medications and appointments from one place.
                </p>

            </div>

            <h2 style={{ marginTop: "20px", color: "#198754" }}>
                👥 Patient Services
            </h2>

            <p style={{ color: "#666", marginBottom: "20px" }}>
                Services available to patients using Ubuntu Health.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
                    gap: "25px",
                    marginBottom: "50px"
                }}
            >

                {/* Appointments */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>📅 Appointments</h2>

                    <p>
                        Schedule and manage patient appointments.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/appointments")}
                    >
                        Manage Appointments
                    </button>

                </div>

                {/* Community */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>👥 Community</h2>

                    <p>
                        Share updates with other patients about clinic queues,
                        waiting times and healthcare services.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/community")}
                    >
                        Open Community
                    </button>

                </div>

                {/* Announcements */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>📢 Announcements</h2>

                    <p>
                        Stay informed with official updates, notices, clinic schedules,
                        and important healthcare announcements.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/announcements")}
                    >
                        View Announcements
                    </button>

                </div>
            </div>
            <h2 style={{ color: "#0d6efd" }}>
                🛠 Administration
            </h2>

            <p style={{ color: "#666", marginBottom: "20px" }}>
                Administrative tools for managing clinics, patients and healthcare data.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
                    gap: "25px"
                }}
            >
                {/* Dashboard */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>📊 Dashboard</h2>

                    <p>
                        View system statistics and recent activity.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/dashboard")}
                    >
                        Open Dashboard
                    </button>

                </div>

                {/* Clinics */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>🏥 Clinics</h2>

                    <p>
                        Add, edit and manage clinic information.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/clinics")}
                    >
                        Manage Clinics
                    </button>

                </div>

                {/* Patients */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>👤 Patients</h2>

                    <p>
                        Register and manage patient records.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/patients")}
                    >
                        Manage Patients
                    </button>

                </div>

                {/* Medications */}

                <div
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 25px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.15)";
                    }}
                >

                    <h2>💊 Medications</h2>

                    <p>
                        Maintain medication inventory and stock.
                    </p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/medications")}
                    >
                        Manage Medications
                    </button>

                </div>

            </div>


            <hr style={{ marginTop: "60px" }} />

            <div
                style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: "20px",
                    fontSize: "14px"
                }}
            >

                <strong>Ubuntu Health Management System</strong>

                <br />

                Version 1.0

                <br />

                © 2026 Ubuntu Health. All Rights Reserved.

            </div>

        </div>

    );

}