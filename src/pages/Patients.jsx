import { useEffect, useState } from "react";
import {getAllPatients, createPatient, updatePatient, deletePatient} from "../services/patientService";

export default function Patients() {

    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        address: "",
        bloodGroup: "",
        emergencyContact: "",
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

        try {

            if (editingId) {

                await updatePatient(editingId, patient);

                alert("Patient updated successfully!");

            } else {

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
                emergencyContact: "",
                clinicId: ""
            });
            setEditingId(null);

            const data = await getAllPatients();
            setPatients(data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 400) {

                const errors = error.response.data;

                alert(Object.values(errors).join("\n"));

            } else {

                alert("Something went wrong.");

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
        <div>

            <h1>Patients</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={patient.firstName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={patient.lastName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={patient.gender}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="dateOfBirth"
                    value={patient.dateOfBirth}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={patient.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={patient.phoneNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={patient.address}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="bloodGroup"
                    placeholder="Blood Group"
                    value={patient.bloodGroup}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact"
                    value={patient.emergencyContact}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="clinicId"
                    placeholder="Clinic ID"
                    value={patient.clinicId}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editingId ? "Update Patient" : "Save Patient"}
                </button>

            </form>

            <hr />
            <table border="1" cellPadding="10">

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

                            <button
                                onClick={() => {
                                    setPatient(patient);
                                    setEditingId(patient.id);
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(patient.id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}