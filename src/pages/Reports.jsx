import { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import autoTable from "jspdf-autotable";
import ReportsChart from "../components/ReportsChart";
import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";
import { getAllAppointments } from "../services/appointmentService";
import { getAllMedications } from "../services/medicationService";

export default function Reports() {

    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [medications, setMedications] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedClinic, setSelectedClinic] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { darkMode } = useContext(ThemeContext);
    const inputStyle = {
        backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px"
    };

    const tableCellStyle = {
        padding: "10px",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000"
    };

    useEffect(() => {

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

        loadData();

    }, []);
    const filteredAppointments = appointments.filter((appointment) => {

        const statusMatch =
            selectedStatus === "" ||
            appointment.status === selectedStatus;

        const clinicMatch =
            selectedClinic === "" ||
            appointment.clinicName === selectedClinic;

        const startMatch =
            startDate === "" ||
            appointment.appointmentDate >= startDate;

        const endMatch =
            endDate === "" ||
            appointment.appointmentDate <= endDate;

        return (
            statusMatch &&
            clinicMatch &&
            startMatch &&
            endMatch
        );

    });
    const appointmentStatus = filteredAppointments.reduce((acc, appointment) => {

        acc[appointment.status] = (acc[appointment.status] || 0) + 1;

        return acc;

    }, {});

    const patientsPerClinic = clinics.map(clinic => ({
        clinic: clinic.clinicName,
        total: patients.filter(
            patient => patient.clinicId === clinic.id
        ).length
    }));

    const dailyAppointments = filteredAppointments.reduce((acc, appointment) => {

        acc[appointment.appointmentDate] =
            (acc[appointment.appointmentDate] || 0) + 1;

        return acc;

    }, {});

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Ubuntu Health Report", 14, 20);

        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        doc.text("System Summary", 14, 45);

        autoTable(doc, {
            startY: 50,
            head: [["Category", "Total"]],
            body: [
                ["Patients", patients.length],
                ["Clinics", clinics.length],
                ["Appointments", filteredAppointments.length],
                ["Medications", medications.length]
            ]
        });

        doc.text("Appointments by Status", 14, doc.lastAutoTable.finalY + 15);

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            head: [["Status", "Total"]],
            body: Object.entries(appointmentStatus)
        });

        doc.text("Patients per Clinic", 14, doc.lastAutoTable.finalY + 15);

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            head: [["Clinic", "Patients"]],
            body: patientsPerClinic.map(item => [
                item.clinic,
                item.total
            ])
        });

        doc.text("Daily Appointments", 14, doc.lastAutoTable.finalY + 15);

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            head: [["Date", "Total"]],
            body: Object.entries(dailyAppointments)
        });

        doc.save("UbuntuHealthReport.pdf");
    };

