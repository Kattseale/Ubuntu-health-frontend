import { getRole } from "../services/authService";

export default function RoleDashboard() {

    const role = getRole();

    switch (role) {

        case "ADMIN":
            return (
                <>
                    <h2>Administrator Dashboard</h2>
                    <p>Manage the entire Ubuntu Health system.</p>
                </>
            );

        case "DOCTOR":
            return (
                <>
                    <h2>Doctor Dashboard</h2>
                    <p>View your patients, appointments and medical records.</p>
                </>
            );

        case "NURSE":
            return (
                <>
                    <h2>Nurse Dashboard</h2>
                    <p>Manage patient care and medication administration.</p>
                </>
            );

        case "RECEPTIONIST":
            return (
                <>
                    <h2>Receptionist Dashboard</h2>
                    <p>Manage appointments, patient registrations and clinics.</p>
                </>
            );

        case "PATIENT":
            return (
                <>
                    <h2>Patient Dashboard</h2>
                    <p>View your appointments, recommendations and community posts.</p>
                </>
            );

        default:
            return (
                <h2>Welcome to Ubuntu Health</h2>
            );

    }

}