import { useNavigate } from "react-router-dom";
import { getRole } from "../services/authService";

export default function Home() {

    const navigate = useNavigate();
    const role = getRole();

    const cardStyle = {
        backgroundColor: "#fff",
        borderRadius: "15px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        transition: ".25s",
        cursor: "pointer"
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "12px 22px",
        backgroundColor: "#0d6efd",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
    };

    const hover = {
        onMouseEnter: (e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
                "0 12px 25px rgba(0,0,0,.25)";
        },
        onMouseLeave: (e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
                "0 5px 15px rgba(0,0,0,.15)";
        }
    };

    const Card = ({ title, description, button, link }) => (
        <div style={cardStyle} {...hover}>
            <h2>{title}</h2>

            <p>{description}</p>

            <button
                style={buttonStyle}
                onClick={() => navigate(link)}
            >
                {button}
            </button>
        </div>
    );

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f4f8fb",
                padding: "40px"
            }}
        >

            {/* HERO */}

            <div
                style={{
                    background: "linear-gradient(90deg,#0d6efd,#198754)",
                    color: "#fff",
                    padding: "40px",
                    borderRadius: "15px",
                    textAlign: "center",
                    marginBottom: "40px",
                    boxShadow: "0 6px 18px rgba(0,0,0,.2)"
                }}
            >

                <h1>Welcome {role}</h1>

                <h3>Ubuntu Health Management System</h3>

                

            </div>

            {/* AVAILABLE SERVICES */}

            <h2 style={{ color: "#0d6efd" }}>
                Available Services
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(260px,1fr))",
                    gap: "25px",
                    marginTop: "20px"
                }}
            >

                {/* Everyone */}

                <Card
                    title="📅 Appointments"
                    description="Manage appointments and schedules."
                    button="Open Appointments"
                    link="/appointments"
                />

                <Card
                    title="📢 Announcements"
                    description="Read clinic announcements and notices."
                    button="Open Announcements"
                    link="/announcements"
                />

                {/* Patient */}

                {role === "PATIENT" && (
                    <>
                        <Card
                            title="❤️ Recommendations"
                            description="View personalized healthcare recommendations."
                            button="View Recommendations"
                            link="/recommendations"
                        />

                        <Card
                            title="👥 Community"
                            description="Join discussions with other patients."
                            button="Open Community"
                            link="/community"
                        />
                    </>
                )}

                {/* Doctor */}

                {role === "DOCTOR" && (
                    <>
                        <Card
                            title="👤 Patients"
                            description="View and manage your patients."
                            button="Manage Patients"
                            link="/patients"
                        />

                        <Card
                            title="💊 Medications"
                            description="Manage medications and prescriptions."
                            button="Manage Medications"
                            link="/medications"
                        />

                        <Card
                            title="👥 Community"
                            description="Collaborate with healthcare professionals."
                            button="Open Community"
                            link="/community"
                        />
                    </>
                )}

                {/* Nurse */}

                {role === "NURSE" && (
                    <>
                        <Card
                            title="👤 Patients"
                            description="Assist in managing patient records."
                            button="Manage Patients"
                            link="/patients"
                        />

                        <Card
                            title="💊 Medications"
                            description="Manage medication administration."
                            button="Manage Medications"
                            link="/medications"
                        />

                        <Card
                            title="👥 Community"
                            description="Collaborate with healthcare professionals."
                            button="Open Community"
                            link="/community"
                        />
                    </>
                )}

                {/* Receptionist */}

                {role === "RECEPTIONIST" && (
                    <>
                        <Card
                            title="👤 Patients"
                            description="Register and manage patients."
                            button="Manage Patients"
                            link="/patients"
                        />

                        <Card
                            title="🏥 Clinics"
                            description="Manage clinic information."
                            button="Manage Clinics"
                            link="/clinics"
                        />

                        <Card
                            title="👥 Community"
                            description="Collaborate with staff."
                            button="Open Community"
                            link="/community"
                        />
                    </>
                )}

                {/* Admin */}

                {role === "ADMIN" && (
                    <>
                        <Card
                            title="👤 Patients"
                            description="Manage all patient records."
                            button="Manage Patients"
                            link="/patients"
                        />

                        <Card
                            title="🏥 Clinics"
                            description="Manage clinics."
                            button="Manage Clinics"
                            link="/clinics"
                        />

                        <Card
                            title="💊 Medications"
                            description="Manage medication inventory."
                            button="Manage Medications"
                            link="/medications"
                        />

                        <Card
                            title="📈 Reports"
                            description="View reports and analytics."
                            button="Open Reports"
                            link="/reports"
                        />
                    </>
                )}

            </div>

            {/* ROLE DESCRIPTION */}

            <div
                style={{
                    marginTop: "50px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,.15)"
                }}
            >

                <h2>{role}</h2>

                {role === "ADMIN" && (
                    <p>
                        You have full system access including clinics,
                        patients, medications, appointments and reports.
                    </p>
                )}

                {role === "DOCTOR" && (
                    <p>
                        You can manage patients, medications,
                        appointments and collaborate with staff.
                    </p>
                )}

                {role === "NURSE" && (
                    <p>
                        You can assist doctors by managing patients,
                        medications and appointments.
                    </p>
                )}

                {role === "RECEPTIONIST" && (
                    <p>
                        You can register patients, manage clinics
                        and schedule appointments.
                    </p>
                )}

                {role === "PATIENT" && (
                    <p>
                        You can book appointments, receive health
                        recommendations, join the community and stay
                        informed through announcements.
                    </p>
                )}

            </div>

            <hr style={{ marginTop: "50px" }} />

            <div
                style={{
                    textAlign: "center",
                    color: "#777",
                    marginTop: "20px"
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