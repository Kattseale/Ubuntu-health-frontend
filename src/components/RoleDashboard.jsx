import { getRole } from "../services/authService";
import Dashboard from "./Dashboard";

export default function RoleDashboard() {

    const role = getRole();

    switch (role) {

        case "ADMIN":
            return <Dashboard />;

        case "DOCTOR":
            return (
                <div className="page">

                    <h2>
                        Doctor Dashboard
                    </h2>

                    <p>
                        View your patients, appointments and medical records.
                    </p>

                </div>
            );

        case "NURSE":
            return (
                <div className="page">

                    <h2>
                        Nurse Dashboard
                    </h2>

                    <p>
                        Manage patient care and medication administration.
                    </p>

                </div>
            );

        case "RECEPTIONIST":
            return (
                <div className="page">

                    <h2>
                        Receptionist Dashboard
                    </h2>

                    <p>
                        Manage appointments, patient registrations and clinics.
                    </p>

                </div>
            );

        case "PATIENT":
            return (
                <div className="page">

                    <h2>
                        Patient Dashboard
                    </h2>

                    <p>
                        View your appointments, recommendations and community posts.
                    </p>

                </div>
            );

        default:
            return (
                <div className="page">

                    <h2>
                        Welcome to Ubuntu Health
                    </h2>

                </div>
            );
    }
}
