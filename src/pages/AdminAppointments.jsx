import { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import {
    getAllAppointments,
    completeAppointment
} from "../services/appointmentService";

export default function AdminAppointments() {

    const { darkMode } = useContext(ThemeContext);

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [completingId, setCompletingId] = useState(null);

    // =========================================================
    // LOAD APPOINTMENTS
    // =========================================================

    const loadAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllAppointments();

            console.log("ADMIN APPOINTMENTS:", data);

            setAppointments(
                Array.isArray(data) ? data : []
            );

        } catch (err) {

            console.error(
                "Failed to load appointments:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);

        }

    };

    // =========================================================
    // LOAD WHEN PAGE OPENS
    // =========================================================

    useEffect(() => {

        loadAppointments();

    }, []);

    // =========================================================
    // COMPLETE APPOINTMENT
    // =========================================================

    const handleComplete = async (appointmentId) => {

        try {

            setCompletingId(appointmentId);
            setError("");

            const updatedAppointment =
                await completeAppointment(appointmentId);

            console.log(
                "COMPLETED APPOINTMENT:",
                updatedAppointment
            );

            // Update only the appointment that was completed
            setAppointments((currentAppointments) =>
                currentAppointments.map(
                    (appointment) =>
                        appointment.id === appointmentId
                            ? updatedAppointment
                            : appointment
                )
            );

        } catch (err) {

            console.error(
                "Failed to complete appointment:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to complete appointment."
            );

        } finally {

            setCompletingId(null);

        }

    };

    // =========================================================
    // NORMALISE STATUS
    // =========================================================

    const getStatus = (status) => {

        if (!status) {
            return "UNKNOWN";
        }

        return status.toUpperCase();

    };

    // =========================================================
    // STATUS STYLE
    // =========================================================

    const getStatusStyle = (status) => {

        const normalizedStatus = getStatus(status);

        if (
            normalizedStatus === "CONFIRMED" ||
            normalizedStatus === "SCHEDULED"
        ) {

            return {
                backgroundColor: "#cfe2ff",
                color: "#084298"
            };

        }

        if (normalizedStatus === "COMPLETED") {

            return {
                backgroundColor: "#d1e7dd",
                color: "#0f5132"
            };

        }

        if (
            normalizedStatus === "CANCELLED" ||
            normalizedStatus === "CANCELED"
        ) {

            return {
                backgroundColor: "#f8d7da",
                color: "#842029"
            };

        }

        return {
            backgroundColor: "#e2e3e5",
            color: "#41464b"
        };

    };

    // =========================================================
    // FORMAT STATUS
    // =========================================================

    const formatStatus = (status) => {

        if (!status) {
            return "Unknown";
        }

        const value = status.toLowerCase();

        return (
            value.charAt(0).toUpperCase() +
            value.slice(1)
        );

    };

    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        const formattedDate =
            new Date(`${date}T00:00:00`);

        return formattedDate.toLocaleDateString(
            "en-ZA",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };

    // =========================================================
    // FORMAT TIME
    // =========================================================

    const formatTime = (time) => {

        if (!time) {
            return "—";
        }

        return time.substring(0, 5);

    };

    // =========================================================
    // SORT APPOINTMENTS
    // =========================================================

    const sortedAppointments =
        [...appointments].sort((a, b) => {

            const dateA = new Date(
                `${a.appointmentDate}T${a.appointmentTime || "00:00"}`
            );

            const dateB = new Date(
                `${b.appointmentDate}T${b.appointmentTime || "00:00"}`
            );

            return dateB - dateA;

        });

    // =========================================================
    // COUNTS
    // =========================================================

    const confirmedCount =
        appointments.filter(
            (appointment) =>
                getStatus(appointment.status) === "CONFIRMED" ||
                getStatus(appointment.status) === "SCHEDULED"
        ).length;

    const completedCount =
        appointments.filter(
            (appointment) =>
                getStatus(appointment.status) === "COMPLETED"
        ).length;

    const cancelledCount =
        appointments.filter(
            (appointment) =>
                getStatus(appointment.status) === "CANCELLED" ||
                getStatus(appointment.status) === "CANCELED"
        ).length;

    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "clamp(15px, 3vw, 30px)",
                backgroundColor: darkMode
                    ? "#121212"
                    : "#f4f8fb",
                color: darkMode
                    ? "#ffffff"
                    : "#212529",
                boxSizing: "border-box"
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginBottom: "25px"
                }}
            >

                <div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "clamp(24px, 4vw, 32px)"
                        }}
                    >
                        📅 Appointment Management
                    </h1>

                    <p
                        style={{
                            marginTop: "8px",
                            marginBottom: 0,
                            color: darkMode
                                ? "#aaaaaa"
                                : "#666666"
                        }}
                    >
                        Manage and complete patient appointments.
                    </p>

                </div>

                <button
                    onClick={loadAppointments}
                    disabled={loading}
                    style={{
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 18px",
                        backgroundColor: "#0d6efd",
                        color: "white",
                        fontWeight: "bold",
                        cursor: loading
                            ? "not-allowed"
                            : "pointer",
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div
                    style={{
                        backgroundColor: darkMode
                            ? "#3b1f1f"
                            : "#f8d7da",
                        color: darkMode
                            ? "#ffb3b3"
                            : "#842029",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >
                    ⚠️ {error}
                </div>

            )}


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "15px",
                    marginBottom: "25px"
                }}
            >

                {/* TOTAL */}

                <SummaryCard
                    title="Total Appointments"
                    count={appointments.length}
                    icon="📅"
                    background="#0d6efd"
                />

                {/* CONFIRMED */}

                <SummaryCard
                    title="Confirmed"
                    count={confirmedCount}
                    icon="✅"
                    background="#198754"
                />

                {/* COMPLETED */}

                <SummaryCard
                    title="Completed"
                    count={completedCount}
                    icon="✔️"
                    background="#6f42c1"
                />

                {/* CANCELLED */}

                <SummaryCard
                    title="Cancelled"
                    count={cancelledCount}
                    icon="❌"
                    background="#dc3545"
                />

            </div>


            {/* =================================================
                APPOINTMENTS CONTAINER
            ================================================= */}

            <div
                style={{
                    backgroundColor: darkMode
                        ? "#1e1e1e"
                        : "#ffffff",
                    borderRadius: "14px",
                    padding: "clamp(15px, 3vw, 25px)",
                    boxShadow:
                        "0 5px 15px rgba(0,0,0,0.08)"
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: "20px",
                        fontSize: "clamp(20px, 3vw, 24px)"
                    }}
                >
                    📋 All Appointments
                </h2>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div
                        style={{
                            padding: "40px 20px",
                            textAlign: "center"
                        }}
                    >
                        Loading appointments...
                    </div>

                )}


                {/* =================================================
                    EMPTY
                ================================================= */}

                {!loading &&
                    appointments.length === 0 && (

                        <div
                            style={{
                                padding: "40px 20px",
                                textAlign: "center",
                                color: darkMode
                                    ? "#aaaaaa"
                                    : "#666666"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "45px",
                                    marginBottom: "10px"
                                }}
                            >
                                📅
                            </div>

                            <h3>
                                No appointments found
                            </h3>

                            <p>
                                There are currently no appointments
                                in the system.
                            </p>

                        </div>

                    )}


                {/* =================================================
                    MOBILE CARDS
                ================================================= */}

                {!loading &&
                    sortedAppointments.length > 0 && (

                        <div
                            className="admin-appointments-mobile"
                        >

                            {sortedAppointments.map(
                                (appointment) => {

                                    const status =
                                        getStatus(
                                            appointment.status
                                        );

                                    const isConfirmed =
                                        status === "CONFIRMED" ||
                                        status === "SCHEDULED";

                                    const isCompleted =
                                        status === "COMPLETED";

                                    const isCancelled =
                                        status === "CANCELLED" ||
                                        status === "CANCELED";

                                    return (

                                        <div
                                            key={appointment.id}
                                            style={{
                                                border:
                                                    darkMode
                                                        ? "1px solid #444"
                                                        : "1px solid #dee2e6",
                                                borderRadius: "12px",
                                                padding: "16px",
                                                marginBottom: "15px"
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    gap: "10px",
                                                    alignItems:
                                                        "center",
                                                    marginBottom:
                                                        "15px"
                                                }}
                                            >

                                                <strong>
                                                    Appointment #
                                                    {appointment.id}
                                                </strong>

                                                <span
                                                    style={{
                                                        ...getStatusStyle(
                                                            appointment.status
                                                        ),
                                                        padding:
                                                            "5px 10px",
                                                        borderRadius:
                                                            "20px",
                                                        fontSize:
                                                            "12px",
                                                        fontWeight:
                                                            "bold"
                                                    }}
                                                >
                                                {formatStatus(
                                                    appointment.status
                                                )}
                                            </span>

                                            </div>


                                            <div
                                                style={{
                                                    display: "grid",
                                                    gap: "10px"
                                                }}
                                            >

                                                <InfoRow
                                                    label="Patient"
                                                    value={
                                                        appointment.patientName ||
                                                        "Unknown Patient"
                                                    }
                                                />

                                                <InfoRow
                                                    label="Clinic"
                                                    value={
                                                        appointment.clinicName ||
                                                        "Unknown Clinic"
                                                    }
                                                />

                                                <InfoRow
                                                    label="Date"
                                                    value={
                                                        formatDate(
                                                            appointment.appointmentDate
                                                        )
                                                    }
                                                />

                                                <InfoRow
                                                    label="Time"
                                                    value={
                                                        formatTime(
                                                            appointment.appointmentTime
                                                        )
                                                    }
                                                />

                                                <InfoRow
                                                    label="Reason"
                                                    value={
                                                        appointment.reason ||
                                                        "—"
                                                    }
                                                />

                                            </div>


                                            {/* MOBILE ACTION */}

                                            <div
                                                style={{
                                                    marginTop: "15px"
                                                }}
                                            >

                                                {isConfirmed && (

                                                    <button
                                                        onClick={() =>
                                                            handleComplete(
                                                                appointment.id
                                                            )
                                                        }
                                                        disabled={
                                                            completingId ===
                                                            appointment.id
                                                        }
                                                        style={{
                                                            width: "100%",
                                                            border: "none",
                                                            borderRadius: "8px",
                                                            padding: "11px",
                                                            backgroundColor:
                                                                "#198754",
                                                            color: "white",
                                                            fontWeight: "bold",
                                                            cursor:
                                                                completingId ===
                                                                appointment.id
                                                                    ? "not-allowed"
                                                                    : "pointer",
                                                            opacity:
                                                                completingId ===
                                                                appointment.id
                                                                    ? 0.6
                                                                    : 1
                                                        }}
                                                    >
                                                        {completingId ===
                                                        appointment.id
                                                            ? "Completing..."
                                                            : "✓ Complete Appointment"}
                                                    </button>

                                                )}

                                                {isCompleted && (

                                                    <div
                                                        style={{
                                                            color: "#198754",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        ✓ Appointment Completed
                                                    </div>

                                                )}

                                                {isCancelled && (

                                                    <div
                                                        style={{
                                                            color: "#dc3545",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        Appointment Cancelled
                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}


                {/* =================================================
                    DESKTOP TABLE
                ================================================= */}

                {!loading &&
                    sortedAppointments.length > 0 && (

                        <div
                            className="admin-appointments-desktop"
                            style={{
                                width: "100%",
                                overflowX: "auto"
                            }}
                        >

                            <table
                                style={{
                                    width: "100%",
                                    minWidth: "950px",
                                    borderCollapse: "collapse"
                                }}
                            >

                                <thead>

                                <tr
                                    style={{
                                        backgroundColor:
                                            darkMode
                                                ? "#333333"
                                                : "#e9ecef"
                                    }}
                                >

                                    <th style={headerStyle}>
                                        Patient
                                    </th>

                                    <th style={headerStyle}>
                                        Clinic
                                    </th>

                                    <th style={headerStyle}>
                                        Date
                                    </th>

                                    <th style={headerStyle}>
                                        Time
                                    </th>

                                    <th style={headerStyle}>
                                        Reason
                                    </th>

                                    <th style={headerStyle}>
                                        Status
                                    </th>

                                    <th style={headerStyle}>
                                        Action
                                    </th>

                                </tr>

                                </thead>


                                <tbody>

                                {sortedAppointments.map(
                                    (appointment) => {

                                        const status =
                                            getStatus(
                                                appointment.status
                                            );

                                        const isConfirmed =
                                            status === "CONFIRMED" ||
                                            status === "SCHEDULED";

                                        const isCompleted =
                                            status === "COMPLETED";

                                        const isCancelled =
                                            status === "CANCELLED" ||
                                            status === "CANCELED";

                                        return (

                                            <tr
                                                key={appointment.id}
                                                style={{
                                                    borderBottom:
                                                        darkMode
                                                            ? "1px solid #444"
                                                            : "1px solid #dee2e6"
                                                }}
                                            >

                                                <td style={cellStyle}>
                                                    <strong>
                                                        {
                                                            appointment.patientName ||
                                                            "Unknown Patient"
                                                        }
                                                    </strong>
                                                </td>

                                                <td style={cellStyle}>
                                                    {
                                                        appointment.clinicName ||
                                                        "Unknown Clinic"
                                                    }
                                                </td>

                                                <td style={cellStyle}>
                                                    {
                                                        formatDate(
                                                            appointment.appointmentDate
                                                        )
                                                    }
                                                </td>

                                                <td style={cellStyle}>
                                                    {
                                                        formatTime(
                                                            appointment.appointmentTime
                                                        )
                                                    }
                                                </td>

                                                <td style={cellStyle}>
                                                    {
                                                        appointment.reason ||
                                                        "—"
                                                    }
                                                </td>

                                                <td style={cellStyle}>

                                                <span
                                                    style={{
                                                        ...getStatusStyle(
                                                            appointment.status
                                                        ),
                                                        display:
                                                            "inline-block",
                                                        padding:
                                                            "6px 10px",
                                                        borderRadius:
                                                            "20px",
                                                        fontSize:
                                                            "13px",
                                                        fontWeight:
                                                            "bold",
                                                        whiteSpace:
                                                            "nowrap"
                                                    }}
                                                >
                                                    {
                                                        formatStatus(
                                                            appointment.status
                                                        )
                                                    }
                                                </span>

                                                </td>

                                                <td style={cellStyle}>

                                                    {isConfirmed && (

                                                        <button
                                                            onClick={() =>
                                                                handleComplete(
                                                                    appointment.id
                                                                )
                                                            }
                                                            disabled={
                                                                completingId ===
                                                                appointment.id
                                                            }
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "7px",
                                                                padding: "8px 13px",
                                                                backgroundColor:
                                                                    "#198754",
                                                                color: "white",
                                                                fontWeight: "bold",
                                                                cursor:
                                                                    completingId ===
                                                                    appointment.id
                                                                        ? "not-allowed"
                                                                        : "pointer",
                                                                opacity:
                                                                    completingId ===
                                                                    appointment.id
                                                                        ? 0.6
                                                                        : 1
                                                            }}
                                                        >
                                                            {completingId ===
                                                            appointment.id
                                                                ? "Completing..."
                                                                : "✓ Complete"}
                                                        </button>

                                                    )}

                                                    {isCompleted && (

                                                        <span
                                                            style={{
                                                                color: "#198754",
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                        ✓ Completed
                                                    </span>

                                                    )}

                                                    {isCancelled && (

                                                        <span
                                                            style={{
                                                                color: "#dc3545",
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                        Cancelled
                                                    </span>

                                                    )}

                                                </td>

                                            </tr>

                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

            </div>

        </div>

    );

}


// =========================================================
// SUMMARY CARD
// =========================================================

function SummaryCard({
                         title,
                         count,
                         icon,
                         background
                     }) {

    return (

        <div
            style={{
                backgroundColor: background,
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                    "0 5px 15px rgba(0,0,0,0.12)"
            }}
        >

            <div
                style={{
                    fontSize: "15px"
                }}
            >
                {icon} {title}
            </div>

            <strong
                style={{
                    display: "block",
                    fontSize: "34px",
                    marginTop: "6px"
                }}
            >
                {count}
            </strong>

        </div>

    );

}


// =========================================================
// INFO ROW
// =========================================================

function InfoRow({
                     label,
                     value
                 }) {

    return (

        <div>

            <div
                style={{
                    fontSize: "12px",
                    color: "#888888",
                    marginBottom: "2px"
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontWeight: "500"
                }}
            >
                {value}
            </div>

        </div>

    );

}


// =========================================================
// TABLE STYLES
// =========================================================

const headerStyle = {

    padding: "13px 12px",

    textAlign: "left",

    whiteSpace: "nowrap"

};


const cellStyle = {

    padding: "13px 12px",

    whiteSpace: "nowrap"

};