import { useEffect, useState, useContext } from "react";
import {
    getAllClinics,
    createClinic,
    updateClinic,
    deleteClinic
} from "../services/clinicService";
import ThemeContext from "../context/ThemeContext";

export default function Clinics() {
    const { darkMode } = useContext(ThemeContext);

    const [clinics, setClinics] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;

    const inputStyle = {
        backgroundColor: darkMode ? "#2b2b2b" : "#fff",
        color: darkMode ? "#fff" : "#000",
        border: darkMode ? "1px solid #555" : "1px solid #ccc"
    };

    const [clinic, setClinic] = useState({
        clinicName: "",
        province: "",
        city: "",
        address: "",
        latitude: "",
        longitude: "",
        phoneNumber: "",
        email: ""
    });

    const fetchClinics = async () => {
        try {
            const data = await getAllClinics();
            setClinics(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClinics();
    }, []);

    const handleChange = (e) => {
        setClinic({
            ...clinic,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            if (editingId) {
                await updateClinic(editingId, clinic);
                setSuccessMessage("✅ Clinic updated successfully!");
            } else {
                await createClinic(clinic);
                setSuccessMessage("✅ Clinic added successfully!");
            }

            setTimeout(() => setSuccessMessage(""), 3000);

            setClinic({
                clinicName: "",
                province: "",
                city: "",
                address: "",
                latitude: "",
                longitude: "",
                phoneNumber: "",
                email: ""
            });

            setEditingId(null);
            await fetchClinics();
        } catch (error) {
            console.error(error);

            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                setErrorMessage("❌ Something went wrong.");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this clinic?")) return;

        try {
            await deleteClinic(id);
            await fetchClinics();

            setSuccessMessage("🗑️ Clinic deleted successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = clinics.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(clinics.length / recordsPerPage);

    return (
        <div
            className="page"
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "#fff" : "#000",
                minHeight: "100vh",
                padding: "20px"
            }}
        >
            <h1>🏥 Clinic Management</h1>

            <p
                style={{
                    color: darkMode ? "#ccc" : "#666",
                    marginBottom: "25px"
                }}
            >
                Create, update and manage Ubuntu Health clinic locations.
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
                        background: darkMode ? "#4a1f1f" : "#f8d7da",
                        color: darkMode ? "#ff9999" : "#842029",
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
                        padding: "10px",
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
                    backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                    marginBottom: "30px"
                }}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        style={inputStyle}
                        type="text"
                        name="clinicName"
                        placeholder="Clinic Name"
                        value={clinic.clinicName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        name="province"
                        placeholder="Province"
                        value={clinic.province}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        name="city"
                        placeholder="City"
                        value={clinic.city}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={clinic.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="number"
                        step="any"
                        name="latitude"
                        placeholder="Latitude"
                        value={clinic.latitude}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="number"
                        step="any"
                        name="longitude"
                        placeholder="Longitude"
                        value={clinic.longitude}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={clinic.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={clinic.email}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="btn-primary"
                        type="submit"
                        style={{ marginTop: "15px" }}
                    >
                        {editingId ? "✏️ Update Clinic" : "➕ Add Clinic"}
                    </button>
                </form>
            </div>

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                    color: darkMode ? "#fff" : "#000"
                }}
            >
                <div className="table-container">
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead>
                        <tr
                            style={{
                                backgroundColor: darkMode ? "#333" : "#e9ecef"
                            }}
                        >
                            <th>ID</th>
                            <th>Clinic Name</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {currentRecords.map((clinic) => (
                            <tr
                                key={clinic.id}
                                style={{
                                    backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                                    color: darkMode ? "#ffffff" : "#000000"
                                }}
                            >
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {clinic.id}
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {clinic.clinicName}
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {clinic.city}
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {clinic.province}
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555"
                                    }}
                                >
                                    {clinic.email}
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #555",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    <button
                                        className="btn-primary"
                                        type="button"
                                        onClick={() => {
                                            setClinic({
                                                clinicName: clinic.clinicName,
                                                province: clinic.province,
                                                city: clinic.city,
                                                address: clinic.address,
                                                latitude: clinic.latitude,
                                                longitude: clinic.longitude,
                                                phoneNumber: clinic.phoneNumber,
                                                email: clinic.email
                                            });

                                            setEditingId(clinic.id);

                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                        }}
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        className="btn-danger"
                                        type="button"
                                        onClick={() => handleDelete(clinic.id)}
                                        style={{ marginLeft: "10px" }}
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
                            gap: "15px",
                            marginTop: "20px",
                            flexWrap: "wrap"
                        }}
                    >
                        <button
                            className="btn-primary"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages || 1}
                        </span>

                        <button
                            className="btn-primary"
                            disabled={
                                currentPage === totalPages ||
                                totalPages === 0
                            }
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}