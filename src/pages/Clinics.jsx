import { useEffect, useState } from "react";
import { getAllClinics } from "../services/clinicService";

export default function Clinics() {
    const [clinics, setClinics] = useState([]);

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

    return (
        <div>
            <h1>Clinics</h1>

            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Clinic Name</th>
                    <th>City</th>
                    <th>Province</th>
                    <th>Email</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}