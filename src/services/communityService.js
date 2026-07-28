import api from "./api";

const API_URL = "http://localhost:8080/api/community";


// ================= GET ALL POSTS =================

export const getAllPosts = async () => {

    const response = await api.get(API_URL);

    return response.data;

};



// ================= GET ONE POST =================

export const getPostById = async (id) => {

    const response = await api.get(
        `${API_URL}/${id}`
    );

    return response.data;

};



// ================= CREATE POST =================

export const createPost = async (post) => {

    const response = await api.post(
        API_URL,
        post
    );

    return response.data;

};



// ================= UPDATE POST =================

export const updatePost = async (id, post) => {

    const response = await api.put(
        `${API_URL}/${id}`,
        post
    );

    return response.data;

};



// ================= DELETE POST =================

export const deletePost = async (id) => {

    const response = await api.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};



// ================= MY POSTS =================
// Logged-in patient only

export const getMyPosts = async () => {

    const response = await api.get(
        `${API_URL}/my-posts`
    );

    return response.data;

};