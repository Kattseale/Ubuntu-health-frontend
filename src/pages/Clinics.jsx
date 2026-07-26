import { useEffect, useState } from "react";
import {
    getAllClinics,
    createClinic,
    updateClinic,
    deleteClinic
} from "../services/clinicService";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Clinics() {

    const [clinics, setClinics] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [errors, setErrors] = useState({});

    const { darkMode } = useContext(ThemeContext);
    const inputStyle = {
        backgroundColor: darkMode ? "#2b2b2b" : "white",
        color: darkMode ? "white" : "black",
        border: darkMode ? "1px solid #555" : "1px solid #ccc"
    };
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
        const loadClinics = async () => {
            try {
                const data = await getAllClinics();
                setClinics(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadClinics();
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
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            } else {

                await createClinic(clinic);
                setSuccessMessage("✅ Clinic added successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            }

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

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);

            }

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this clinic?")) return;

        try {

            await deleteClinic(id);

            await fetchClinics();

            setSuccessMessage("🗑️ Clinic deleted successfully!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="page"
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "white" : "black",
                minHeight: "100vh",
                padding: "20px"
            }}
        >

            <h1>Clinics</h1>

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
                        style={{
                            marginTop: "15px"
                        }}
                    >
                        {editingId ? "Update Clinic" : "Save Clinic"}
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
                        <th style={{ padding: "12px", border: "1px solid #555" }}>ID</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Clinic Name</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>City</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Province</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Email</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Actions</th>
                    </tr>

                    </thead>

                    <tbody>

                    {clinics.map((clinic) => (

                        <tr
                            key={clinic.id}
                            style={{
                                backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                                color: darkMode ? "#ffffff" : "#000000"
                            }}
                        >

                            <td style={{ padding: "10px", border: "1px solid #555" }}>
                                {clinic.id}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>
                                {clinic.clinicName}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>
                                {clinic.city}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>
                                {clinic.province}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>
                                {clinic.email}
                            </td>

                            <td>

                                <td style={{ padding: "10px", border: "1px solid #555" }}>
                                <button
                                    className="btn-primary"
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

                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn-danger"
                                    onClick={() => handleDelete(clinic.id)}
                                >
                                    Delete
                                </button>

                                </td>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>
                </div>

            </div>

        </div>
    );
}