import api from "./api";


// =========================================================
// CREATE APPOINTMENT
// =========================================================

export const createAppointment = async (appointment) => {

    const response = await api.post(
        "/appointments",
        appointment
    );

    return response.data;
};


// =========================================================
// GET APPOINTMENTS BY CLINIC AND DATE
// =========================================================

export const getAppointmentsByClinicAndDate = async (
    clinicId,
    date
) => {

    const response = await api.get(
        `/appointments/clinic/${clinicId}/date/${date}`
    );

    return response.data;
};


// =========================================================
// GET MY APPOINTMENTS
// =========================================================

export const getMyAppointments = async () => {

    const response = await api.get(
        "/appointments/my"
    );

    return response.data;
};


// =========================================================
// CANCEL APPOINTMENT
// =========================================================

export const cancelAppointment = async (
    appointmentId
) => {

    const response = await api.delete(
        `/appointments/${appointmentId}`
    );

    return response.data;
};


// =========================================================
// GET ALL APPOINTMENTS
// =========================================================

export const getAllAppointments = async () => {

    const response = await api.get(
        "/appointments"
    );

    return response.data;
};


// =========================================================
// GET APPOINTMENT BY ID
// =========================================================

export const getAppointmentById = async (
    appointmentId
) => {

    const response = await api.get(
        `/appointments/${appointmentId}`
    );

    return response.data;
};


// =========================================================
// GET APPOINTMENTS BY CLINIC
// =========================================================

export const getAppointmentsByClinic = async (
    clinicId
) => {

    const response = await api.get(
        `/appointments/clinic/${clinicId}`
    );

    return response.data;
};


// =========================================================
// GET APPOINTMENTS BY PATIENT
// =========================================================

export const getAppointmentsByPatient = async (
    patientId
) => {

    const response = await api.get(
        `/appointments/patient/${patientId}`
    );

    return response.data;
};


// =========================================================
// GET APPOINTMENTS BY DATE
// =========================================================

export const getAppointmentsByDate = async (
    date
) => {

    const response = await api.get(
        `/appointments/date/${date}`
    );

    return response.data;
};


// =========================================================
// COMPLETE APPOINTMENT
// =========================================================

export const completeAppointment = async (
    appointmentId
) => {

    const response = await api.put(
        `/appointments/${appointmentId}/complete`
    );

    return response.data;
};