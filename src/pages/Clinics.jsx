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

            await fetchClinics();

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

        if (!window.confirm("Delete this clinic?")) return;

        try {

            await deleteClinic(id);

            await fetchClinics();

            alert("Clinic deleted successfully!");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "white" : "black",
                minHeight: "100vh",
                padding: "20px"
            }}
        >

            <h1>Clinics</h1>

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

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >
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
                        name="clinicName"
                        placeholder="Clinic Name"
                        value={clinic.clinicName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="province"
                        placeholder="Province"
                        value={clinic.province}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={clinic.city}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={clinic.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        placeholder="Latitude"
                        value={clinic.latitude}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        placeholder="Longitude"
                        value={clinic.longitude}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={clinic.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <input
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
                    >
                        {editingId ? "Update Clinic" : "Save Clinic"}
                    </button>

                </form>
                </div>

            </div>

            <hr />

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        color: darkMode ? "white" : "black"
                    }}
                >

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

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}