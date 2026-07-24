import { useEffect, useState } from "react";
import { getAllClinics } from "../services/clinicService";
import {getAllPatients, createPatient, updatePatient, deletePatient} from "../services/patientService";

export default function Patients() {

    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [clinics, setClinics] = useState([]);

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
                alert("Patient updated successfully!");

            } else {
                console.log(patient);

                await createPatient(patient);
                alert("Patient added successfully!");

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

            alert("Patient deleted successfully!");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="page">

            <h1 className="page-title">
                Patients
            </h1>
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

            <div className="card">

                <h2 className="card-title">
                    Patient Information
                </h2>
                <form onSubmit={handleSubmit}>

                <input
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
                    type="text"
                    name="emergencyContactName"
                    placeholder="Emergency Contact Name"
                    value={patient.emergencyContactName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="emergencyContactPhone"
                    placeholder="Emergency Contact Phone"
                    value={patient.emergencyContactPhone}
                    onChange={handleChange}
                    required
                />

                <select
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
            <div className="card">

                <h2 className="card-title">
                    Patient Records
                </h2>

                <table>

                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Clinic</th>
                    <th>Actions</th>
                </tr>
                </thead>


                <tbody>

                {patients.map((patient) => (

                    <tr key={patient.id}>

                        <td>{patient.id}</td>
                        <td>{patient.firstName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.dateOfBirth}</td>
                        <td>{patient.email}</td>
                        <td>{patient.clinicName}</td>

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

                    </tr>

                ))}

                </tbody>

            </table>

            </div>

        </div>
    );
}