import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import ThemeContext from "../context/ThemeContext";

import {
    getAllAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from "../services/announcementService";

import { getRole } from "../services/authService";

import AnnouncementCard from "../components/AnnouncementCard";
import AddAnnouncementModal from "../components/AddAnnouncementModal";


export default function Announcements() {

    const { darkMode } = useContext(ThemeContext);

    const role = getRole();


    const [announcements, setAnnouncements] = useState([]);

    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);



    const canCreate = role === "ADMIN";

    const canDelete = role === "ADMIN";



    const loadAnnouncements = async () => {

        try {

            setLoading(true);

            const data = await getAllAnnouncements();

            setAnnouncements(data);

        } catch (error) {

            console.error(error);

            alert("Failed to load announcements.");

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {
        loadAnnouncements();
    }, []);


    // ROLE PROTECTION
    if (role !== "ADMIN" && role !== "PATIENT") {

        return <Navigate to="/home" replace />;

    }

    const handleCreate = () => {

        setSelectedAnnouncement(null);

        setOpenModal(true);

    };



    const handleEdit = (announcement) => {

        setSelectedAnnouncement(announcement);

        setOpenModal(true);

    };



    const handleSave = async (announcementData) => {
        try {
            if (selectedAnnouncement) {
                await updateAnnouncement(
                    selectedAnnouncement.id,
                    announcementData
                );
            } else {
                await createAnnouncement(announcementData);
            }

            setOpenModal(false);
            setSelectedAnnouncement(null);
            await loadAnnouncements();

        } catch (error) {
            console.error("Save Error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
                alert(JSON.stringify(error.response.data));
            } else {
                alert(error.message);
            }
        }
    };



    const handleDelete = async (id) => {


        if (!window.confirm("Delete this announcement?")) {

            return;

        }

        try {

            await deleteAnnouncement(id);
            await loadAnnouncements();

        } catch (error) {


            console.error(error);

            alert("Unable to delete announcement.");


        }


    };

    return (

        <div
            className="page"
            style={{

                backgroundColor: darkMode
                    ? "#121212"
                    : "#f4f8fb",

                color: darkMode
                    ? "white"
                    : "black",

                minHeight: "100vh",

                padding: "20px"

            }}
        >


            <div
                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    marginBottom: "30px"

                }}
            >


                <div>

                    <h1 className="page-title">
                        📢 Official Announcements
                    </h1>


                    <p
                        style={{

                            color: darkMode
                                ? "#ccc"
                                : "gray"

                        }}
                    >
                        Stay informed with official updates from Ubuntu Health.
                    </p>


                </div>



                {canCreate && (

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                    >

                        + New Announcement

                    </button>

                )}



            </div>


            {loading ? (


                <h3>
                    Loading announcements...
                </h3>



            ) : announcements.length === 0 ? (



                <div
                    className="card"
                    style={{
                        backgroundColor: darkMode ? "#1e1e1e" : "white",
                        color: darkMode ? "white" : "black",
                        border: darkMode ? "1px solid #333" : "1px solid #ddd"
                    }}
                >

                    <h3>
                        No announcements available.
                    </h3>

                </div>




            ) : (

                announcements.map((announcement) => (


                    <AnnouncementCard
                        key={announcement.id}
                        announcement={announcement}
                        darkMode={darkMode}
                        onEdit={canCreate ? handleEdit : undefined}
                        onDelete={canDelete ? handleDelete : undefined}
                    />

                ))

            )}

            <AddAnnouncementModal
                open={openModal}
                announcement={selectedAnnouncement}
                darkMode={darkMode}
                onClose={() => setOpenModal(false)}
                onSave={handleSave}
            />

        </div>

    );

}