;



    const exportExcel = () => {

        const workbook = XLSX.utils.book_new();

        // Summary
        const summary = [
            ["Category", "Total"],
            ["Patients", patients.length],
            ["Clinics", clinics.length],
            ["Appointments", appointments.length],
            ["Medications", medications.length]
        ];

        const summarySheet = XLSX.utils.aoa_to_sheet(summary);
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

        // Appointment Status
        const statusSheet = XLSX.utils.json_to_sheet(
            Object.entries(appointmentStatus).map(([status, total]) => ({
                Status: status,
                Total: total
            }))
        );

        XLSX.utils.book_append_sheet(workbook, statusSheet, "Appointment Status");

        // Patients per Clinic
        const clinicSheet = XLSX.utils.json_to_sheet(
            patientsPerClinic.map(item => ({
                Clinic: item.clinic,
                Patients: item.total
            }))
        );

        XLSX.utils.book_append_sheet(workbook, clinicSheet, "Patients per Clinic");

        // Daily Appointments
        const dailySheet = XLSX.utils.json_to_sheet(
            Object.entries(dailyAppointments).map(([date, total]) => ({
                Date: date,
                Total: total
            }))
        );

        XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily Appointments");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream"
        });

        saveAs(file, "UbuntuHealthReport.xlsx");
    };
    return (

        <div
            style={{
                padding: "20px",
                minHeight: "100vh",
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "white" : "black"
            }}
        >

            <h1>Reports & Analytics</h1>
            <button
                onClick={exportPDF}
                style={{
                    marginBottom: "20px",
                    padding: "12px 20px",
                    backgroundColor: "#198754",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                📄 Export PDF
            </button>

            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>

                <button
                    onClick={exportExcel}
                    style={{
                        padding: "12px 20px",
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    📊 Export Excel
                </button>

            </div>
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px",
                    flexWrap: "wrap"
                }}
            >

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">All Statuses</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <select
                    value={selectedClinic}
                    onChange={(e) => setSelectedClinic(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">All Clinics</option>

                    {clinics.map((clinic) => (
                        <option
                            key={clinic.id}
                            value={clinic.clinicName}
                        >
                            {clinic.clinicName}
                        </option>
                    ))}

                </select>

            </div>

            <hr />
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px",
                    flexWrap: "wrap"
                }}
            >

                <div>
                    <label>From</label>
                    <br />

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>To</label>
                    <br />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div style={{ ...cardStyle, backgroundColor: "#0d6efd" }}>
                    <h3>👥 Patients</h3>
                    <h1>{patients.length}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#198754" }}>
                    <h3>🏥 Clinics</h3>
                    <h1>{clinics.length}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#fd7e14" }}>
                    <h3>📅 Appointments</h3>
                    <h1>{filteredAppointments.length}</h1>
                </div>

                <div style={{ ...cardStyle, backgroundColor: "#dc3545" }}>
                    <h3>💊 Medications</h3>
                    <h1>{medications.length}</h1>
                </div>

            </div>

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "30px"
                }}
            >

                <h2>📊 Appointments by Status</h2>

                <ReportsChart
                    appointmentStatus={appointmentStatus}
                />

            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                    marginBottom: "30px"
                }}
            >

                <thead>

                <tr
                    style={{
                        backgroundColor: darkMode ? "#333" : "#e9ecef"
                    }}
                >
                    <th style={tableCellStyle}>Status</th>
                    <th style={tableCellStyle}>Total</th>
                </tr>

                </thead>

                <tbody>

                {Object.entries(appointmentStatus).map(([status, total]) => (

                    <tr
                        key={status}
                        style={{
                            backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000"
                        }}
                    >
                        <td style={tableCellStyle}>{status}</td>
                        <td style={tableCellStyle}>{total}</td>
                    </tr>

                ))}

                </tbody>

            </table>

            <br />

            <h2>Patients per Clinic</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                    marginBottom: "30px"
                }}
            >

                <thead>

                <tr
                    style={{
                        backgroundColor: darkMode ? "#333" : "#e9ecef"
                    }}
                >
                    <th style={tableCellStyle}>Clinic</th>
                    <th style={tableCellStyle}>Patients</th>
                </tr>

                </thead>

                <tbody>

                {patientsPerClinic.map((item) => (

                    <tr
                        key={item.clinic}
                        style={{
                            backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000"
                        }}
                    >
                        <td style={tableCellStyle}>{item.clinic}</td>
                        <td style={tableCellStyle}>{item.total}</td>
                    </tr>

                ))}

                </tbody>

            </table>

            <br />

            <h2>Daily Appointments</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                    marginBottom: "30px"
                }}
            >

                <thead>

                <tr
                    style={{
                        backgroundColor: darkMode ? "#333" : "#e9ecef"
                    }}
                >
                    <th style={tableCellStyle}>Date</th>
                    <th style={tableCellStyle}>Total</th>
                </tr>

                </thead>

                <tbody>

                {Object.entries(dailyAppointments).map(([date, total]) => (

                    <tr
                        key={date}
                        style={{
                            backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000"
                        }}
                    >
                        <td style={tableCellStyle}>{date}</td>
                        <td style={tableCellStyle}>{total}</td>
                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );
}

const cardStyle = {
    color: "white",
    borderRadius: "16px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
};