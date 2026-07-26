import { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import {
    getAllPosts,
    createPost,
    updatePost,
} from "../services/communityService";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";

export default function Community() {
    const { darkMode } = useContext(ThemeContext);
    const inputStyle = {
        backgroundColor: darkMode ? "#2b2b2b" : "white",
        color: darkMode ? "white" : "black",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        padding: "10px",
        width: "100%",
        boxSizing: "border-box"
    };

    const [posts, setPosts] = useState([]);
    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [post, setPost] = useState({
        message: "",
        patientId: "",
        clinicId: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            setLoading(true);

            const [
                postsData,
                patientsData,
                clinicsData
            ] = await Promise.all([
                getAllPosts(),
                getAllPatients(),
                getAllClinics()
            ]);
            console.log(postsData);

            setPosts(postsData);
            setPatients(patientsData);
            setClinics(clinicsData);

        } catch (error) {

            console.error(error);


        } finally {

            setLoading(false);


        }

    }
    const handleChange = (e) => {

        setPost({
            ...post,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {
                await updatePost(editingId, post);
                setSuccessMessage("✅ Post updated successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            } else {
                await createPost(post);
                setSuccessMessage("✅ Post created successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            }
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            const emptyPost = {
                message:"",
                patientId:"",
                clinicId:""
            };
            setPost(emptyPost);

            setEditingId(null);

            await loadData();

        } catch (error) {

            console.error(error);
            setErrorMessage("Unable to save post!");

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);

        }

    };

    const handleEdit = (communityPost) => {

        setEditingId(communityPost.id);

        setPost({
            message: communityPost.message,
            patientId: communityPost.patientId,
            clinicId: communityPost.clinicId
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };



    const filteredPosts = [...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter(post =>
            post.message.toLowerCase().includes(search.toLowerCase()) ||

            post.patientName?.toLowerCase().includes(search.toLowerCase()) ||

            post.clinicName?.toLowerCase().includes(search.toLowerCase())
        );
    if (loading) {
        return (
            <div className="page">
                <h2>Loading Community...</h2>
            </div>
        );
    }

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
            <div className="page"
                 style={{ marginBottom: "30px" }}>

                <h1>👥 Community</h1>
                {successMessage && (
                    <div className="page"
                        style={{
                            background: darkMode ? "#1e4620" : "#d1e7dd",
                            color: darkMode ? "#8ff0a4" : "#0f5132",
                            padding: "12px",
                            marginBottom: "20px",
                            borderRadius: "8px",
                            border: darkMode ? "1px solid #2f7d32" : "1px solid #badbcc"
                        }}
                    >
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="page"
                        style={{
                            background: darkMode ? "#4a1f1f" : "#f8d7da",
                            color: darkMode ? "#ff9999" : "#842029",
                            padding: "12px",
                            marginBottom: "20px",
                            borderRadius: "8px",
                            border: darkMode ? "1px solid #842029" : "1px solid #f5c2c7"
                        }}
                    >
                        {errorMessage}
                    </div>
                )}

                <p
                    style={{
                        color: darkMode ? "#cccccc" : "#666",
                        fontSize: "16px"
                    }}
                >
                    Share health tips, clinic updates and community experiences with other patients.
                </p>

            </div>

            <div
                className="card"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >

                <form onSubmit={handleSubmit}>

                    <select
                        name="patientId"
                        value={post.patientId}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Select Patient</option>

                        {patients.map((patient) => (

                            <option
                                key={patient.id}
                                value={patient.id}
                            >
                                {patient.firstName} {patient.lastName}
                            </option>

                        ))}

                    </select>

                    <br /><br />

                    <select
                        name="clinicId"
                        value={post.clinicId}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Select Clinic</option>

                        {clinics.map((clinic) => (

                            <option
                                key={clinic.id}
                                value={clinic.id}
                            >
                                {clinic.clinicName}
                            </option>

                        ))}

                    </select>

                    <br /><br />

                    <textarea
                        name="message"
                        value={post.message}
                        onChange={handleChange}
                        maxLength={300}
                        rows={4}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: darkMode ? "#2c2c2c" : "white",
                            color: darkMode ? "white" : "black",
                            border: "1px solid #666",
                            minHeight: "120px",
                            resize: "vertical"
                        }}
                        required
                    />
                    <p
                        style={{
                            textAlign: "right",
                            color: darkMode ? "#ccc" : "#666",
                            marginTop: "5px",
                            marginBottom: "15px"
                        }}
                    >
                        {post.message.length}/300 characters
                    </p>

                    <br /><br />

                    <button
                        className="btn-primary"
                        type="submit"
                        disabled={!post.message.trim()}
                    >
                        {editingId ? "Update Post" : "Create Post"}
                    </button>

                </form>

            </div>

            <br />

            <input
                type="text"
                placeholder="🔍 Search by patient, clinic or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    ...inputStyle,
                    marginBottom: "15px"
                }}
            />
            <button
                className="btn-secondary"
                onClick={() => setSearch("")}
                style={{ marginBottom: "20px" }}
            >
                Clear Search
            </button>

            {filteredPosts.length === 0 ? (

                <div
                    className="card"
                    style={{
                        backgroundColor: darkMode ? "#1e1e1e" : "white",
                        color: darkMode ? "white" : "black"
                    }}
                >

                    <div className="page"
                        style={{
                            textAlign: "center",
                            padding: "40px"
                        }}
                    >
                        <h2>👥</h2>

                        <h3>No community posts yet</h3>

                        <p style={{ color: darkMode ? "#ccc" : "#777" }}>
                            Be the first to share an update with your healthcare community.
                        </p>
                    </div>

                </div>

            ) : (

                filteredPosts.map((communityPost) => (

                    <div
                        key={communityPost.id}
                        className="card"
                        style={{
                            backgroundColor: darkMode ? "#1e1e1e" : "white",
                            color: darkMode ? "white" : "black",
                            marginBottom: "20px",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >

                            <div>

                                <h3 style={{ marginBottom: "5px" }}>
                                    👤 {communityPost.patientName}
                                </h3>

                                <p
                                    style={{
                                        margin: 0,
                                        color: darkMode ? "#bbb" : "#666"
                                    }}
                                >
                                    🏥 {communityPost.clinicName}
                                </p>

                            </div>

                            <small
                                style={{
                                    color: darkMode ? "#999" : "#777"
                                }}
                            >
                                🕒 {new Date(communityPost.createdAt).toLocaleString()}
                            </small>

                        </div>

                        <hr />

                        <p
                            style={{
                                fontSize: "16px",
                                lineHeight: "1.7"
                            }}
                        >
                            {communityPost.message}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "20px"
                            }}
                        >
                            <button
                                className="btn-primary"
                                onClick={() => handleEdit(communityPost)}
                            >
                                ✏️ Edit Post
                            </button>
                        </div>

                    </div>

                ))

            )}

        </div>

    );

}