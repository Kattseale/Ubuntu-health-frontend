import { getAllPatients } from "./patientService";
import { getAllClinics } from "./clinicService";
import { getAllAppointments } from "./appointmentService";
import { getAllMedications } from "./medicationService";

export const getReportData = async () => {

    const [
        patients,
        clinics,
        appointments,
        medications
    ] = await Promise.all([
        getAllPatients(),
        getAllClinics(),
        getAllAppointments(),
        getAllMedications()
    ]);

    return {
        patients,
        clinics,
        appointments,
        medications
    };

};