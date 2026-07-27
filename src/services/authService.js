import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:8080/api/auth";


// =========================
// REGISTER
// =========================

export const register = async (userData) => {

    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};


// =========================
// LOGIN
// =========================

export const login = async (loginData) => {

    const response = await axios.post(
        `${API_URL}/login`,
        loginData
    );

    return response.data;
};


// =========================
// SAVE USER
// =========================

export const saveUser = (loginResponse) => {

    localStorage.setItem(
        "token",
        loginResponse.token
    );

    localStorage.setItem(
        "email",
        loginResponse.email
    );

    localStorage.setItem(
        "role",
        loginResponse.role
    );

    localStorage.setItem(
        "user",
        JSON.stringify(loginResponse)
    );
};


// =========================
// TOKEN
// =========================

export const getToken = () => {

    return localStorage.getItem("token");

};


// =========================
// EMAIL
// =========================

export const getEmail = () => {

    return localStorage.getItem("email");

};


// =========================
// ROLE
// =========================

export const getRole = () => {

    return localStorage.getItem("role");

};


export const hasRole = (role) => {

    return getRole() === role;

};


// =========================
// USER
// =========================

export const getUser = () => {

    const user = localStorage.getItem("user");

    return user
        ? JSON.parse(user)
        : null;

};


// =========================
// AUTH CHECK
// =========================

export const isAuthenticated = () => {

    const token = getToken();

    console.log(
        "Token from localStorage:",
        token
    );

    return token !== null;

};


// =========================
// LOGOUT
// =========================

export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

};


// =========================
// AUTH HEADER
// =========================

export { api };