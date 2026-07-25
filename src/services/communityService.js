import axios from "axios";

const API_URL = "http://localhost:8080/api/community";

// Get all posts
export const getAllPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get one post
export const getPostById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create post
export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

// Update post
export const updatePost = async (id, post) => {
    const response = await axios.put(`${API_URL}/${id}`, post);
    return response.data;
};

// Delete post
export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// Get posts by clinic
export const getPostsByClinic = async (clinicId) => {
    const response = await axios.get(`${API_URL}/clinic/${clinicId}`);
    return response.data;
};

// Get posts by patient
export const getPostsByPatient = async (patientId) => {
    const response = await axios.get(`${API_URL}/patient/${patientId}`);
    return response.data;
};