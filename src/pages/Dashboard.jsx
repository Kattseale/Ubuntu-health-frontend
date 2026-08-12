import {
    useEffect,
    useState,
    useContext
} from "react";

import ThemeContext from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import DashboardChart from "../components/DashboardChart";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { getAllMedications } from "../services/medicationService";

import {
    getAllAppointments,
    getMyAppointments
} from "../services/appointmentService";

import { getAllAnnouncements } from "../services/announcementService";


export default function Dashboard() {


    // =====================================================
    // CONTEXT
    // =====================================================

    const { darkMode } =
        useContext(ThemeContext);

    const { user } =
        useAuth();


    // =====================================================
    // STATE
    // =====================================================

    const [stats, setStats] = useState({

        patients: 0,

        clinics: 0,

        medications: 0,

        appointments: 0,

        todayAppointments: 0

    });


    const [upcomingAppointment, setUpcomingAppointment] =
        useState(null);


    const [appointments, setAppointments] =
        useState([]);


    const [recentAppointments, setRecentAppointments] =
        useState([]);


    const [announcements, setAnnouncements] =
        useState([]);


    // =====================================================
    // LOAD DASHBOARD
    // =====================================================

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                // =========================================
                // LOAD GENERAL DASHBOARD DATA
                // =========================================

                const patients =
                    await getAllPatients();

                const clinics =
                    await getAllClinics();

                const medications =
                    await getAllMedications();

                const allAppointments =
                    await getAllAppointments();

                const announcementsData =
                    await getAllAnnouncements();


                setAppointments(
                    allAppointments
                );


                setAnnouncements(
                    announcementsData.slice(0, 3)
                );


                // =========================================
                // FIND UPCOMING APPOINTMENT
                // =========================================

                let upcoming = [];

                const now =
                    new Date();


                // =========================================
                // PATIENT
                // =========================================

                if (
                    user?.role === "PATIENT"
                ) {

                    try {

                        const myAppointments =
                            await getMyAppointments();


                        upcoming =
                            myAppointments.filter(
                                (appointment) => {

                                    if (
                                        appointment.status !==
                                        "CONFIRMED"
                                    ) {

                                        return false;

                                    }


                                    const appointmentDateTime =
                                        new Date(
                                            `${appointment.appointmentDate}T${appointment.appointmentTime}`
                                        );


                                    return (
                                        appointmentDateTime >=
                                        now
                                    );

                                }
                            );

                    } catch (error) {

                        console.error(
                            "Unable to load patient appointments:",
                            error
                        );

                    }

                }


                    // =========================================
                    // STAFF
                // =========================================

                else {

                    upcoming =
                        allAppointments.filter(
                            (appointment) => {

                                if (
                                    appointment.status !==
                                    "CONFIRMED"
                                ) {

                                    return false;

                                }


                                const appointmentDateTime =
                                    new Date(
                                        `${appointment.appointmentDate}T${appointment.appointmentTime}`
                                    );


                                return (
                                    appointmentDateTime >=
                                    now
                                );

                            }
                        );

                }


                // =========================================
                // SORT UPCOMING APPOINTMENTS
                // =========================================

                upcoming.sort(
                    (a, b) => {

                        const dateA =
                            new Date(
                                `${a.appointmentDate}T${a.appointmentTime}`
                            );


                        const dateB =
                            new Date(
                                `${b.appointmentDate}T${b.appointmentTime}`
                            );


                        return dateA - dateB;

                    }
                );


                // =========================================
                // SET NEXT APPOINTMENT
                // =========================================

                setUpcomingAppointment(

                    upcoming.length > 0
                        ? upcoming[0]
                        : null

                );


                // =========================================
                // TODAY
                // =========================================

                const today =
                    new Date();

                today.setHours(
                    0,
                    0,
                    0,
                    0
                );


                const todayString =
                    `${today.getFullYear()}-` +
                    `${String(
                        today.getMonth() + 1
                    ).padStart(2, "0")}-` +
                    `${String(
                        today.getDate()
                    ).padStart(2, "0")}`;


                // =========================================
                // TODAY'S APPOINTMENTS
                // =========================================

                const todaysAppointments =
                    allAppointments
                        .filter(
                            (appointment) =>
                                appointment.appointmentDate ===
                                todayString
                        )
                        .sort(
                            (a, b) => {

                                const dateA =
                                    new Date(
                                        `${a.appointmentDate}T${a.appointmentTime}`
                                    );


                                const dateB =
                                    new Date(
                                        `${b.appointmentDate}T${b.appointmentTime}`
                                    );


                                return dateA - dateB;

                            }
                        );


                setRecentAppointments(
                    todaysAppointments
                );


                // =========================================
                // DASHBOARD STATS
                // =========================================

                setStats({

                    patients:
                    patients.length,

                    clinics:
                    clinics.length,

                    medications:
                    medications.length,

                    appointments:
                    allAppointments.length,

                    todayAppointments:
                    todaysAppointments.length

                });

            } catch (error) {

                console.error(
                    "Unable to load dashboard:",
                    error
                );

            }

        };


        loadDashboard();

    }, [user]);


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div
            className="page"
            style={{

                minHeight: "100vh",

                backgroundColor:
                    darkMode
                        ? "#121212"
                        : "#f4f8fb",

                color:
                    darkMode
                        ? "white"
                        : "black",

                padding: "20px"

            }}
        >


            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="page"
                style={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    marginBottom:
                        "30px",

                    gap: "20px",

                    flexWrap: "wrap"

                }}
            >

                <div>

                    <h1
                        style={{
                            margin: 0
                        }}
                    >
                        👋 Welcome to Ubuntu Health
                    </h1>


                    <p
                        style={{

                            color:
                                darkMode
                                    ? "#ccc"
                                    : "#666",

                            marginTop:
                                "8px"

                        }}
                    >
                        Manage patients, clinics,
                        appointments and community
                        activity from one place.
                    </p>

                </div>


                <div
                    className="page"
                    style={{
                        textAlign: "right"
                    }}
                >

                    <h3
                        style={{
                            margin: 0
                        }}
                    >
                        {new Date().toLocaleDateString()}
                    </h3>


                    <p
                        style={{
                            color:
                                darkMode
                                    ? "#aaa"
                                    : "#777"
                        }}
                    >
                        Dashboard Overview
                    </p>

                </div>

            </div>


            {/* =================================================
                UPCOMING APPOINTMENT REMINDER
            ================================================= */}

            <div
                style={{

                    backgroundColor:
                        darkMode
                            ? "#1e1e1e"
                            : "#ffffff",

                    color:
                        darkMode
                            ? "#ffffff"
                            : "#111111",

                    borderRadius:
                        "16px",

                    padding:
                        "24px",

                    marginBottom:
                        "30px",

                    boxShadow:
                        "0 8px 20px rgba(0,0,0,0.10)",

                    border:
                        darkMode
                            ? "1px solid #333"
                            : "1px solid #e5e7eb"

                }}
            >

                <h2
                    style={{
                        marginTop: 0
                    }}
                >

                    {user?.role === "PATIENT"
                        ? "📅 Your Upcoming Appointment"
                        : "📅 Next Scheduled Appointment"}

                </h2>


                {upcomingAppointment ? (

                    <div
                        style={{

                            display: "flex",

                            justifyContent:
                                "space-between",

                            alignItems:
                                "center",

                            gap: "20px",

                            flexWrap:
                                "wrap"

                        }}
                    >

                        {/* APPOINTMENT DETAILS */}

                        <div>

                            <h3
                                style={{
                                    margin:
                                        "0 0 10px"
                                }}
                            >
                                🏥{" "}
                                {
                                    upcomingAppointment
                                        .clinicName
                                }
                            </h3>


                            <p
                                style={{
                                    margin:
                                        "6px 0"
                                }}
                            >

                                <strong>
                                    Patient:
                                </strong>{" "}

                                {
                                    upcomingAppointment
                                        .patientName
                                }

                            </p>


                            <p
                                style={{
                                    margin:
                                        "6px 0"
                                }}
                            >

                                <strong>
                                    Reason:
                                </strong>{" "}

                                {
                                    upcomingAppointment
                                        .reason
                                }

                            </p>


                            <p
                                style={{
                                    margin:
                                        "6px 0"
                                }}
                            >

                                📅{" "}

                                <strong>

                                    {new Date(
                                        `${upcomingAppointment.appointmentDate}T00:00:00`
                                    ).toLocaleDateString(
                                        "en-ZA",
                                        {
                                            weekday:
                                                "long",

                                            day:
                                                "numeric",

                                            month:
                                                "long",

                                            year:
                                                "numeric"
                                        }
                                    )}

                                </strong>

                            </p>


                            <p
                                style={{
                                    margin:
                                        "6px 0"
                                }}
                            >

                                🕐{" "}

                                <strong>

                                    {
                                        upcomingAppointment
                                            .appointmentTime
                                            ?.substring(
                                                0,
                                                5
                                            )
                                    }

                                </strong>

                            </p>

                        </div>


                        {/* CONFIRMED BADGE */}

                        <div
                            style={{

                                padding:
                                    "14px 20px",

                                borderRadius:
                                    "12px",

                                backgroundColor:
                                    darkMode
                                        ? "#263a2d"
                                        : "#ecfdf5",

                                color:
                                    darkMode
                                        ? "#86efac"
                                        : "#047857",

                                fontWeight:
                                    "700",

                                textAlign:
                                    "center"

                            }}
                        >
                            ✓ CONFIRMED
                        </div>

                    </div>

                ) : (

                    <div
                        style={{

                            padding:
                                "20px",

                            borderRadius:
                                "12px",

                            backgroundColor:
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

                            📅{" "}

                            {user?.role === "PATIENT"
                                ? "No upcoming appointments"
                                : "No upcoming scheduled appointments"}

                        </h3>


                        <p
                            style={{
                                color:
                                    darkMode
                                        ? "#bbb"
                                        : "#666"
                            }}
                        >

                            {user?.role === "PATIENT"
                                ? "You don't currently have a confirmed appointment scheduled."
                                : "There are currently no confirmed appointments scheduled."}

                        </p>

                    </div>

                )}

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div
                className="dashboard-grid"
                style={{
                    marginTop: "30px"
                }}
            >

                <div
                    className="page"
                    style={{
                        ...cardStyle,
                        backgroundColor:
                            "#0d6efd"
                    }}
                >

                    <h2>
                        👥 Patients
                    </h2>

                    <h1
                        style={{
                            fontSize:
                                "48px",

                            margin:
                                "15px 0"
                        }}
                    >
                        {stats.patients}
                    </h1>

                </div>


                <div
                    className="page"
                    style={{
                        ...cardStyle,
                        backgroundColor:
                            "#198754"
                    }}
                >

                    <h2>
                        🏥 Clinics
                    </h2>

                    <h1
                        style={{
                            fontSize:
                                "48px",

                            margin:
                                "15px 0"
                        }}
                    >
                        {stats.clinics}
                    </h1>

                </div>


                <div
                    className="page"
                    style={{
                        ...cardStyle,
                        backgroundColor:
                            "#fd7e14"
                    }}
                >

                    <h2>
                        💊 Medications
                    </h2>

                    <h1
                        style={{
                            fontSize:
                                "48px",

                            margin:
                                "15px 0"
                        }}
                    >
                        {stats.medications}
                    </h1>

                </div>


                <div
                    className="page"
                    style={{
                        ...cardStyle,
                        backgroundColor:
                            "#6f42c1"
                    }}
                >

                    <h2>
                        📅 Appointments
                    </h2>

                    <h1
                        style={{
                            fontSize:
                                "48px",

                            margin:
                                "15px 0"
                        }}
                    >
                        {stats.appointments}
                    </h1>

                </div>


                <div
                    className="page"
                    style={{
                        ...cardStyle,
                        backgroundColor:
                            "#dc3545"
                    }}
                >

                    <h2>
                        ⏰ Today's Appointments
                    </h2>

                    <h1
                        style={{
                            fontSize:
                                "48px",

                            margin:
                                "15px 0"
                        }}
                    >
                        {stats.todayAppointments}
                    </h1>

                </div>

            </div>


            {/* =================================================
                APPOINTMENT CHART
            ================================================= */}

            <div
                className="card"
                style={{

                    backgroundColor:
                        darkMode
                            ? "#1e1e1e"
                            : "white",

                    color:
                        darkMode
                            ? "white"
                            : "black"

                }}
            >

                <h2>
                    📊 Appointment Status
                </h2>


                <DashboardChart
                    appointments={
                        appointments
                    }
                />

            </div>


            {/* =================================================
                TODAY'S SCHEDULE
            ================================================= */}

            <h2
                style={{
                    marginTop:
                        "50px"
                }}
            >
                📅 Today's Schedule
            </h2>


            <div
                className="card"
                style={{

                    backgroundColor:
                        darkMode
                            ? "#1e1e1e"
                            : "white",

                    color:
                        darkMode
                            ? "white"
                            : "black"

                }}
            >

                <div
                    className="table-container"
                >

                    <table
                        style={{

                            width:
                                "100%",

                            borderCollapse:
                                "collapse",

                            marginTop:
                                "15px",

                            backgroundColor:
                                darkMode
                                    ? "#1e1e1e"
                                    : "#ffffff",

                            color:
                                darkMode
                                    ? "#ffffff"
                                    : "#000000"

                        }}
                    >

                        <thead>

                        <tr
                            style={{
                                backgroundColor:
                                    darkMode
                                        ? "#333"
                                        : "#e9ecef"
                            }}
                        >

                            <th
                                style={{
                                    padding:
                                        "12px",

                                    border:
                                        "1px solid #555"
                                }}
                            >
                                Patient
                            </th>


                            <th
                                style={{
                                    padding:
                                        "12px",

                                    border:
                                        "1px solid #555"
                                }}
                            >
                                Clinic
                            </th>


                            <th
                                style={{
                                    padding:
                                        "12px",

                                    border:
                                        "1px solid #555"
                                }}
                            >
                                Date
                            </th>


                            <th
                                style={{
                                    padding:
                                        "12px",

                                    border:
                                        "1px solid #555"
                                }}
                            >
                                Time
                            </th>


                            <th
                                style={{
                                    padding:
                                        "12px",

                                    border:
                                        "1px solid #555"
                                }}
                            >
                                Status
                            </th>

                        </tr>

                        </thead>


                        <tbody>

                        {recentAppointments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{

                                        textAlign:
                                            "center",

                                        padding:
                                            "15px",

                                        border:
                                            "1px solid #555",

                                        backgroundColor:
                                            darkMode
                                                ? "#2b2b2b"
                                                : "#ffffff",

                                        color:
                                            darkMode
                                                ? "#ffffff"
                                                : "#000000"

                                    }}
                                >
                                    No appointments scheduled
                                    for today.
                                </td>

                            </tr>

                        ) : (

                            recentAppointments.map(
                                (appointment) => (

                                    <tr
                                        key={
                                            appointment.id
                                        }
                                        style={{

                                            backgroundColor:
                                                darkMode
                                                    ? "#2b2b2b"
                                                    : "#ffffff",

                                            color:
                                                darkMode
                                                    ? "#ffffff"
                                                    : "#000000"

                                        }}
                                    >

                                        <td
                                            style={{
                                                padding:
                                                    "10px",

                                                border:
                                                    "1px solid #555"
                                            }}
                                        >
                                            {
                                                appointment.patientName
                                            }
                                        </td>


                                        <td
                                            style={{
                                                padding:
                                                    "10px",

                                                border:
                                                    "1px solid #555"
                                            }}
                                        >
                                            {
                                                appointment.clinicName
                                            }
                                        </td>


                                        <td
                                            style={{
                                                padding:
                                                    "10px",

                                                border:
                                                    "1px solid #555"
                                            }}
                                        >
                                            {
                                                appointment.appointmentDate
                                            }
                                        </td>


                                        <td
                                            style={{
                                                padding:
                                                    "10px",

                                                border:
                                                    "1px solid #555"
                                            }}
                                        >
                                            {
                                                appointment
                                                    .appointmentTime
                                                    ?.substring(
                                                        0,
                                                        5
                                                    )
                                            }
                                        </td>


                                        <td
                                            style={{
                                                padding:
                                                    "10px",

                                                border:
                                                    "1px solid #555",

                                                textAlign:
                                                    "center"
                                            }}
                                        >

                                                <span
                                                    style={{

                                                        display:
                                                            "inline-block",

                                                        padding:
                                                            "6px 12px",

                                                        borderRadius:
                                                            "20px",

                                                        fontWeight:
                                                            "600",

                                                        fontSize:
                                                            "13px",

                                                        backgroundColor:

                                                            appointment.status ===
                                                            "CONFIRMED"

                                                                ? "#dbeafe"

                                                                : appointment.status ===
                                                                "COMPLETED"

                                                                    ? "#d1fae5"

                                                                    : appointment.status ===
                                                                    "CANCELLED"

                                                                        ? "#fee2e2"

                                                                        : "#e5e7eb",


                                                        color:

                                                            appointment.status ===
                                                            "CONFIRMED"

                                                                ? "#1d4ed8"

                                                                : appointment.status ===
                                                                "COMPLETED"

                                                                    ? "#047857"

                                                                    : appointment.status ===
                                                                    "CANCELLED"

                                                                        ? "#b91c1c"

                                                                        : "#374151"

                                                    }}
                                                >

                                                    {
                                                        appointment.status ||
                                                        "UNKNOWN"
                                                    }

                                                </span>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                        </tbody>

                    </table>

                </div>


                {/* =================================================
                    ANNOUNCEMENTS
                ================================================= */}

                <h2
                    style={{
                        marginTop:
                            "40px"
                    }}
                >
                    📢 Latest Announcements
                </h2>


                <div
                    className="card"
                    style={{

                        backgroundColor:
                            darkMode
                                ? "#1e1e1e"
                                : "white",

                        color:
                            darkMode
                                ? "white"
                                : "black"

                    }}
                >

                    {announcements.length === 0 ? (

                        <p>
                            No announcements available.
                        </p>

                    ) : (

                        announcements.map(
                            (announcement) => (

                                <div
                                    key={
                                        announcement.id
                                    }
                                    style={{

                                        padding:
                                            "12px 0",

                                        borderBottom:
                                            "1px solid #444"

                                    }}
                                >

                                    <strong>
                                        {
                                            announcement.title
                                        }
                                    </strong>


                                    <p
                                        style={{

                                            marginTop:
                                                "5px",

                                            color:
                                                darkMode
                                                    ? "#ccc"
                                                    : "#666"

                                        }}
                                    >
                                        {
                                            announcement.message
                                        }
                                    </p>

                                </div>

                            )
                        )

                    )}

                </div>

            </div>

        </div>

    );

}


// =========================================================
// DASHBOARD CARD STYLE
// =========================================================

const cardStyle = {

    color: "white",

    borderRadius:
        "16px",

    padding:
        "30px",

    textAlign:
        "center",

    boxShadow:
        "0 8px 20px rgba(0,0,0,0.15)",

    transition:
        "0.3s",

    cursor:
        "pointer"

};