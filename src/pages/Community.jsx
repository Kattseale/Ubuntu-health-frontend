import { useState } from "react";

export default function Community() {

    const [posts, setPosts] = useState([
        {
            id: 1,
            clinic: "Soweto Clinic",
            category: "Queue Update",
            message: "The queue is very short today. Waiting time is around 20 minutes.",
            postedBy: "Patient",
            likes: 5,
            date: "Today 09:30"
        },
        {
            id: 2,
            clinic: "Hillbrow Clinic",
            category: "Medicine Update",
            message: "Flu vaccines are available again.",
            postedBy: "Patient",
            likes: 12,
            date: "Yesterday 15:00"
        }
    ]);


    const [newPost, setNewPost] = useState({
        clinic: "",
        category: "",
        message: ""
    });


    const handleChange = (e) => {

        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        });

    };


    const addPost = (e) => {

        e.preventDefault();

        const post = {

            id: Date.now(),
            clinic: newPost.clinic,
            category: newPost.category,
            message: newPost.message,
            postedBy: "Patient",
            likes: 0,
            date: new Date().toLocaleString()

        };


        setPosts([
            post,
            ...posts
        ]);


        setNewPost({
            clinic: "",
            category: "",
            message: ""
        });

    };


    const likePost = (id) => {

        setPosts(
            posts.map(post =>
                post.id === id
                    ? {...post, likes: post.likes + 1}
                    : post
            )
        );

    };


    const deletePost = (id) => {

        setPosts(
            posts.filter(post => post.id !== id)
        );

    };


    return (

        <div className="page">


            <h1 className="page-title">
                👥 Community Updates
            </h1>


            <p style={{color:"#666"}}>
                Share clinic updates, waiting times and healthcare information with other patients.
            </p>


            <div className="card">


                <h2>Create Update</h2>


                <form onSubmit={addPost}>


                    <input
                        type="text"
                        name="clinic"
                        placeholder="Clinic Name"
                        value={newPost.clinic}
                        onChange={handleChange}
                        required
                    />


                    <select
                        name="category"
                        value={newPost.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Queue Update">
                            Queue Update
                        </option>

                        <option value="Medicine Update">
                            Medicine Update
                        </option>

                        <option value="General Information">
                            General Information
                        </option>

                    </select>


                    <textarea
                        name="message"
                        placeholder="Write your update..."
                        value={newPost.message}
                        onChange={handleChange}
                        required
                    />


                    <button
                        className="btn-primary"
                        type="submit"
                    >
                        Post Update
                    </button>


                </form>


            </div>


            <hr />


            {posts.map(post => (

                <div
                    className="card"
                    key={post.id}
                    style={{marginBottom:"20px"}}
                >

                    <h2>
                        🏥 {post.clinic}
                    </h2>


                    <strong>
                        {post.category}
                    </strong>


                    <p>
                        {post.message}
                    </p>


                    <small>
                        Posted by {post.postedBy}
                        <br/>
                        {post.date}
                    </small>


                    <br/><br/>


                    <button
                        className="btn-primary"
                        onClick={() => likePost(post.id)}
                    >
                        ❤️ {post.likes} Likes
                    </button>


                    <button
                        className="btn-danger"
                        onClick={() => deletePost(post.id)}
                        style={{marginLeft:"10px"}}
                    >
                        🗑 Delete
                    </button>


                </div>

            ))}


        </div>

    );

}