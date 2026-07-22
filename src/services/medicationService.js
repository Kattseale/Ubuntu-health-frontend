import axios from "axios";

const API = "http://localhost:8080/api/medications";

export const getAllMedications = async () => {
    const response = await axios.get(API);
    return response.data;
};

export const createMedication = async (medication) => {
    const response = await axios.post(API, medication);
    return response.data;
};

export const updateMedication = async (id, medication) => {
    const response = await axios.put(`${API}/${id}`, medication);
    return response.data;
};

export const deleteMedication = async (id) => {
    await axios.delete(`${API}/${id}`);
};