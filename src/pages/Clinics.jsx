import { useEffect, useState } from "react";
import {getAllClinics, createClinic, updateClinic} from "../services/clinicService";
export default function Clinics() {
    const [clinics, setClinics] = useState([]);

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

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const data = await getAllClinics();
                setClinics(data);
            } catch (error) {
                console.error("Error fetching clinics:", error);
            }
        };

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

        try {
            if (editingId) {
                await updateClinic(editingId, clinic);
                alert("Clinic updated successfully!");
            } else {
                await createClinic(clinic);
                alert("Clinic added successfully!");
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

            const data = await getAllClinics();
            setClinics(data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Clinics</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="clinicName"
                    placeholder="Clinic Name"
                    value={clinic.clinicName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="province"
                    placeholder="Province"
                    value={clinic.province}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={clinic.city}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={clinic.address}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="any"
                    name="latitude"
                    placeholder="Latitude"
                    value={clinic.latitude}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="any"
                    name="longitude"
                    placeholder="Longitude"
                    value={clinic.longitude}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={clinic.phoneNumber}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={clinic.email}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingId ? "Update Clinic" : "Save Clinic"}
                </button>
            </form>

            <hr />

            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Clinic Name</th>
                    <th>City</th>
                    <th>Province</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {clinics.map((clinic) => (
                    <tr key={clinic.id}>
                        <td>{clinic.id}</td>
                        <td>{clinic.clinicName}</td>
                        <td>{clinic.city}</td>
                        <td>{clinic.province}</td>
                        <td>{clinic.email}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setClinic(clinic);
                                    setEditingId(clinic.id);
                                }}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}