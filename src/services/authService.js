import api from "./api";

const API_URL = "/auth";

// ============================================================
// REGISTER
// ============================================================

export const register = async (userData) => {
    const response = await api.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};


// ============================================================
// LOGIN
// ============================================================

export const login = async (loginData) => {
    const response = await api.post(
        `${API_URL}/login`,
        loginData
    );

    return response.data;
};


// ============================================================
// VERIFY EMAIL
// ============================================================

export const verifyEmail = async (token) => {
    const response = await api.get(
        `${API_URL}/verify-email`,
        {
            params: {
                token: token
            }
        }
    );

    return response.data;
};


// ============================================================
// RESEND VERIFICATION EMAIL
// ============================================================

export const resendVerificationEmail = async (email) => {
    const response = await api.post(
        `${API_URL}/resend-verification`,
        {
            email: email.trim().toLowerCase()
        }
    );

    return response.data;
};


// ============================================================
// FORGOT PASSWORD
// ============================================================

export const forgotPassword = async (data) => {
    const response = await api.post(
        `${API_URL}/forgot-password`,
        data
    );

    return response.data;
};


// ============================================================
// RESET PASSWORD
// ============================================================

export const resetPassword = async (
    token,
    newPassword
) => {
    const response = await api.post(
        `${API_URL}/reset-password`,
        {
            token,
            newPassword
        }
    );

    return response.data;
};


// ============================================================
// CHANGE PASSWORD
// ============================================================

export const changePassword = async (passwordData) => {
    const response = await api.post(
        `${API_URL}/change-password`,
        passwordData
    );

    return response.data;
};


// ============================================================
// SAVE USER
// ============================================================

export const saveUser = (loginResponse) => {

    if (!loginResponse) {
        return;
    }

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


// ============================================================
// GET TOKEN
// ============================================================

export const getToken = () => {
    return sessionStorage.getItem("token");
};


// ============================================================
// GET EMAIL
// ============================================================

export const getEmail = () => {
    return sessionStorage.getItem("email");
};


// ============================================================
// GET ROLE
// ============================================================

export const getRole = () => {
    return sessionStorage.getItem("role");
};


// ============================================================
// GET USER
// ============================================================

export const getUser = () => {

    const user = sessionStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error(
            "Unable to parse stored user:",
            error
        );

        return null;
    }
};


// ============================================================
// AUTH CHECK
// ============================================================

export const isAuthenticated = () => {

    const token = getToken();

    return token !== null;
};


// ============================================================
// LOGOUT
// ============================================================

export const logout = () => {

    sessionStorage.removeItem("token");

    sessionStorage.removeItem("email");

    sessionStorage.removeItem("role");

    sessionStorage.removeItem("user");
};


// ============================================================
// ROLE CHECK
// ============================================================

export const hasRole = (role) => {
    return getRole() === role;
};


// ============================================================
// API EXPORT
// ============================================================

export { api };