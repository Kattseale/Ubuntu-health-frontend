import { useEffect, useState } from "react";

import {getAllAppointments, createAppointment, updateAppointment, deleteAppointment} from "../services/appointmentService";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";

export default function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});

    const [appointment, setAppointment] = useState({

        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        status: "",
        patientId: "",
        clinicId: ""

    });
    
    const appointmentReasons = [
        "General Consultation",
        "Dentist",
        "Check-up Routine",
        "Vaccination",
        "Blood Test",
        "Optometrist",
        "Chronic Disease Management",
        "Minor Injury",
        "Family Planning",
        "Mental Health",
        "Women's Health",
        "Men's Health",
        "Children's Health",
        "Emergency Consultation",
        "Other"
    ];

    const appointmentStatuses = [
        "Scheduled",
        "Completed",
        "Cancelled"
    ];


    const fetchAppointments = async () => {

        try {

            const data = await getAllAppointments();
            setAppointments(data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchPatients = async () => {

        try {

            const data = await getAllPatients();
            setPatients(data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchClinics = async () => {

        try {

            const data = await getAllClinics();
            setClinics(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {
        const loadData = async () => {
            await fetchAppointments();
            await fetchPatients();
            await fetchClinics();
        };

        loadData();
    }, []);

    const handleChange = (e) => {

        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({});

        try {

            if (editingId) {

                await updateAppointment(editingId, appointment);
                alert("Appointment updated successfully!");

                console.log("Appointment being sent:", appointment);

            } else {

                await createAppointment(appointment);
                alert("Appointment created successfully!");

            }

            setAppointment({
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
                status: "",
                patientId: "",
                clinicId: ""
            });

            setEditingId(null);

            await fetchAppointments();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 400) {

                setErrors(error.response.data);

            } else {

                alert("Something went wrong.");

            }

        }

    };
    return (

        <div>

            <h1>Appointments</h1>

            {Object.keys(errors).length > 0 && (

                <div
                    style={{
                        background: "#ffe6e6",
                        color: "#b30000",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "5px"
                    }}
                >

                    {Object.entries(errors).map(([field, message]) => (

                        <p key={field}>
                            <strong>{field}:</strong> {message}
                        </p>

                    ))}

                </div>

            )}

            <form onSubmit={handleSubmit}>

                <select
                    name="patientId"
                    value={appointment.patientId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Patient</option>

                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.firstName} {patient.lastName}
                        </option>
                    ))}

                </select>

                <select
                    name="clinicId"
                    value={appointment.clinicId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Clinic</option>

                    {clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                            {clinic.clinicName}
                        </option>
                    ))}

                </select>

                <input
                    type="date"
                    name="appointmentDate"
                    value={appointment.appointmentDate}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="appointmentTime"
                    value={appointment.appointmentTime}
                    onChange={handleChange}
                    required
                />

                <select
                    name="reason"
                    value={appointment.reason}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Reason for Visit</option>

                    {appointmentReasons.map((reason) => (
                        <option key={reason} value={reason}>
                            {reason}
                        </option>
                    ))}
                </select>

                <select
                    name="status"
                    value={appointment.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>

                    {appointmentStatuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <button type="submit">
                    {editingId ? "Update Appointment" : "Save Appointment"}
                </button>

            </form>

            <hr />

            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Patient</th>
                    <th>Clinic</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.clinicName}</td>
                        <td>{appointment.appointmentDate}</td>
                        <td>{appointment.appointmentTime}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>

                        <td>
                            <button
                                onClick={() => {
                                    setAppointment({
                                        appointmentDate: appointment.appointmentDate,
                                        appointmentTime: appointment.appointmentTime,
                                        reason: appointment.reason,
                                        status: appointment.status,
                                        patientId: appointment.patientId,
                                        clinicId: appointment.clinicId
                                    });

                                    setEditingId(appointment.id);
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={async () => {
                                    if (!window.confirm("Delete this appointment?")) return;

                                    await deleteAppointment(appointment.id);
                                    await fetchAppointments();
                                }}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>

    );

}