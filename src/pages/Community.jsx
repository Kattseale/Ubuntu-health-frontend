import { useEffect, useState } from "react";
import {
    getAllPosts,
    createPost,
    deletePost
} from "../services/communityService";

import { getAllClinics } from "../services/clinicService";

import CommunityCard from "./CommunityCard";
import CreatePostModal from "./CreatePostModal";

import "./community.css";

function Community() {

    const [posts, setPosts] = useState([]);
    const [clinics, setClinics] = useState([]);

    const [showModal, setShowModal] = useState(false);

    // Replace later with logged-in user's ID
    const currentUserId = 1;

    useEffect(() => {
        loadPosts();
        loadClinics();
    }, []);

    const loadPosts = async () => {
        try {

            const data = await getAllPosts();

            setPosts(data);

        } catch (error) {
            console.error(error);
        }
    };

    const loadClinics = async () => {
        try {

            const response = await getAllClinics();

            setClinics(response);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (post) => {

        try {

            await createPost({
                ...post,
                patientId: currentUserId
            });

            setShowModal(false);

            loadPosts();

        } catch (error) {

            console.error(error);

            alert("Unable to create post.");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this post?"))
            return;

        try {

            await deletePost(id);

            loadPosts();

        } catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (post) => {

        console.log(post);

        // Next step

    };

    return (

        <div className="community-page">

            <div className="community-top">

                <h2>Community</h2>

                <button
                    className="create-post-btn"
                    onClick={() => setShowModal(true)}
                >
                    Create Post
                </button>

            </div>

            <CreatePostModal
                show={showModal}
                clinics={clinics}
                onClose={() => setShowModal(false)}
                onCreate={handleCreate}
            />

            {
                posts.length === 0 ?

                    <p>No posts available.</p>

                    :

                    posts.map(post => (

                        <CommunityCard
                            key={post.id}
                            post={post}
                            currentUserId={currentUserId}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />

                    ))

            }

        </div>

    );

}

export default Community;