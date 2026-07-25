import { useEffect, useState } from "react";

import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} from "../services/communityService";

import { getAllPatients } from "../services/patientService";
import { getAllClinics } from "../services/clinicService";

export default function Community() {

    const [posts, setPosts] = useState([]);
    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

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

            const [
                postsData,
                patientsData,
                clinicsData
            ] = await Promise.all([
                getAllPosts(),
                getAllPatients(),
                getAllClinics()
            ]);

            setPosts(postsData);
            setPatients(patientsData);
            setClinics(clinicsData);

        } catch (error) {

            console.error(error);

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
                setSuccessMessage("✅ Post created successfully!");

            } else {

                await createPost(post);
                setSuccessMessage("✅ Post updated successfully!");

            }

            setPost({
                message: "",
                patientId: "",
                clinicId: ""
            });

            setEditingId(null);

            await loadData();

        } catch (error) {

            console.error(error);
            alert("Unable to save post.");

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

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this post?")) return;

        try {

            await deletePost(id);

            await loadData();

        } catch (error) {

            console.error(error);
            alert("Unable to delete post.");

        }

    };

    const filteredPosts = [...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter(post =>
            post.message.toLowerCase().includes(search.toLowerCase()) ||

            post.patientName?.toLowerCase().includes(search.toLowerCase()) ||

            post.clinicName?.toLowerCase().includes(search.toLowerCase())
        );

    return (

        <div>
            <div style={{ marginBottom: "30px" }}>

                <h1>👥 Community</h1>

                <p
                    style={{
                        color: "#666",
                        fontSize: "16px"
                    }}
                >
                    Share health tips, clinic updates and community experiences with other patients.
                </p>

            </div>
            {successMessage && (
                <div
                    style={{
                        background: "#d1e7dd",
                        color: "#0f5132",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >
                    {successMessage}
                </div>
            )}
            <div className="card">

                <form onSubmit={handleSubmit}>

                    <select
                        name="patientId"
                        value={post.patientId}
                        onChange={handleChange}
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
                        placeholder="Share something with the community..."
                        rows={4}
                        style={{
                            width: "100%",
                            padding: "10px"
                        }}
                        required
                    />
                    <p
                        style={{
                            textAlign: "right",
                            color: "#666",
                            marginTop: "5px",
                            marginBottom: "15px"
                        }}
                    >
                        {post.message.length}/1000 characters
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
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "20px"
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

                <div className="card">

                    <div
                        style={{
                            textAlign: "center",
                            padding: "40px"
                        }}
                    >
                        <h2>👥</h2>

                        <h3>No community posts yet</h3>

                        <p style={{ color: "#777" }}>
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
                            marginBottom: "20px"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >

                            <div>

                                <h3>
                                    👤 {communityPost.patientName}
                                </h3>

                                <p>
                                    🏥 {communityPost.clinicName}
                                </p>

                            </div>

                            <small>
                                {communityPost.createdAt}
                            </small>

                        </div>

                        <hr />

                        <p>{communityPost.message}</p>

                        <button
                            className="btn-primary"
                            onClick={() => handleEdit(communityPost)}
                        >
                            Edit
                        </button>

                        <button
                            className="btn-danger"
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleDelete(communityPost.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>

    );

}