import { useState } from "react";

export default function Community() {

    const [posts, setPosts] = useState([
        {
            id: 1,
            patient: "Sarah M.",
            clinic: "Hillbrow Clinic",
            message: "The queue is very long today.",
            time: "Today 09:35"
        },
        {
            id: 2,
            patient: "John D.",
            clinic: "Soweto Clinic",
            message: "The pharmacy has insulin again.",
            time: "Today 10:15"
        }
    ]);

    const [newPost, setNewPost] = useState("");

    const handlePost = () => {

        if (!newPost.trim()) return;

        const post = {
            id: Date.now(),
            patient: "Current Patient",
            clinic: "Selected Clinic",
            message: newPost,
            time: new Date().toLocaleString()
        };

        setPosts([post, ...posts]);

        setNewPost("");

    };

    return (

        <div className="page">

            <h1 className="page-title">
                👥 Community Updates
            </h1>

            <div className="card">

                <textarea
                    rows="4"
                    placeholder="Share an update with other patients..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "15px",
                        borderRadius: "8px",
                        resize: "none"
                    }}
                />

                <br /><br />

                <button
                    className="btn-primary"
                    onClick={handlePost}
                >
                    Post Update
                </button>

            </div>

            {posts.map(post => (

                <div
                    className="card"
                    key={post.id}
                >

                    <h3>{post.patient}</h3>

                    <p><strong>🏥 Clinic:</strong> {post.clinic}</p>

                    <p>{post.message}</p>

                    <small>{post.time}</small>

                </div>

            ))}

        </div>

    );

}