import api from "./api";

const API_URL = "/auth";

// =========================
// REGISTER
// =========================
export const register = async (userData) => {
    const response = await api.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};
// =========================
// Resend verification email
// =========================
export const resendVerificationEmail = async (email) => {
    const response = await api.post(
        "/auth/resend-verification",
        {
            email: email.trim().toLowerCase()
        }
    );

    return response.data;
};


// =========================
// LOGIN
// =========================
export const login = async (loginData) => {
    const response = await api.post(
        `${API_URL}/login`,
        loginData
    );

    return response.data;
};


// =========================
// VERIFY EMAIL
// =========================
export const verifyEmail = async (token) => {
    const response = await api.get(
        `${API_URL}/verify-email`,
        {
            params: {
                token
            }
        }
    );

    return response.data;
};


// =========================
// FORGOT PASSWORD
// =========================
export const forgotPassword = async (data) => {
    const response = await api.post(
        "/auth/forgot-password",
        data
    );

    return response.data;
};


// ============================================================
// RESET PASSWORD
// ============================================================

export const resetPassword = async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
    });

    return response.data;
};


// =========================
// CHANGE PASSWORD
// =========================
export const changePassword = async (passwordData) => {
    const response = await api.post(
        `${API_URL}/change-password`,
        passwordData
    );

    return response.data;
};


// =========================
// SAVE USER
// =========================
export const saveUser = (loginResponse) => {

    sessionStorage.setItem(
        "token",
        loginResponse.token
    );

    sessionStorage.setItem(
        "email",
        loginResponse.email
    );

    sessionStorage.setItem(
        "role",
        loginResponse.role
    );

    sessionStorage.setItem(
        "user",
        JSON.stringify(loginResponse)
    );
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

    return user
        ? JSON.parse(user)
        : null;
};


// =========================
// AUTH CHECK
// =========================
export const isAuthenticated = () => {

    const token = getToken();

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