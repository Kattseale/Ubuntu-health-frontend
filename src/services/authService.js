import api from "./api";

// =========================
// REGISTER
// =========================

export const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

// =========================
// LOGIN
// =========================

export const login = async (loginData) => {
    const response = await api.post("/auth/login", loginData);
    return response.data;
};

// =========================
// SAVE USER
// =========================

export const saveUser = (loginResponse) => {
    sessionStorage.setItem("token", loginResponse.token);
    sessionStorage.setItem("email", loginResponse.email);
    sessionStorage.setItem("role", loginResponse.role);
    sessionStorage.setItem("user", JSON.stringify(loginResponse));
};

// =========================
// TOKEN
// =========================

export const getToken = () => {
    return sessionStorage.getItem("token");
};

// =========================
// EMAIL
// =========================

export const getEmail = () => {
    return sessionStorage.getItem("email");
};

// =========================
// ROLE
// =========================

export const getRole = () => {
    return sessionStorage.getItem("role");
};

// =========================
// USER
// =========================

export const getUser = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// =========================
// AUTH CHECK
// =========================

export const isAuthenticated = () => {
    const token = getToken();
    console.log("Token from sessionStorage:", token);
    return token !== null;
};

// =========================
// LOGOUT
// =========================

export const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");
};

// =========================
// ROLE CHECK
// =========================

export const hasRole = (role) => {
    return getRole() === role;
};

// =========================
// API EXPORT
// =========================

export { api };