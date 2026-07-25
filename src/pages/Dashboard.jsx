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

    const [recentAppointments, setRecentAppointments] = useState([]);

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        const loadDashboard = async () => {
            console.log(appointments);

            try {

                const patients = await getAllPatients();
                const clinics = await getAllClinics();
                const medications = await getAllMedications();
                const appointments = await getAllAppointments();
                setAppointments(appointments);

                const latestAppointments = [...appointments]
                    .sort((a, b) => {

                        const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
                        const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);

                        return dateB - dateA;

                    })
                    .slice(0, 5);

                setRecentAppointments(latestAppointments);

                const today = new Date().toISOString().split("T")[0];

                const todaysAppointments = appointments.filter(
                    (appointment) => appointment.appointmentDate === today
                );

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

            <h1>Dashboard</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginTop: "30px",
                
            }}>

                <div style={{ ...cardStyle, backgroundColor: "#0d6efd" }}>
                    <h2>Patients</h2>
                    <h1>{stats.patients}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#198754" }}>
                    <h2>Clinics</h2>
                    <h1>{stats.clinics}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#fd7e14" }}>
                    <h2>Medications</h2>
                    <h1>{stats.medications}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#6f42c1" }}>
                    <h2>Appointments</h2>
                    <h1>{stats.appointments}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#dc3545" }}>
                    <h2>Today's Appointments</h2>
                    <h1>{stats.todayAppointments}</h1>
                </div>

            </div>

            <h2 style={{ marginTop: "40px" }}>
                Recent Appointments
            </h2>

            <h2 style={{ marginTop: "40px" }}>
                Appointment Status
            </h2>

            <DashboardChart appointments={appointments} />

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

                {recentAppointments.map((appointment) => (

                    <tr key={appointment.id}>

                        <td>{appointment.patientName}</td>
                        <td>{appointment.clinicName}</td>
                        <td>{appointment.appointmentDate}</td>
                        <td>{appointment.appointmentTime}</td>
                        <td>{appointment.status}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>



    );

}

const cardStyle = {
    color: "white",
    borderRadius: "12px",
    padding: "25px",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
};