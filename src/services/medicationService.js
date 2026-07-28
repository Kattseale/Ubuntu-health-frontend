
import api from "./api.js";

const API_URL = "http://localhost:8080/api/medications";

export const getAllMedications = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export const createMedication = async (medication) => {
    const response = await api.post(API_URL, medication);
    return response.data;
};

export const updateMedication = async (id, medication) => {
    const response = await api.put(`${API_URL}/${id}`, medication);
    return response.data;
};

export const deleteMedication = async (id) => {
    await api.delete(`${API_URL}/${id}`);
};