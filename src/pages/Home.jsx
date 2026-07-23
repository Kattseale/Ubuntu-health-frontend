import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "25px",
        textAlign: "center",
        boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
    };

    const buttonStyle = {
        marginTop: "15px",
        padding: "10px 18px",
        backgroundColor: "#0d6efd",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    };

    return (
        <div style={{ padding: "40px" }}>

            <h1>Ubuntu Health Management System</h1>

            <p>
                Welcome to the Clinic Management Dashboard
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
                    gap: "20px",
                    marginTop: "40px"
                }}
            >

                <div style={cardStyle}>
                    <h2>📊 Dashboard</h2>
                    <p>View system statistics</p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/dashboard")}
                    >
                        Open Dashboard
                    </button>
                </div>

                <div style={cardStyle}>
                    <h2>🏥 Clinics</h2>
                    <p>Manage clinics</p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/clinics")}
                    >
                        Manage Clinics
                    </button>
                </div>

                <div style={cardStyle}>
                    <h2>👤 Patients</h2>
                    <p>Manage patients</p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/patients")}
                    >
                        Manage Patients
                    </button>
                </div>

                <div style={cardStyle}>
                    <h2>💊 Medications</h2>
                    <p>Manage medications</p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/medications")}
                    >
                        Manage Medications
                    </button>
                </div>

                <div style={cardStyle}>
                    <h2>📅 Appointments</h2>
                    <p>Manage appointments</p>

                    <button
                        style={buttonStyle}
                        onClick={() => navigate("/appointments")}
                    >
                        Manage Appointments
                    </button>
                </div>

            </div>

        </div>
    );
}