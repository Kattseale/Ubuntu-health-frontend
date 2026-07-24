import { useEffect, useState } from "react";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { getAllAppointments } from "../services/appointmentService";
import { getAllMedications } from "../services/medicationService";

export default function Reports() {

    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                patientData,
                clinicData,
                appointmentData,
                medicationData
            ] = await Promise.all([
                getAllPatients(),
                getAllClinics(),
                getAllAppointments(),
                getAllMedications()
            ]);

            setPatients(patientData);
            setClinics(clinicData);
            setAppointments(appointmentData);
            setMedications(medicationData);

        } catch (error) {

            console.error(error);

        }

    };

    const appointmentStatus = appointments.reduce((acc, appointment) => {

        acc[appointment.status] = (acc[appointment.status] || 0) + 1;

        return acc;

    }, {});

    const patientsPerClinic = clinics.map(clinic => ({
        clinic: clinic.clinicName,
        total: patients.filter(
            patient => patient.clinicId === clinic.id
        ).length
    }));

    const dailyAppointments = appointments.reduce((acc, appointment) => {

        acc[appointment.appointmentDate] =
            (acc[appointment.appointmentDate] || 0) + 1;

        return acc;

    }, {});

    return (

        <div style={{ padding: "20px" }}>

            <h1>Reports & Analytics</h1>

            <hr />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <Card
                    title="Patients"
                    value={patients.length}
                />

                <Card
                    title="Clinics"
                    value={clinics.length}
                />

                <Card
                    title="Appointments"
                    value={appointments.length}
                />

                <Card
                    title="Medications"
                    value={medications.length}
                />

            </div>

            <h2>Appointments by Status</h2>

            <table border="1" cellPadding="10">

                <thead>

                <tr>
                    <th>Status</th>
                    <th>Total</th>
                </tr>

                </thead>

                <tbody>

                {Object.entries(appointmentStatus).map(([status, total]) => (

                    <tr key={status}>
                        <td>{status}</td>
                        <td>{total}</td>
                    </tr>

                ))}

                </tbody>

            </table>

            <br />

            <h2>Patients per Clinic</h2>

            <table border="1" cellPadding="10">

                <thead>

                <tr>
                    <th>Clinic</th>
                    <th>Patients</th>
                </tr>

                </thead>

                <tbody>

                {patientsPerClinic.map((item) => (

                    <tr key={item.clinic}>
                        <td>{item.clinic}</td>
                        <td>{item.total}</td>
                    </tr>

                ))}

                </tbody>

            </table>

            <br />

            <h2>Daily Appointments</h2>

            <table border="1" cellPadding="10">

                <thead>

                <tr>
                    <th>Date</th>
                    <th>Total</th>
                </tr>

                </thead>

                <tbody>

                {Object.entries(dailyAppointments).map(([date, total]) => (

                    <tr key={date}>
                        <td>{date}</td>
                        <td>{total}</td>
                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );
}

function Card({ title, value }) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                background: "#f8f9fa"
            }}
        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

}