import api from "./api";

const API_URL = "/clinics";

export const getAllClinics = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export const createClinic = async (clinic) => {
    const response = await api.post(API_URL, clinic);
    return response.data;
};

export const updateClinic = async (id, clinic) => {
    const response = await api.put(`${API_URL}/${id}`, clinic);
    return response.data;
};

export const deleteClinic = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};