import { useEffect, useState } from "react";
import { getAllClinics } from "../services/clinicService";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import {getAllPatients, createPatient, updatePatient, deletePatient} from "../services/patientService";

export default function Patients() {

    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [clinics, setClinics] = useState([]);
    const { darkMode } = useContext(ThemeContext);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        address: "",
        bloodGroup: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        clinicId: ""
    });

    useEffect(() => {
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

        fetchClinics();

        fetchPatients();
    }, []);

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {

            if (editingId) {

                await updatePatient(editingId, patient);
                setSuccessMessage("✅ Patient updated successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            } else {
                console.log(patient);

                await createPatient(patient);
                setSuccessMessage("✅ Patient added successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            }

            setPatient({
                firstName: "",
                lastName: "",
                gender: "",
                dateOfBirth: "",
                email: "",
                phoneNumber: "",
                address: "",
                bloodGroup: "",
                emergencyContactName: "",
                emergencyContactPhone: "",
                clinicId: ""
            });
            setEditingId(null);

            const data = await getAllPatients();
            setPatients(data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 400) {

                setErrors(error.response.data);

            } else if (error.response?.status === 409) {

                setErrors({
                    email: error.response.data.message
                });

            }

        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this patient?")) {
            return;
        }

        try {

            await deletePatient(id);

            const data = await getAllPatients();
            setPatients(data);

            setSuccessMessage("🗑️ Patient deleted successfully!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        } catch (error) {

            console.error(error);
            setErrorMessage("❌ Something went wrong.");

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);


        }

    };
    const inputStyle = {
        backgroundColor: darkMode ? "#2b2b2b" : "white",
        color: darkMode ? "white" : "black",
        border: darkMode ? "1px solid #555" : "1px solid #ccc"
    };

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

            <h1 className="page-title">
                Patients
            </h1>
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

                <h2 className="card-title">
                    Patient Information
                </h2>
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
                <form onSubmit={handleSubmit}>

                <input
                    style={inputStyle}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={patient.firstName}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter the patient's first name.")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <input
                    style={inputStyle}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={patient.lastName}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter the patient's last name.")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <select
                    style={inputStyle}
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please select a gender.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    style={inputStyle}
                    type="date"
                    name="dateOfBirth"
                    value={patient.dateOfBirth}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter the patient's date of birth.")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <input
                    style={inputStyle}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={patient.email}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter the patient's email.")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <input
                    style={inputStyle}
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={patient.phoneNumber}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter the patient's email.")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <input
                    style={inputStyle}
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={patient.address}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter the patient's address.")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <select
                    style={inputStyle}
                    name="bloodGroup"
                    value={patient.bloodGroup}
                    onChange={handleChange}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please select a blood group.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>

                <input
                    style={inputStyle}
                    type="text"
                    name="emergencyContactName"
                    placeholder="Emergency Contact Name"
                    value={patient.emergencyContactName}
                    onChange={handleChange}
                    required
                />

                <input
                    style={inputStyle}
                    type="text"
                    name="emergencyContactPhone"
                    placeholder="Emergency Contact Phone"
                    value={patient.emergencyContactPhone}
                    onChange={handleChange}
                    required
                />

                <select
                    style={inputStyle}
                    name="clinicId"
                    value={patient.clinicId}
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

                    <button
                        className="btn-primary"
                        type="submit"
                    >
                        {editingId ? "Update Patient" : "Save Patient"}
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

                <h2 className="card-title">
                    Patient Records
                </h2>
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
                        <th style={{ padding: "12px", border: "1px solid #555" }}>First Name</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Last Name</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Gender</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>DOB</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Email</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Clinic</th>
                        <th style={{ padding: "12px", border: "1px solid #555" }}>Actions</th>
                    </tr>
                </thead>


                    <tbody>
                    {patients.map((patient) => (
                        <tr
                            key={patient.id}
                            style={{
                                backgroundColor: darkMode ? "#2b2b2b" : "#ffffff",
                                color: darkMode ? "#ffffff" : "#000000"
                            }}
                        >
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.id}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.firstName}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.lastName}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.gender}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.dateOfBirth}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.email}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>{patient.clinicName}</td>
                            <td style={{ padding: "10px", border: "1px solid #555" }}>

                        <td>

                            <div className="action-buttons">

                                <button
                                    className="btn-edit"
                                    onClick={() => {
                                        setPatient({
                                            firstName: patient.firstName,
                                            lastName: patient.lastName,
                                            gender: patient.gender,
                                            dateOfBirth: patient.dateOfBirth,
                                            email: patient.email,
                                            phoneNumber: patient.phoneNumber,
                                            address: patient.address,
                                            bloodGroup: patient.bloodGroup,
                                            emergencyContactName: patient.emergencyContactName,
                                            emergencyContactPhone: patient.emergencyContactPhone,
                                            clinicId: patient.clinicId
                                        });

                                        setEditingId(patient.id);
                                    }}
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="btn-danger"
                                    onClick={() => handleDelete(patient.id)}
                                >
                                    🗑 Delete
                                </button>

                            </div>
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