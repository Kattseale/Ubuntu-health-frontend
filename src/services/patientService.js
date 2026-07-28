import api from "./api";

const API_URL = "http://localhost:8080/api/patients";

export const getAllPatients = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export const createPatient = async (patient) => {
    const response = await api.post(API_URL, patient);
    return response.data;
};

export const updatePatient = async (id, patient) => {

    console.log("Updating patient:", patient);

    const response = await api.put(`${API_URL}/${id}`, patient);

    return response.data;
};

export const deletePatient = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};