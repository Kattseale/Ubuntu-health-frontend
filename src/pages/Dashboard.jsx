import { useEffect, useState } from "react";
import { getRole } from "../services/authService";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { getAllMedications } from "../services/medicationService";
import { getAllAppointments } from "../services/appointmentService";

export default function Dashboard() {

    const role = getRole();

    const [stats, setStats] = useState({
        patients: 0,
        clinics: 0,
        medications: 0,
        appointments: 0,
        todayAppointments: 0,
    });

    const [recentAppointments, setRecentAppointments] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const patients = await getAllPatients();
            const clinics = await getAllClinics();
            const medications = await getAllMedications();
            const appointments = await getAllAppointments();

            const today = new Date().toISOString().split("T")[0];

            const todaysAppointments = appointments.filter(
                (a) => a.appointmentDate === today
            );

            const latestAppointments = [...appointments]
                .sort(
                    (a, b) =>
                        new Date(`${b.appointmentDate}T${b.appointmentTime}`) -
                        new Date(`${a.appointmentDate}T${a.appointmentTime}`)
                )
                .slice(0, 5);

            setRecentAppointments(latestAppointments);

            setStats({
                patients: patients.length,
                clinics: clinics.length,
                medications: medications.length,
                appointments: appointments.length,
                todayAppointments: todaysAppointments.length,
            });

        } catch (error) {

            console.error(error);

        }

    };

    const Card = ({ title, value, color }) => (
        <div
            style={{
                background: color,
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,.2)",
            }}
        >
            <h3>{title}</h3>
            <h1>{value}</h1>
        </div>
    );

    return (

        <div style={{ padding: "25px" }}>

            <h1>
                Welcome {role}
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >

                {(role === "ADMIN" ||
                    role === "DOCTOR" ||
                    role === "NURSE") && (

                    <Card
                        title="Patients"
                        value={stats.patients}
                        color="#0d6efd"
                    />

                )}

                {(role === "ADMIN" ||
                    role === "RECEPTIONIST") && (

                    <Card
                        title="Clinics"
                        value={stats.clinics}
                        color="#198754"
                    />

                )}

                {(role === "ADMIN" ||
                    role === "NURSE") && (

                    <Card
                        title="Medications"
                        value={stats.medications}
                        color="#fd7e14"
                    />

                )}

                {(role === "ADMIN" ||
                    role === "DOCTOR" ||
                    role === "NURSE" ||
                    role === "RECEPTIONIST") && (

                    <Card
                        title="Appointments"
                        value={stats.appointments}
                        color="#6f42c1"
                    />

                )}

                <Card
                    title="Today's Appointments"
                    value={stats.todayAppointments}
                    color="#dc3545"
                />

            </div>

            {(role === "ADMIN" ||
                role === "DOCTOR" ||
                role === "RECEPTIONIST") && (

                <>
                    <h2 style={{ marginTop: "40px" }}>
                        Recent Appointments
                    </h2>

                    <table
                        border="1"
                        cellPadding="10"
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "20px",
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

                            {recentAppointments.length > 0 ? (

                                recentAppointments.map((appointment) => (

                                    <tr key={appointment.id}>
                                        <td>{appointment.patientName}</td>
                                        <td>{appointment.clinicName}</td>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>{appointment.appointmentTime}</td>
                                        <td>{appointment.status}</td>
                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="5"
                                        style={{ textAlign: "center" }}
                                    >
                                        No appointments found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>
                </>

            )}

            {role === "PATIENT" && (

                <div
                    style={{
                        marginTop: "40px",
                        background: "#f8f9fa",
                        padding: "30px",
                        borderRadius: "10px",
                    }}
                >

                    <h2>Patient Dashboard</h2>

                    <p>
                        Welcome to Ubuntu Health.
                    </p>

                    <p>
                        From here you can:
                    </p>

                    <ul>
                        <li>View your appointments</li>
                        <li>View recommendations</li>
                        <li>Join the community</li>
                        <li>Read announcements</li>
                    </ul>

                </div>

            )}

        </div>

    );

}