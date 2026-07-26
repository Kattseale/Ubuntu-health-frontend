import { useEffect, useState } from "react";

import {getAllAppointments, createAppointment, updateAppointment, deleteAppointment} from "../services/appointmentService";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Appointments() {

    const { darkMode } = useContext(ThemeContext);
    const [successMessage, setSuccessMessage] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;

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

            console.log("Appointment being sent:", appointment);

            if (editingId) {
                await updateAppointment(editingId, appointment);
                setSuccessMessage("✅ Appointment updated successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            } else {
                await createAppointment(appointment);
                setSuccessMessage("✅ Appointment created successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
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
            setCurrentPage(1);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 400) {

                setErrors(error.response.data);

            } else {

                setErrorMessage("❌ Something went wrong.");

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);

            }

        }

    };
    const inputStyle = {
        backgroundColor: darkMode ? "#2c2c2c" : "white",
        color: darkMode ? "white" : "black",
        border: "1px solid #888"
    };
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = appointments.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(
        appointments.length / recordsPerPage
    );
    return (
        <div
            className="page"
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "white" : "black",
                minHeight: "100vh",
                padding: "20px"
            }}
        >

            <h1>📅 Appointments</h1>

            {successMessage && (
                <div className="page"
                    style={{
                        background: darkMode ? "#1e4620" : "#d1e7dd",
                        color: darkMode ? "#8ff0a4" : "#0f5132",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: darkMode ? "1px solid #2f7d32" : "1px solid #badbcc"
                    }}
                >
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="page"
                    style={{
                        background: darkMode ? "#4a1f1f" : "#f8d7da",
                        color: darkMode ? "#ff9999" : "#842029",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: darkMode ? "1px solid #842029" : "1px solid #f5c2c7"
                    }}
                >
                    {errorMessage}
                </div>
            )}

            <p
                style={{
                    color: darkMode ? "#cccccc" : "#666",
                    marginBottom: "25px"
                }}
            >
                Schedule, update and manage patient appointments.
            </p>

            {Object.keys(errors).length > 0 && (

                <div className="page"
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

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >

                <form onSubmit={handleSubmit}>

                    <select
                        type="date"
                        style={inputStyle}
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
                        type="date"
                        style={inputStyle}
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
                        style={inputStyle}
                        type="date"
                        name="appointmentDate"
                        value={appointment.appointmentDate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="time"
                        name="appointmentTime"
                        value={appointment.appointmentTime}
                        onChange={handleChange}
                        required
                    />

                    <select
                        style={inputStyle}
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
                        type="date"
                        style={inputStyle}
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

                    <button
                        className="btn-primary"
                        type="submit"
                    >
                    {editingId ? "Update Appointment" : "Save Appointment"}
                </button>

            </form>
            </div>

            <hr />

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
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Patient</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Clinic</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Date</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Time</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Reason</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Status</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {currentRecords.map((appointment) => (
                        <tr
                            key={appointment.id}
                            style={{
                                backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                                color: darkMode ? "#ffffff" : "#000000"
                            }}
                        >
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{appointment.patientName}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{appointment.clinicName}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{appointment.appointmentDate}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{appointment.appointmentTime}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{appointment.reason}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{appointment.status}</td>

                            <td style={{ padding: "10px", border: "1px solid #555" }}>
                                <button
                                    className="btn-primary"
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
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn-danger"
                                    style={{ marginLeft: "8px" }}
                                    onClick={async () => {
                                        if (!window.confirm("Delete this appointment?")) return;

                                        await deleteAppointment(appointment.id);
                                        await fetchAppointments();
                                    }}
                                >
                                    🗑 Delete
                                </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "20px",
                            flexWrap: "wrap"
                        }}
                    >
                        <button
                            className="btn-primary"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>

                        <span>
        Page {currentPage} of {totalPages}
    </span>

                        <button
                            className="btn-primary"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

        </div>

    );

}