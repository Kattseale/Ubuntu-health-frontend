import axios from "axios";

const API_URL = "http://localhost:8080/api/community";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getAllPosts = async () => {
    const response = await axios.get(API_URL, authHeader());
    return response.data;
};

export const getPostById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, authHeader());
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL, post, authHeader());
    return response.data;
};

export const updatePost = async (id, post) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        post,
        authHeader()
    );
    return response.data;
};

export const deletePost = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        authHeader()
    );
    return response.data;
};