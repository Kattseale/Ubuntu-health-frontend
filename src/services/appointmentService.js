import api from "./api";

export const createAppointment = async (appointment) => {
    const response = await api.post("/appointments", appointment);
    return response.data;
};

const API_URL = "http://localhost:8080/api/appointments";

export const getAllAppointments = async () => {
    const response = await api.get(API_URL);
    return response.data;
};


export const updateAppointment = async (id, appointment) => {
    const response = await api.put(`${API_URL}/${id}`, appointment);
    return response.data;
};

export const deleteAppointment = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};