import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {

        const token = sessionStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("API REQUEST:", config.method?.toUpperCase(), config.url);
        console.log("TOKEN EXISTS:", !!token);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;