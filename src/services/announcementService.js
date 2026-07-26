import api from "./api";

export const getAllAnnouncements = async () => {
    const response = await api.get("/announcements");
    return response.data;
};

export const createAnnouncement = async (announcement) => {
    const response = await api.post("/announcements", announcement);
    return response.data;
};

export const updateAnnouncement = async (id, announcement) => {
    const response = await api.put(`/announcements/${id}`, announcement);
    return response.data;
};

export const deleteAnnouncement = async (id) => {
    await api.delete(`/announcements/${id}`);
};