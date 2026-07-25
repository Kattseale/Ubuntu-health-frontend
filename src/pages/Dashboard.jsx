import { useEffect, useState } from "react";
import DashboardChart from "../components/DashboardChart";
import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { getAllMedications } from "../services/medicationService";
import { getAllAppointments } from "../services/appointmentService";

export default function Dashboard() {

    const [stats, setStats] = useState({
        patients: 0,
        clinics: 0,
        medications: 0,
        appointments: 0,
        todayAppointments: 0
    });

    const [appointments, setAppointments] = useState([]);
    const [recentAppointments, setRecentAppointments] = useState([]);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const patients = await getAllPatients();
                const clinics = await getAllClinics();
                const medications = await getAllMedications();
                const appointments = await getAllAppointments();
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

        <div>

            <div
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
                            color: "#666",
                            marginTop: "8px"
                        }}
                    >
                        Manage patients, clinics, appointments and community activity from one place.
                    </p>

                </div>

                <div
                    style={{
                        textAlign: "right"
                    }}
                >

                    <h3 style={{ margin: 0 }}>
                        {new Date().toLocaleDateString()}
                    </h3>

                    <p style={{ color: "#777" }}>
                        Dashboard Overview
                    </p>

                </div>

            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginTop: "30px",
                
            }}>

                <div style={{ ...cardStyle, backgroundColor: "#0d6efd" }}>
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

                <div style={{ ...cardStyle, backgroundColor: "#198754" }}>
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

                <div style={{ ...cardStyle, backgroundColor: "#fd7e14" }}>
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

                <div style={{ ...cardStyle, backgroundColor: "#6f42c1" }}>
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

                <div style={{ ...cardStyle, backgroundColor: "#dc3545" }}>
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

            <div className="card">

                <h2>📊 Appointment Status</h2>

                <DashboardChart appointments={appointments} />

            </div>

            <h2 style={{ marginTop: "50px" }}>
                📅 Today's Schedule
            </h2>

            <div className="card">

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "15px"
                    }}
                >

                    <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Clinic</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>

                    {recentAppointments.length === 0 ? (

                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No appointments scheduled for today.
                            </td>
                        </tr>

                    ) : (

                        recentAppointments.map((appointment) => (

                            <tr key={appointment.id}>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.clinicName}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>{appointment.status}</td>
                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

                <h2 style={{ marginTop: "40px" }}>
                    📢 Latest Announcements
                </h2>

                <div className="card">

                    <ul
                        style={{
                            lineHeight: "2",
                            paddingLeft: "20px"
                        }}
                    >
                        <li>Flu vaccination campaign starts Monday.</li>
                        <li>Clinic 3 will be closed for maintenance on Friday.</li>
                        <li>Please verify patient contact details during registration.</li>
                    </ul>

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