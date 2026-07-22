import axios from "axios";

const API_URL = "http://localhost:8080/api/clinics";

export const getAllClinics = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createClinic = async (clinic) => {
    const response = await axios.post(API_URL, clinic);
    return response.data;
};
export const updateClinic = async (id, clinic) => {
    const response = await axios.put(`${API_URL}/${id}`, clinic);
    return response.data;
};
export const deleteClinic = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};