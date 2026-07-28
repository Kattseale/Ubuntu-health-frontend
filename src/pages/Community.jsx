import { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import {
    getAllPosts,
    createPost,
    updatePost,
} from "../services/communityService";


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

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);


    const [post, setPost] = useState({

        title: "",

        content: ""

    });



    useEffect(() => {

        loadData();

    }, []);



    async function loadData() {

        try {

            setLoading(true);


            const postsData = await getAllPosts();


            console.log(postsData);


            setPosts(postsData);


        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Failed to load community posts."
            );


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


                await updatePost(
                    editingId,
                    post
                );


                setSuccessMessage(
                    "Post updated successfully."
                );


            } else {


                await createPost(post);


                setSuccessMessage(
                    "Post created successfully."
                );


            }



            setPost({

                title: "",

                content: ""

            });


            setEditingId(null);


            loadData();



        } catch (error) {


            console.error(error);


            setErrorMessage(
                "Failed to save post."
            );


        }

    };




    const handleEdit = (communityPost) => {


        setEditingId(
            communityPost.id
        );


        setPost({

            title: communityPost.title,

            content: communityPost.content

        });


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    };




    const filteredPosts = posts.filter((communityPost) => {


        const searchText =
            search.toLowerCase();



        return (

            (communityPost.title || "")
                .toLowerCase()
                .includes(searchText)


            ||

            (communityPost.content || "")
                .toLowerCase()
                .includes(searchText)


            ||

            (communityPost.userName || "")
                .toLowerCase()
                .includes(searchText)

        );


    });





    if (loading) {

        return (

            <div className="page">

                <h2>
                    Loading Community...
                </h2>

            </div>

        );

    }




    return (

        <div

            className="page"

            style={{

                backgroundColor:
                    darkMode ? "#121212" : "#f4f8fb",

                color:
                    darkMode ? "white" : "black",

                minHeight: "100vh",

                padding: "20px"

            }}

        >



            <h1>
                👥 Community
            </h1>



            {
                successMessage && (

                    <div

                        style={{

                            background:
                                darkMode
                                    ? "#1e4620"
                                    : "#d1e7dd",

                            padding: "12px",

                            marginBottom: "20px",

                            borderRadius: "8px"

                        }}

                    >

                        {successMessage}

                    </div>

                )
            }




            {
                errorMessage && (

                    <div

                        style={{

                            background:
                                darkMode
                                    ? "#4a1f1f"
                                    : "#f8d7da",

                            padding: "12px",

                            marginBottom: "20px",

                            borderRadius: "8px"

                        }}

                    >

                        {errorMessage}

                    </div>

                )
            }





            <p>

                Share health tips, clinic experiences and healthcare discussions with your community.

            </p>




            <div

                className="card"

                style={{

                    backgroundColor:
                        darkMode ? "#1e1e1e" : "white",

                    padding:"20px"

                }}

            >


                <form onSubmit={handleSubmit}>


                    <input

                        type="text"

                        name="title"

                        value={post.title}

                        onChange={handleChange}

                        placeholder="Post title"

                        style={inputStyle}

                        required

                    />



                    <br /><br />



                    <textarea

                        name="content"

                        value={post.content}

                        onChange={handleChange}

                        placeholder="Share your healthcare experience..."

                        rows="5"

                        style={inputStyle}

                        required

                    />

                    {
                        post.content.length > 0 &&
                        post.content.length < 5 && (

                            <p style={{
                                color:"red"
                            }}>
                                Content must be at least 5 characters.
                            </p>

                        )
                    }


                    <p style={{
                        textAlign:"right"
                    }}>

                        {post.content.length}/3000

                    </p>



                    <button

                        className="btn-primary"

                        type="submit"

                        disabled={
                            !post.title.trim()
                            ||
                            !post.content.trim()
                        }

                    >

                        {
                            editingId
                                ? "Update Post"
                                : "Create Post"
                        }


                    </button>



                </form>


            </div>





            <br />



            <input

                type="text"

                placeholder="🔍 Search posts..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                style={{

                    ...inputStyle,

                    marginBottom:"15px"

                }}

            />




            {
                filteredPosts.length === 0 ? (


                    <div className="card">


                        <h3>
                            No community posts yet
                        </h3>


                        <p>
                            Be the first person to share.
                        </p>


                    </div>



                ) : (


                    filteredPosts.map((communityPost)=>(


                        <div

                            key={communityPost.id}

                            className="card"

                            style={{

                                backgroundColor:
                                    darkMode
                                        ? "#1e1e1e"
                                        : "white",

                                padding:"20px",

                                marginBottom:"20px"

                            }}

                        >



                            <h3>

                                👤 {communityPost.userName}

                            </h3>



                            <small>

                                🕒 {
                                new Date(
                                    communityPost.createdAt
                                )
                                    .toLocaleString()
                            }

                            </small>



                            <hr />



                            <h2>

                                {communityPost.title}

                            </h2>



                            <p>

                                {communityPost.content}

                            </p>



                            <button

                                className="btn-primary"

                                onClick={()=>
                                    handleEdit(
                                        communityPost
                                    )
                                }

                            >

                                ✏️ Edit

                            </button>



                        </div>


                    ))


                )

            }



        </div>

    );

}