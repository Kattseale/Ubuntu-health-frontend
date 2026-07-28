import { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import DashboardChart from "../components/DashboardChart";
import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { getAllMedications } from "../services/medicationService";
import { getAllAppointments } from "../services/appointmentService";
import { getAllAnnouncements } from "../services/announcementService";

export default function Dashboard() {

    const [stats, setStats] = useState({
        patients: 0,
        clinics: 0,
        medications: 0,
        appointments: 0,
        todayAppointments: 0
    });
    const { darkMode } = useContext(ThemeContext);

    const [appointments, setAppointments] = useState([]);
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const patients = await getAllPatients();
                const clinics = await getAllClinics();
                const medications = await getAllMedications();
                const appointments = await getAllAppointments();
                const announcements = await getAllAnnouncements();
                setAnnouncements(announcements.slice(0, 3));
                setAppointments(appointments);

                const today = new Date().toISOString().split("T")[0];

                const todaysAppointments = appointments
                    .filter(a => a.appointmentDate === today)
                    .sort((a, b) => {
                        const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
                        const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
                        return dateA - dateB;
                    });
                setRecentAppointments(todaysAppointments);

                setStats({
                    patients: patients.length,
                    clinics: clinics.length,
                    medications: medications.length,
                    appointments: appointments.length,
                    todayAppointments: todaysAppointments.length
                });

            } catch (error) {

                console.error(error);

            }

        };

        loadDashboard();

    }, []);

    return (

        <div
            className="page"
            style={{
                minHeight: "100vh",
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "white" : "black",
                padding: "20px"
            }}
        >

            <div
                className="page"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <div>

                    <h1 style={{ margin: 0 }}>
                        👋 Welcome to Ubuntu Health
                    </h1>

                    <p
                        style={{
                            color: darkMode ? "#ccc" : "#666",
                            marginTop: "8px"
                        }}
                    >
                        Manage patients, clinics, appointments and community activity from one place.
                    </p>

                </div>

                <div
                    className="page"
                    style={{
                        textAlign: "right"
                    }}
                >

                    <h3 style={{ margin: 0 }}>
                        {new Date().toLocaleDateString()}
                    </h3>

                    <p style={{color: darkMode ? "#aaa" : "#777" }}>
                        Dashboard Overview
                    </p>

                </div>

            </div>

            <div
                className="dashboard-grid"
                style={{
                    marginTop:"30px"

            }}>

                <div
                    className="page"
                    style={{ ...cardStyle, backgroundColor: "#0d6efd" }}>
                    <h2>👥 Patients</h2>
                    <h1
                        style={{
                            fontSize: "48px",
                            margin: "15px 0"
                        }}
                    >
                        {stats.patients}
                    </h1>
                </div>

                <div
                    className="page"
                    style={{ ...cardStyle, backgroundColor: "#198754" }}>
                    <h2>🏥 Clinics</h2>
                    <h1
                        style={{
                            fontSize: "48px",
                            margin: "15px 0"
                        }}
                    >
                        {stats.clinics}
                    </h1>
                </div>

                <div
                    className="page"
                    style={{ ...cardStyle, backgroundColor: "#fd7e14" }}>
                    <h2>💊 Medications</h2>
                    <h1
                        style={{
                            fontSize: "48px",
                            margin: "15px 0"
                        }}
                    >
                        {stats.medications}
                    </h1>
                </div>

                <div className="page"
                     style={{ ...cardStyle, backgroundColor: "#6f42c1" }}>
                    <h2>📅 Appointments</h2>
                    <h1
                        style={{
                            fontSize: "48px",
                            margin: "15px 0"
                        }}
                    >
                        {stats.appointments}
                    </h1>
                </div>

                <div className="page"
                     style={{ ...cardStyle, backgroundColor: "#dc3545" }}>
                    <h2>⏰ Today's Appointments</h2>
                    <h1
                        style={{
                            fontSize: "48px",
                            margin: "15px 0"
                        }}
                    >
                        {stats.todayAppointments}
                    </h1>
                </div>

            </div>

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >

                <h2>📊 Appointment Status</h2>

                <DashboardChart appointments={appointments} />

            </div>

            <h2 style={{ marginTop: "50px" }}>
                📅 Today's Schedule
            </h2>

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >
                <div className="table-container">
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "15px",
                        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                        color: darkMode ? "#ffffff" : "#000000"
                    }}
                >

                    <thead>
                    <tr
                        style={{
                            backgroundColor: darkMode ? "#333" : "#e9ecef"
                        }}
                    >
                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #555"
                            }}
                        >
                            Patient
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #555"
                            }}
                        >
                            Clinic
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #555"
                            }}
                        >
                            Date
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #555"
                            }}
                        >
                            Time
                        </th>
                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #555"
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
                                    textAlign: "center",
                                    padding: "15px",
                                    border: "1px solid #555",
                                    backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                                    color: darkMode ? "#ffffff" : "#000000"
                                }}
                            >
                                No appointments scheduled for today.
                            </td>
                        </tr>

                    ) : (

                        recentAppointments.map((appointment) => (

                            <tr
                                key={appointment.id}
                                style={{
                                    backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                                    color: darkMode ? "#ffffff" : "#000000"
                                }}
                            >
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {appointment.patientName}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {appointment.clinicName}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {appointment.appointmentDate}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {appointment.appointmentTime}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {appointment.status}
                                </td>
                            </tr>

                        ))

                    )}

                    </tbody>

                </table>
                </div>

                <h2 style={{ marginTop: "40px" }}>
                    📢 Latest Announcements
                </h2>

                <div
                    className="card"
                    style={{
                        backgroundColor: darkMode ? "#1e1e1e" : "white",
                        color: darkMode ? "white" : "black"
                    }}
                >

                    {announcements.length === 0 ? (

                        <p>No announcements available.</p>

                    ) : (

                        announcements.map((announcement) => (

                            <div
                                key={announcement.id}
                                style={{
                                    padding: "12px 0",
                                    borderBottom: "1px solid #444"
                                }}
                            >
                                <strong>{announcement.title}</strong>

                                <p
                                    style={{
                                        marginTop: "5px",
                                        color: darkMode ? "#ccc" : "#666"
                                    }}
                                >
                                    {announcement.message}
                                </p>
                            </div>

                        ))

                    )}

                </div>
            </div>

        </div>



    );

}

const cardStyle = {

    color: "white",

    borderRadius: "16px",

    padding: "30px",

    textAlign: "center",

    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",

    transition: "0.3s",

    cursor: "pointer"

};