import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import {
    getAllClinics,
    createClinic,
    updateClinic,
    deleteClinic
} from "../services/clinicService";
import "../styles/clinics.css";

export default function Clinics() {

    const { darkMode } = useContext(ThemeContext);

    const emptyClinic = {
        clinicName: "",
        province: "",
        city: "",
        address: "",
        latitude: "",
        longitude: "",
        phoneNumber: "",
        email: ""
    };

    const [clinics, setClinics] = useState([]);
    const [clinic, setClinic] = useState(emptyClinic);
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        loadClinics();
    }, []);

    const loadClinics = async () => {
        try {
            setLoading(true);

            const data = await getAllClinics();

            setClinics(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Unable to load clinics:", error);

            setErrorMessage(
                error.response?.data?.message ||
                "Unable to load clinics."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setClinic({
            ...clinic,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {

            const clinicData = {
                ...clinic,
                latitude: Number(clinic.latitude),
                longitude: Number(clinic.longitude)
            };

            if (editingId) {

                await updateClinic(
                    editingId,
                    clinicData
                );

                setSuccessMessage(
                    "Clinic updated successfully."
                );

            } else {

                await createClinic(clinicData);

                setSuccessMessage(
                    "Clinic added successfully."
                );
            }

            setClinic(emptyClinic);
            setEditingId(null);

            await loadClinics();

        } catch (error) {

            console.error(
                "Clinic save error:",
                error
            );

            const backendErrors =
                error.response?.data;

            if (
                backendErrors &&
                typeof backendErrors === "object"
            ) {

                const messages =
                    Object.values(backendErrors)
                        .filter(
                            (value) =>
                                typeof value === "string"
                        )
                        .join(" ");

                setErrorMessage(
                    messages ||
                    backendErrors.message ||
                    "Unable to save clinic."
                );

            } else {

                setErrorMessage(
                    "Unable to save clinic."
                );
            }

        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (selectedClinic) => {

        setEditingId(selectedClinic.id);

        setClinic({
            clinicName: selectedClinic.clinicName || "",
            province: selectedClinic.province || "",
            city: selectedClinic.city || "",
            address: selectedClinic.address || "",
            latitude: selectedClinic.latitude ?? "",
            longitude: selectedClinic.longitude ?? "",
            phoneNumber: selectedClinic.phoneNumber || "",
            email: selectedClinic.email || ""
        });

        setSuccessMessage("");
        setErrorMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this clinic?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setErrorMessage("");
            setSuccessMessage("");

            await deleteClinic(id);

            setSuccessMessage(
                "Clinic deleted successfully."
            );

            await loadClinics();

        } catch (error) {

            console.error(
                "Clinic delete error:",
                error
            );

            setErrorMessage(
                error.response?.data?.message ||
                "Unable to delete clinic."
            );
        }
    };

    const handleCancelEdit = () => {

        setEditingId(null);
        setClinic(emptyClinic);

        setErrorMessage("");
        setSuccessMessage("");
    };

    return (
        <div
            className={`clinics-page ${
    darkMode ? "dark-mode" : ""
}`}
        >

            <div className="clinics-container">

                {/* HEADER */}

                <div className="clinics-header">

                    <div>
                        <h1>
                            🏥 Clinic Management
                        </h1>

                        <p>
                            Add, update and manage Ubuntu
                            Health clinics.
                        </p>
                    </div>

                    <div className="clinic-count">
                        {clinics.length} Clinics
                    </div>

                </div>


                {/* MESSAGES */}

                {successMessage && (
                    <div className="clinic-success">
                        ✓ {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="clinic-error">
                        ⚠ {errorMessage}
                    </div>
                )}


                {/* FORM */}

                <div className="clinic-form-card">

                    <div className="clinic-form-header">

                        <div>
                            <h2>
                                {editingId
                                    ? "✏️ Edit Clinic"
                                    : "➕ Add New Clinic"}
                            </h2>

                            <p>
                                Enter the clinic details below.
                            </p>
                        </div>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="clinic-form"
                    >

                        <div className="clinic-form-grid">

                            <div className="clinic-field full-width">
                                <label>
                                    Clinic Name
                                </label>

                                <input
                                    name="clinicName"
                                    value={clinic.clinicName}
                                    onChange={handleChange}
                                    placeholder="e.g. Soweto Community Health Centre"
                                    required
                                />
                            </div>


                            <div className="clinic-field">
                                <label>
                                    Province
                                </label>

                                <input
                                    name="province"
                                    value={clinic.province}
                                    onChange={handleChange}
                                    placeholder="e.g. Gauteng"
                                    required
                                />
                            </div>


                            <div className="clinic-field">
                                <label>
                                    City
                                </label>

                                <input
                                    name="city"
                                    value={clinic.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Johannesburg"
                                    required
                                />
                            </div>


                            <div className="clinic-field full-width">
                                <label>
                                    Address
                                </label>

                                <input
                                    name="address"
                                    value={clinic.address}
                                    onChange={handleChange}
                                    placeholder="Clinic street address"
                                    required
                                />
                            </div>


                            <div className="clinic-field">
                                <label>
                                    Latitude
                                </label>

                                <input
                                    type="number"
                                    step="any"
                                    name="latitude"
                                    value={clinic.latitude}
                                    onChange={handleChange}
                                    placeholder="-26.2485"
                                    required
                                />
                            </div>


                            <div className="clinic-field">
                                <label>
                                    Longitude
                                </label>

                                <input
                                    type="number"
                                    step="any"
                                    name="longitude"
                                    value={clinic.longitude}
                                    onChange={handleChange}
                                    placeholder="27.8546"
                                    required
                                />
                            </div>


                            <div className="clinic-field">
                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={clinic.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="011 123 4567"
                                    required
                                />
                            </div>


                            <div className="clinic-field">
                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={clinic.email}
                                    onChange={handleChange}
                                    placeholder="clinic@ubuntuhealth.co.za"
                                    required
                                />
                            </div>

                        </div>


                        <div className="clinic-form-actions">

                            {editingId && (
                                <button
                                    type="button"
                                    className="clinic-cancel-button"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                            <button
                                type="submit"
                                className="clinic-save-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "✓ Update Clinic"
                                        : "➕ Add Clinic"}
                            </button>

                        </div>

                    </form>

                </div>


                {/* CLINICS LIST */}

                <div className="clinic-list-card">

                    <div className="clinic-list-header">

                        <div>
                            <h2>
                                🏥 Existing Clinics
                            </h2>

                            <p>
                                Clinics currently available
                                to patients.
                            </p>
                        </div>

                    </div>


                    {loading ? (

                        <div className="clinic-loading">
                            Loading clinics...
                        </div>

                    ) : clinics.length === 0 ? (

                        <div className="clinic-empty">
                            <div>
                                🏥
                            </div>

                            <h3>
                                No clinics found
                            </h3>

                            <p>
                                Add your first clinic above.
                            </p>
                        </div>

                    ) : (

                        <div className="clinics-grid">

                            {clinics.map((item) => (

                                <div
                                    className="clinic-card"
                                    key={item.id}
                                >

                                    <div className="clinic-card-icon">
                                        🏥
                                    </div>

                                    <div className="clinic-card-content">

                                        <h3>
                                            {item.clinicName}
                                        </h3>

                                        <p>
                                            📍 {item.city},{" "}
                                            {item.province}
                                        </p>

                                        <p>
                                            {item.address}
                                        </p>

                                        <p>
                                            📞 {item.phoneNumber}
                                        </p>

                                        <p>
                                            ✉️ {item.email}
                                        </p>

                                    </div>

                                    <div className="clinic-card-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(item)
                                            }
                                            className="clinic-edit-button"
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="clinic-delete-button"
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

