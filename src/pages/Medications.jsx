import { useEffect, useState } from "react";
import {getAllMedications, createMedication, updateMedication, deleteMedication} from "../services/medicationService";

import { getAllClinics } from "../services/clinicService";

export default function Medications() {

    const [medications, setMedications] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});

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
    const handleMedicationSelect = (e) => {

        const selectedMedication = medications.find(
            med => med.id === Number(e.target.value)
        );

        if (!selectedMedication) return;

        setMedication({
            ...medication,
            medicationName: selectedMedication.medicationName,
            description: selectedMedication.description,
            dosage: selectedMedication.dosage
        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({});

        try {

            if (editingId) {

                await updateMedication(editingId, medication);

                alert("Medication updated successfully!");

            } else {

                await createMedication(medication);

                alert("Medication added successfully!");

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

        } catch (error) {

            console.error(error);

            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                alert("Something went wrong.");
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

            alert("Medication deleted successfully!");

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <div>

            <h1>Medications</h1>

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

            <form onSubmit={handleSubmit}>

                <select
                    value={medication.medicationName}
                    onChange={handleMedicationSelect}
                >
                    <option value="">Select Medication</option>

                    {medications.map((med) => (
                        <option key={med.id} value={med.id}>
                            {med.medicationName}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={medication.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="dosage"
                    placeholder="Dosage"
                    value={medication.dosage}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="quantityAvailable"
                    placeholder="Quantity Available"
                    value={medication.quantityAvailable}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="expiryDate"
                    value={medication.expiryDate}
                    onChange={handleChange}
                    required
                />

                <select
                    name="clinicId"
                    value={medication.clinicId}
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

                <button type="submit">
                    {editingId ? "Update Medication" : "Save Medication"}
                </button>

            </form>

            <hr />

            <table border="1" cellPadding="10">

                <thead>

                <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Quantity</th>
                    <th>Expiry Date</th>
                    <th>Clinic</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {medications.map((medication) => (

                    <tr key={medication.id}>

                        <td>{medication.medicationName}</td>
                        <td>{medication.dosage}</td>
                        <td>{medication.quantityAvailable}</td>
                        <td>{medication.expiryDate}</td>
                        <td>{medication.clinicName}</td>

                        <td>

                            <button
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
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(medication.id)}
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