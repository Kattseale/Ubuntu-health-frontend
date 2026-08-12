import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { getRole } from "../services/authService";
import { getMyAppointments } from "../services/appointmentService";

export default function Home() {

    const navigate = useNavigate();
    const role = getRole();

    const { darkMode } = useContext(ThemeContext);

    const [upcomingAppointment, setUpcomingAppointment] =
        useState(null);

    const [loadingAppointment, setLoadingAppointment] =
        useState(true);


    // =====================================================
    // LOAD UPCOMING PATIENT APPOINTMENT
    // =====================================================

    useEffect(() => {

        if (role !== "PATIENT") {
            setLoadingAppointment(false);
            return;
        }

        const loadUpcomingAppointment = async () => {

            try {

                const appointments =
                    await getMyAppointments();

                const now = new Date();

                const upcoming =
                    (Array.isArray(appointments)
                            ? appointments
                            : []
                    )
                        .filter((appointment) => {

                            if (
                                appointment.status !== "CONFIRMED"
                            ) {
                                return false;
                            }

                            if (
                                !appointment.appointmentDate ||
                                !appointment.appointmentTime
                            ) {
                                return false;
                            }

                            const appointmentDateTime =
                                new Date(
                                    `${appointment.appointmentDate}T${appointment.appointmentTime}`
                                );

                            return appointmentDateTime >= now;

                        })
                        .sort((a, b) => {

                            const dateA =
                                new Date(
                                    `${a.appointmentDate}T${a.appointmentTime}`
                                );

                            const dateB =
                                new Date(
                                    `${b.appointmentDate}T${b.appointmentTime}`
                                );

                            return dateA - dateB;

                        });


                setUpcomingAppointment(
                    upcoming.length > 0
                        ? upcoming[0]
                        : null
                );

            } catch (error) {

                console.error(
                    "Unable to load upcoming appointment:",
                    error
                );

                setUpcomingAppointment(null);

            } finally {

                setLoadingAppointment(false);

            }

        };

        loadUpcomingAppointment();

    }, [role]);


    // =====================================================
    // FORMAT APPOINTMENT DATE
    // =====================================================

    const formatAppointmentDate = (dateString) => {

        if (!dateString) {
            return "";
        }

        const [
            year,
            month,
            day
        ] = dateString
            .split("-")
            .map(Number);

        const date =
            new Date(
                year,
                month - 1,
                day
            );

        return date.toLocaleDateString(
            "en-ZA",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };


    // =====================================================
    // FORMAT TIME
    // =====================================================

    const formatAppointmentTime = (time) => {

        if (!time) {
            return "";
        }

        return time.substring(
            0,
            5
        );

    };


    // =====================================================
    // CARD STYLE
    // =====================================================

    const cardStyle = {

        background:
            darkMode
                ? "#1f1f1f"
                : "#ffffff",

        padding: "25px",

        borderRadius: "12px",

        boxShadow:
            "0 5px 15px rgba(0,0,0,0.15)",

        transition: "0.3s",

        cursor: "pointer"

    };


    // =====================================================
    // BUTTON STYLE
    // =====================================================

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

        <div
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f9ff",
                minHeight: "100vh",
                padding: "10px"
            }}
        >

            {/* =================================================
                HERO
            ================================================= */}

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "40px"
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
                        color:
                            darkMode
                                ? "#ccc"
                                : "#666"
                    }}
                >
                    Welcome to Ubuntu Health. Manage patients, clinics,
                    appointments, medication and healthcare services from
                    one modern platform.
                </p>

            </div>


            {/* =================================================
                UPCOMING APPOINTMENT REMINDER
                PATIENT ONLY
            ================================================= */}

            {role === "PATIENT" && (

                <div
                    style={{
                        marginBottom: "45px",
                        padding: "24px",
                        borderRadius: "16px",

                        background:
                            darkMode
                                ? "#1e1e1e"
                                : "#ffffff",

                        color:
                            darkMode
                                ? "#ffffff"
                                : "#111111",

                        border:
                            darkMode
                                ? "1px solid #333"
                                : "1px solid #e5e7eb",

                        boxShadow:
                            "0 6px 18px rgba(0,0,0,0.10)"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "15px",
                            flexWrap: "wrap",
                            marginBottom: "15px"
                        }}
                    >

                        <div>

                            <h2
                                style={{
                                    margin: 0
                                }}
                            >
                                📅 Upcoming Appointment
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    marginBottom: 0,
                                    color:
                                        darkMode
                                            ? "#aaa"
                                            : "#666"
                                }}
                            >
                                Your next confirmed clinic visit
                            </p>

                        </div>


                        {upcomingAppointment && (

                            <span
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "20px",
                                    background:
                                        darkMode
                                            ? "#263a2d"
                                            : "#ecfdf5",
                                    color:
                                        darkMode
                                            ? "#86efac"
                                            : "#047857",
                                    fontWeight: "700",
                                    fontSize: "13px"
                                }}
                            >
                                ✓ CONFIRMED
                            </span>

                        )}

                    </div>


                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loadingAppointment ? (

                        <div
                            style={{
                                padding: "18px",
                                borderRadius: "10px",
                                background:
                                    darkMode
                                        ? "#252525"
                                        : "#f8fafc",
                                color:
                                    darkMode
                                        ? "#bbb"
                                        : "#666"
                            }}
                        >
                            Checking your appointments...
                        </div>

                    ) : upcomingAppointment ? (

                        /* =================================================
                           UPCOMING APPOINTMENT FOUND
                        ================================================= */

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "25px",
                                flexWrap: "wrap",

                                padding: "20px",

                                borderRadius: "12px",

                                background:
                                    darkMode
                                        ? "#252525"
                                        : "#f8fbff"
                            }}
                        >

                            <div>

                                <h3
                                    style={{
                                        marginTop: 0,
                                        marginBottom: "12px"
                                    }}
                                >
                                    🏥{" "}
                                    {
                                        upcomingAppointment.clinicName ||
                                        "Ubuntu Health Clinic"
                                    }
                                </h3>


                                <p
                                    style={{
                                        margin: "7px 0"
                                    }}
                                >
                                    <strong>
                                        Reason:
                                    </strong>{" "}
                                    {
                                        upcomingAppointment.reason
                                    }
                                </p>


                                <p
                                    style={{
                                        margin: "7px 0"
                                    }}
                                >
                                    📅{" "}
                                    <strong>
                                        {
                                            formatAppointmentDate(
                                                upcomingAppointment.appointmentDate
                                            )
                                        }
                                    </strong>
                                </p>


                                <p
                                    style={{
                                        margin: "7px 0"
                                    }}
                                >
                                    🕐{" "}
                                    <strong>
                                        {
                                            formatAppointmentTime(
                                                upcomingAppointment.appointmentTime
                                            )
                                        }
                                    </strong>
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/appointments")
                                }
                                style={{
                                    background: "#0d6efd",
                                    color: "#ffffff",
                                    border: "none",
                                    padding: "13px 22px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    minWidth: "180px"
                                }}
                            >
                                View My Appointments
                            </button>

                        </div>

                    ) : (

                        /* =================================================
                           NO UPCOMING APPOINTMENT
                        ================================================= */

                        <div
                            style={{
                                padding: "20px",
                                borderRadius: "12px",

                                background:
                                    darkMode
                                        ? "#252525"
                                        : "#f8fafc"
                            }}
                        >

                            <h3
                                style={{
                                    marginTop: 0
                                }}
                            >
                                📅 No upcoming appointments
                            </h3>

                            <p
                                style={{
                                    color:
                                        darkMode
                                            ? "#bbb"
                                            : "#666"
                                }}
                            >
                                You don't currently have a confirmed
                                appointment scheduled.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/appointments")
                                }
                                style={{
                                    background: "#0d6efd",
                                    color: "#ffffff",
                                    border: "none",
                                    padding: "12px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "600"
                                }}
                            >
                                📅 Book an Appointment
                            </button>

                        </div>

                    )}

                </div>

            )}


            {/* =================================================
                PATIENT SERVICES
            ================================================= */}

            {role === "PATIENT" && (

                <>

                    <h2
                        style={{
                            color: "#198754"
                        }}
                    >
                        👥 Patient Services
                    </h2>


                    <p
                        style={{
                            color:
                                darkMode
                                    ? "#ccc"
                                    : "#666",

                            marginBottom: "25px"
                        }}
                    >
                        Services available to patients.
                    </p>


                    <div
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",

                            gap: "25px",

                            marginBottom: "50px"
                        }}
                    >

                        {/* =================================================
                            APPOINTMENTS
                        ================================================= */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                📅 Appointments
                            </h2>

                            <p>
                                Schedule and manage appointments.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/appointments")
                                }
                            >
                                Manage Appointments
                            </button>

                        </div>


                        {/* =================================================
                            COMMUNITY
                        ================================================= */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                👥 Community
                            </h2>

                            <p>
                                Share healthcare updates with other patients.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/community")
                                }
                            >
                                Open Community
                            </button>

                        </div>


                        {/* =================================================
                            ANNOUNCEMENTS
                        ================================================= */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                📢 Announcements
                            </h2>

                            <p>
                                View official clinic announcements.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/announcements")
                                }
                            >
                                View Announcements
                            </button>

                        </div>

                    </div>

                </>

            )}


            {/* =================================================
                ADMINISTRATION
            ================================================= */}

            {role === "ADMIN" && (

                <>

                    <h2
                        style={{
                            color: "#0d6efd"
                        }}
                    >
                        🛠 Administration
                    </h2>


                    <p
                        style={{
                            color:
                                darkMode
                                    ? "#ccc"
                                    : "#666",

                            marginBottom: "25px"
                        }}
                    >
                        Administrative tools for managing Ubuntu Health.
                    </p>


                    <div
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",

                            gap: "25px"
                        }}
                    >

                        {/* DASHBOARD */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                📊 Dashboard
                            </h2>

                            <p>
                                View statistics and system activity.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            >
                                Open Dashboard
                            </button>

                        </div>


                        {/* CLINICS */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                🏥 Clinics
                            </h2>

                            <p>
                                Manage healthcare facilities.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/clinics")
                                }
                            >
                                Manage Clinics
                            </button>

                        </div>


                        {/* PATIENTS */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                👤 Patients
                            </h2>

                            <p>
                                Register and manage patient records.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/patients")
                                }
                            >
                                Manage Patients
                            </button>

                        </div>


                        {/* MEDICATIONS */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                💊 Medications
                            </h2>

                            <p>
                                Manage medication inventory.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/medications")
                                }
                            >
                                Manage Medications
                            </button>

                        </div>


                        {/* REPORTS */}

                        <div
                            style={cardStyle}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >

                            <h2>
                                📈 Reports
                            </h2>

                            <p>
                                View reports and analytics.
                            </p>

                            <button
                                style={buttonStyle}
                                onClick={() =>
                                    navigate("/reports")
                                }
                            >
                                View Reports
                            </button>

                        </div>

                    </div>

                </>

            )}


            {/* =================================================
                FOOTER
            ================================================= */}

            <div
                style={{
                    textAlign: "center",

                    marginTop: "60px",

                    padding: "25px",

                    color:
                        darkMode
                            ? "#bbb"
                            : "#666",

                    borderTop:
                        darkMode
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