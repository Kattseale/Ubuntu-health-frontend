import { useState } from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";


export default function Announcements() {
    const { darkMode } = useContext(ThemeContext);


    const [announcements] = useState([
        {
            id: 1,
            title: "Clinic Closing Early",
            message: "Hillbrow Clinic will close at 15:00 today due to maintenance.",
            postedBy: "Administrator",
            date: "17 June 2026"
        },
        {
            id: 2,
            title: "Flu Vaccination Campaign",
            message: "Free flu vaccinations are now available at all Ubuntu Health clinics.",
            postedBy: "Administrator",
            date: "16 June 2026"
        },
        {
            id: 3,
            title: "New Doctor Available",
            message: "A new general practitioner has joined the Soweto Clinic team.",
            postedBy: "Administrator",
            date: "15 June 2026"
        }
    ]);

    return (
        <div
            className="page"
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "white" : "black",
                minHeight: "100vh",
                padding: "20px"
            }}
        >

            <h1 className="page-title">
                📢 Official Announcements
            </h1>


            <p style={{ marginBottom: "30px", color: darkMode ? "#ccc" : "gray" }}>
                Stay informed with official updates from Ubuntu Health.
            </p>

            {announcements.map((announcement) => (

                <div
                    key={announcement.id}
                    className="card"
                    style={{ marginBottom: "20px" }}
                >

                    <h2>{announcement.title}</h2>

                    <p>{announcement.message}</p>

                    <hr />

                    <small>
                        <strong>Posted By:</strong> {announcement.postedBy}
                    </small>

                    <br />

                    <small>
                        <strong>Date:</strong> {announcement.date}
                    </small>

                </div>

            ))}
        </div>

    );

}