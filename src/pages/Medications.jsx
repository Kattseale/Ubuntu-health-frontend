import { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import {getAllMedications, createMedication, updateMedication, deleteMedication} from "../services/medicationService";

import { getAllClinics } from "../services/clinicService";

export default function Medications() {

    const [medications, setMedications] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const { darkMode } = useContext(ThemeContext);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;

    const [medication, setMedication] = useState({
        medicationName: "",
        description: "",
        dosage: "",
        quantityAvailable: "",
        expiryDate: "",
        clinicId: ""
    });
    useEffect(() => {

        const fetchMedications = async () => {
            try {
                const data = await getAllMedications();
                setMedications(data);
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

        fetchMedications();
        fetchClinics();

    }, []);

    const handleChange = (e) => {
        setMedication({
            ...medication,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({});

        try {

            if (editingId) {

                await updateMedication(editingId, medication);

                setSuccessMessage("✅ Medication updated successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            } else {

                await createMedication(medication);

                setSuccessMessage("✅ Medication added successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            }

            setMedication({
                medicationName: "",
                description: "",
                dosage: "",
                quantityAvailable: "",
                expiryDate: "",
                clinicId: ""
            });

            setEditingId(null);

            const data = await getAllMedications();
            setMedications(data);
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

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this medication?")) {
            return;
        }

        try {

            await deleteMedication(id);

            const data = await getAllMedications();
            setMedications(data);
            setCurrentPage(1);

            setSuccessMessage("🗑️ Medication deleted successfully!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        } catch (error) {

            console.error(error);

        }

    };
    const inputStyle = {
        backgroundColor: darkMode ? "#2b2b2b" : "white",
        color: darkMode ? "white" : "black",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        padding: "10px",
        width: "100%",
        boxSizing: "border-box",
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = medications.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(
        medications.length / recordsPerPage
    );
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

            <h1>💊 Medications</h1>
            {successMessage && (
                <div
                    className="page"
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
                <div
                    className="page"
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
                    color: darkMode ? "#ccc" : "#666",
                    marginBottom: "25px"
                }}
            >
                Maintain medication information and clinic inventory.
            </p>

            {Object.keys(errors).length > 0 && (

                <div
                    className="page"
                    style={{
                        background: darkMode ? "#3a1f1f" : "#ffe6e6",
                        color: darkMode ? "#ff9999" : "#b30000",
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

                    <input
                        type="text"
                        name="medicationName"
                        placeholder="Medication Name"
                        value={medication.medicationName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={medication.description}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <input
                    type="text"
                    name="dosage"
                    placeholder="Dosage"
                    value={medication.dosage}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <input
                    type="number"
                    name="quantityAvailable"
                    placeholder="Quantity Available"
                    value={medication.quantityAvailable}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <input
                    type="date"
                    name="expiryDate"
                    value={medication.expiryDate}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <select
                    name="clinicId"
                    value={medication.clinicId}
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

                    <button
                        className="btn-primary"
                        type="submit"
                    >
                    {editingId ? "Update Medication" : "Save Medication"}
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
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Medication</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Dosage</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Quantity</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Expiry Date</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Clinic</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Actions</th>
                    </tr>
                    </thead>

                <tbody>

                {currentRecords.map((medication) => (

                    <tr
                        key={medication.id}
                        style={{
                            backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000"
                        }}
                    >

                        <td style={{ padding: "10px", border: "1px solid #555" }}>
                            {medication.medicationName}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #555" }}>
                            {medication.dosage}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #555" }}>
                            {medication.quantityAvailable}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #555" }}>
                            {medication.expiryDate}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #555" }}>
                            {medication.clinicName}
                        </td>

                        <td>

                            <button
                                className="btn-primary"
                                onClick={() => {
                                    setMedication({
                                        medicationName: medication.medicationName,
                                        description: medication.description,
                                        dosage: medication.dosage,
                                        quantityAvailable: medication.quantityAvailable,
                                        expiryDate: medication.expiryDate,
                                        clinicId: medication.clinicId
                                    });

                                    setEditingId(medication.id);
                                }}
                            >
                                ✏️ Edit
                            </button>

                            <button
                                className="btn-danger"
                                style={{ marginLeft: "8px" }}
                                onClick={() => handleDelete(medication.id)}
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