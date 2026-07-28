import { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { getAllClinics } from "../services/clinicService";
import { createAppointment } from "../services/appointmentService";

export default function Appointments() {
    const { darkMode } = useContext(ThemeContext);

    const [clinics, setClinics] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [bookedAppointment, setBookedAppointment] = useState(null);

    const [appointment, setAppointment] = useState({
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        clinicId: ""
    });
    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const day = selectedDate.getDay();

        if (day === 0 || day === 6) {
            alert("Appointments can only be booked Monday to Friday.");
            return;
        }

        setAppointment({
            ...appointment,
            appointmentDate: e.target.value
        });
    };

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

    useEffect(() => {
        fetchClinics();
    }, []);

    const fetchClinics = async () => {
        try {
            const data = await getAllClinics();
            setClinics(data);
        } catch (error) {
            console.error(error);
        }
    };

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
            await createAppointment(appointment);

            setBookedAppointment(appointment);

            setSuccessMessage("✅ Your appointment has been booked successfully!");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            setAppointment({
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
                clinicId: ""
            });

        } catch (error) {
            console.error(error);

            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                setErrorMessage("❌ Failed to book appointment.");

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        backgroundColor: darkMode ? "#2c2c2c" : "#fff",
        color: darkMode ? "#fff" : "#000",
        border: "1px solid #888",
        borderRadius: "6px"
    };

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
            <h1>📅 My Appointments</h1>

            <p
                style={{
                    color: darkMode ? "#cccccc" : "#666",
                    marginBottom: "25px"
                }}
            >
                Book your clinic appointment quickly and easily.
            </p>

            {successMessage && (
                <div
                    style={{
                        background: darkMode ? "#1e4620" : "#d1e7dd",
                        color: darkMode ? "#8ff0a4" : "#0f5132",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div
                    style={{
                        background: "#f8d7da",
                        color: "#842029",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >
                    {errorMessage}
                </div>
            )}

            {Object.keys(errors).length > 0 && (
                <div
                    style={{
                        background: "#ffe6e6",
                        color: "#b30000",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px"
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
                    color: darkMode ? "white" : "black",
                    padding: "25px",
                    borderRadius: "10px"
                }}
            >
                <form onSubmit={handleSubmit}>

                    <select
                        name="clinicId"
                        value={appointment.clinicId}
                        onChange={handleChange}
                        style={inputStyle}
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
                        onChange={handleDateChange}
                        style={inputStyle}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />

                    <input
                        type="time"
                        name="appointmentTime"
                        value={appointment.appointmentTime}
                        onChange={handleChange}
                        style={inputStyle}
                        min="08:00"
                        max="16:30"
                        step="1800"
                        required
                    />

                    <select
                        name="reason"
                        value={appointment.reason}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Select Reason for Visit</option>

                        {appointmentReasons.map((reason) => (
                            <option key={reason} value={reason}>
                                {reason}
                            </option>
                        ))}
                    </select>

                    <button
                        className="btn-primary"
                        type="submit"
                    >
                        📅 Book Appointment
                    </button>

                </form>

                <p
                    style={{
                        marginTop: "15px",
                        color: darkMode ? "#bbb" : "#666",
                        fontSize: "14px"
                    }}
                >
                    ℹ️ Appointments are available Monday–Friday, between 08:00 and 16:30.
                </p>

                {bookedAppointment && (
                    <div
                        style={{
                            background: darkMode ? "#1e4620" : "#d1e7dd",
                            color: darkMode ? "#8ff0a4" : "#0f5132",
                            padding: "20px",
                            borderRadius: "10px",
                            marginTop: "25px",
                            textAlign: "center"
                        }}
                    >
                        <h3>🎉 Appointment Booked</h3>

                        <p>
                            <strong>Date:</strong> {bookedAppointment.appointmentDate}
                        </p>

                        <p>
                            <strong>Time:</strong> {bookedAppointment.appointmentTime}
                        </p>

                        <p>
                            <strong>Reason:</strong> {bookedAppointment.reason}
                        </p>

                        <p style={{ fontWeight: "bold", color: "#16a34a" }}>
                            ✅ Booking Confirmed
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}