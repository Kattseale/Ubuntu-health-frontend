import { useEffect, useState, useContext } from "react";
import "../styles/appointments.css";
import ThemeContext from "../context/ThemeContext";

import { getAllClinics } from "../services/clinicService";

import {
    createAppointment,
    getAppointmentsByClinicAndDate,
    getMyAppointments,
    cancelAppointment
} from "../services/appointmentService";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";


export default function Appointments() {

    const { darkMode } = useContext(ThemeContext);


    // =========================================================
    // STATE
    // =========================================================

    const [clinics, setClinics] = useState([]);

    const [fullyBookedDates, setFullyBookedDates] = useState([]);

    const [loadingBookedDates, setLoadingBookedDates] =
        useState(false);

    const [bookedTimes, setBookedTimes] = useState([]);

    const [loadingTimes, setLoadingTimes] =
        useState(false);

    const [loadingAppointments, setLoadingAppointments] =
        useState(false);

    const [appointments, setAppointments] = useState([]);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    const [errors, setErrors] = useState({});

    const [cancellingAppointmentId, setCancellingAppointmentId] =
        useState(null);


    const [appointment, setAppointment] = useState({
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        clinicId: ""
    });


    // =========================================================
    // AVAILABLE TIMES
    // =========================================================

    const appointmentTimes = [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30"
    ];


    // =========================================================
    // REASONS
    // =========================================================

    const appointmentReasons = [
        "General Consultation",
        "Dentist",
        "Check-up Routine",
        "Vaccination",
        "Blood Test",
        "Optometrist",
        "Chronic Disease Management",
        "Minor Injury",
        "Family Planning",
        "Mental Health",
        "Women's Health",
        "Men's Health",
        "Children's Health",
        "Emergency Consultation",
        "Other"
    ];


    // =========================================================
    // LOAD CLINICS + MY APPOINTMENTS
    // =========================================================

    useEffect(() => {

        fetchClinics();

        fetchMyAppointments();

    }, []);


    // =========================================================
    // LOAD CLINICS
    // =========================================================

    const fetchClinics = async () => {

        try {

            const data = await getAllClinics();

            setClinics(data);

        } catch (error) {

            console.error(
                "Unable to load clinics:",
                error
            );

            setErrorMessage(
                "Unable to load clinics."
            );
        }
    };


    // =========================================================
    // LOAD MY APPOINTMENTS
    // =========================================================

    const fetchMyAppointments = async () => {

        try {

            setLoadingAppointments(true);

            const data =
                await getMyAppointments();

            setAppointments(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Unable to load appointments:",
                error
            );

            setErrorMessage(
                error.response?.data?.message ||
                "Unable to load your appointments."
            );

        } finally {

            setLoadingAppointments(false);

        }
    };


    // =========================================================
    // FORMAT LOCAL DATE
    // =========================================================

    const formatLocalDate = (date) => {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    // =========================================================
    // FORMAT DISPLAY DATE
    // =========================================================

    const formatDisplayDate = (dateString) => {

        if (!dateString) {
            return "";
        }

        const [
            year,
            month,
            day
        ] = dateString
            .split("-")
            .map(Number);

        const date =
            new Date(
                year,
                month - 1,
                day
            );

        return date.toLocaleDateString(
            "en-ZA",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    };


    // =========================================================
    // FORMAT TIME
    // =========================================================

    const formatTime = (time) => {

        if (!time) {
            return "";
        }

        return time.substring(
            0,
            5
        );
    };


    // =========================================================
    // LOAD FULLY BOOKED DATES
    // =========================================================

    const loadFullyBookedDates = async (
        clinicId,
        monthDate
    ) => {

        if (!clinicId) {

            setFullyBookedDates([]);

            return;
        }


        try {

            setLoadingBookedDates(true);


            const year =
                monthDate.getFullYear();

            const month =
                monthDate.getMonth();


            const firstDay =
                new Date(
                    year,
                    month,
                    1
                );


            const lastDay =
                new Date(
                    year,
                    month + 1,
                    0
                );


            const datesToCheck = [];

            const currentDate =
                new Date(firstDay);


            while (
                currentDate <= lastDay
            ) {

                const day =
                    currentDate.getDay();


                // Monday - Friday only

                if (
                    day !== 0 &&
                    day !== 6
                ) {

                    const today =
                        new Date();

                    today.setHours(
                        0,
                        0,
                        0,
                        0
                    );


                    if (
                        currentDate >= today
                    ) {

                        datesToCheck.push(
                            formatLocalDate(
                                currentDate
                            )
                        );
                    }
                }


                currentDate.setDate(
                    currentDate.getDate() + 1
                );
            }


            const results =
                await Promise.all(

                    datesToCheck.map(
                        async (
                            dateString
                        ) => {

                            try {

                                const appointments =
                                    await getAppointmentsByClinicAndDate(
                                        clinicId,
                                        dateString
                                    );


                                const bookedTimesForDay =
                                    appointments.map(
                                        (item) =>
                                            item
                                                .appointmentTime
                                                ?.substring(
                                                    0,
                                                    5
                                                )
                                    );


                                const isFullyBooked =
                                    appointmentTimes.every(
                                        (time) =>
                                            bookedTimesForDay.includes(
                                                time
                                            )
                                    );


                                return isFullyBooked
                                    ? dateString
                                    : null;

                            } catch (error) {

                                console.error(
                                    `Unable to check ${dateString}`,
                                    error
                                );

                                return null;
                            }
                        }
                    )
                );


            setFullyBookedDates(
                results.filter(Boolean)
            );

        } catch (error) {

            console.error(
                "Unable to load fully booked dates:",
                error
            );

            setFullyBookedDates([]);

        } finally {

            setLoadingBookedDates(false);
        }
    };


    // =========================================================
    // HANDLE INPUTS
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        if (name === "clinicId") {

            setBookedTimes([]);

            setFullyBookedDates([]);

            setAppointment({
                appointmentDate: "",
                appointmentTime: "",
                reason: appointment.reason,
                clinicId: value
            });


            if (value) {

                loadFullyBookedDates(
                    value,
                    new Date()
                );
            }

            return;
        }


        setAppointment({
            ...appointment,
            [name]: value
        });
    };


    // =========================================================
    // DATE CHANGE
    // =========================================================

    const handleDateChange = async (
        selectedDate
    ) => {

        if (!selectedDate) {
            return;
        }


        const [
            year,
            month,
            day
        ] = selectedDate
            .split("-")
            .map(Number);


        const date =
            new Date(
                year,
                month - 1,
                day
            );


        const dayOfWeek =
            date.getDay();


        // Weekend

        if (
            dayOfWeek === 0 ||
            dayOfWeek === 6
        ) {

            setErrorMessage(
                "❌ Weekends are not available. Please select a Monday to Friday."
            );


            setAppointment({
                ...appointment,
                appointmentDate: "",
                appointmentTime: ""
            });


            setBookedTimes([]);

            return;
        }


        setErrorMessage("");


        setAppointment({
            ...appointment,
            appointmentDate: selectedDate,
            appointmentTime: ""
        });


        if (!appointment.clinicId) {

            setBookedTimes([]);

            return;
        }


        try {

            setLoadingTimes(true);


            const data =
                await getAppointmentsByClinicAndDate(
                    appointment.clinicId,
                    selectedDate
                );


            const times =
                data.map(
                    (item) =>
                        item
                            .appointmentTime
                            ?.substring(
                                0,
                                5
                            )
                );


            setBookedTimes(times);

        } catch (error) {

            console.error(
                error
            );


            setErrorMessage(
                "Unable to load appointment availability."
            );


            setBookedTimes([]);

        } finally {

            setLoadingTimes(false);
        }
    };


    // =========================================================
    // SELECT TIME
    // =========================================================

    const handleTimeSelect = (
        time
    ) => {

        if (
            bookedTimes.includes(
                time
            )
        ) {

            return;
        }


        setAppointment({
            ...appointment,
            appointmentTime: time
        });
    };


    // =========================================================
    // SUBMIT / BOOK APPOINTMENT
    // =========================================================

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();


        setErrors({});

        setErrorMessage("");

        setSuccessMessage("");


        try {

            /*
             * Booking is automatic.
             *
             * If the backend accepts the request,
             * the appointment is immediately CONFIRMED.
             */

            await createAppointment(
                appointment
            );


            setSuccessMessage(
                "✅ Your appointment has been booked successfully!"
            );


            // Refresh patient's appointments

            await fetchMyAppointments();


            // Refresh availability for selected date

            if (
                appointment.clinicId &&
                appointment.appointmentDate
            ) {

                try {

                    const data =
                        await getAppointmentsByClinicAndDate(
                            appointment.clinicId,
                            appointment.appointmentDate
                        );


                    const times =
                        data.map(
                            (item) =>
                                item
                                    .appointmentTime
                                    ?.substring(
                                        0,
                                        5
                                    )
                        );


                    setBookedTimes(times);

                } catch (error) {

                    console.error(
                        "Unable to refresh availability:",
                        error
                    );
                }
            }


            // Reset booking form

            setAppointment({
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
                clinicId: ""
            });


            setFullyBookedDates([]);

            setBookedTimes([]);


            setTimeout(() => {

                setSuccessMessage("");

            }, 4000);


        } catch (error) {

            console.error(
                "Booking error:",
                error
            );


            if (
                error.response?.status === 400
            ) {

                setErrors(
                    error.response.data || {}
                );

            } else {

                setErrorMessage(
                    error.response?.data?.message ||
                    "❌ Failed to book appointment."
                );


                setTimeout(() => {

                    setErrorMessage("");

                }, 4000);
            }
        }
    };


    // =========================================================
    // CANCEL APPOINTMENT
    // =========================================================

    const handleCancelAppointment = async (
        appointmentId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this appointment?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setCancellingAppointmentId(
                appointmentId
            );

            setErrorMessage("");

            setSuccessMessage("");


            await cancelAppointment(
                appointmentId
            );


            /*
             * Refresh booking history.
             *
             * The cancelled appointment remains
             * visible because the backend changes
             * its status to CANCELLED instead
             * of deleting it.
             */

            await fetchMyAppointments();


            setSuccessMessage(
                "✅ Appointment cancelled successfully."
            );


            setTimeout(() => {

                setSuccessMessage("");

            }, 4000);


        } catch (error) {

            console.error(
                "Cancellation error:",
                error
            );


            setErrorMessage(
                error.response?.data?.message ||
                "❌ Unable to cancel appointment."
            );

        } finally {

            setCancellingAppointmentId(
                null
            );
        }
    };


    // =========================================================
    // SEPARATE CONFIRMED AND CANCELLED APPOINTMENTS
    // =========================================================

    const confirmedAppointments =
        appointments.filter(
            (item) =>
                item.status === "CONFIRMED"
        );


    const cancelledAppointments =
        appointments.filter(
            (item) =>
                item.status === "CANCELLED"
        );


    // =========================================================
    // INPUT STYLE
    // =========================================================

    const inputStyle = {

        width: "100%",

        height: "56px",

        padding: "0 16px",

        fontSize: "16px",

        backgroundColor:
            darkMode
                ? "#2c2c2c"
                : "#ffffff",

        color:
            darkMode
                ? "#ffffff"
                : "#111111",

        border:
            darkMode
                ? "1px solid #666"
                : "1px solid #999",

        borderRadius: "8px",

        boxSizing: "border-box"
    };


    // =========================================================
    // RETURN
    // =========================================================

    return (

        <div
            className={`appointments-page ${darkMode ? "dark-mode" : ""}`}
            style={{
                backgroundColor: darkMode ? "#121212" : "#f4f8fb",
                color: darkMode ? "#ffffff" : "#111111"
            }}
        >


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="appointments-header">

                <h1>
                    📅 My Appointments
                </h1>

                <p>
                    Book your clinic appointment
                    quickly and easily.
                </p>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {successMessage && (

                <div
                    className="appointment-success"
                >
                    {successMessage}
                </div>

            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {errorMessage && (

                <div
                    className="appointment-error"
                >
                    {errorMessage}
                </div>

            )}


            {/* =================================================
                VALIDATION ERRORS
            ================================================= */}

            {Object.keys(errors).length > 0 && (

                <div
                    className="appointment-validation-errors"
                >

                    {Object.entries(
                        errors
                    ).map(
                        ([
                            field,
                            message
                        ]) => (

                            <p
                                key={field}
                            >

                                <strong>
                                    {field}:
                                </strong>{" "}

                                {message}

                            </p>

                        )
                    )}

                </div>

            )}


            {/* =================================================
                BOOKING CARD
            ================================================= */}

            <div
                className="appointment-card"
                style={{

                    backgroundColor:
                        darkMode
                            ? "#1e1e1e"
                            : "#ffffff"
                }}
            >


                {/* =================================================
                    BOOK APPOINTMENT
                ================================================= */}

                <div className="appointment-booking-section">

                    <div className="appointment-section-heading">

                        <h2>
                            📅 Book an Appointment
                        </h2>

                        <p>
                            Select a clinic, date,
                            reason and available time.
                        </p>

                    </div>


                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="appointment-form"
                    >


                        {/* =================================================
                            TOP SECTION
                        ================================================= */}

                        <div className="appointment-top-row">


                            {/* =================================================
                                CLINIC
                            ================================================= */}

                            <div
                                className="appointment-field clinic-field"
                            >

                                <label>
                                    Select Clinic
                                </label>


                                <select
                                    name="clinicId"
                                    value={
                                        appointment.clinicId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={
                                        inputStyle
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Clinic
                                    </option>


                                    {clinics.map(
                                        (clinic) => (

                                            <option
                                                key={
                                                    clinic.id
                                                }
                                                value={
                                                    clinic.id
                                                }
                                            >

                                                {
                                                    clinic.clinicName
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* =================================================
                                DATE
                            ================================================= */}

                            <div
                                className="appointment-field date-field"
                            >

                                <label>
                                    Select Appointment Date
                                </label>


                                <div
                                    className="calendar-wrapper"
                                    style={{

                                        backgroundColor:
                                            darkMode
                                                ? "#252525"
                                                : "#f8fbff",

                                        border:
                                            darkMode
                                                ? "1px solid #444"
                                                : "1px solid #e1e5ea"
                                    }}
                                >

                                    <DayPicker

                                        className="appointment-calendar"

                                        mode="single"


                                        selected={
                                            appointment.appointmentDate
                                                ? new Date(
                                                    `${appointment.appointmentDate}T00:00:00`
                                                )
                                                : undefined
                                        }


                                        onSelect={
                                            (date) => {

                                                if (!date) {
                                                    return;
                                                }


                                                const selectedDate =
                                                    formatLocalDate(
                                                        date
                                                    );


                                                handleDateChange(
                                                    selectedDate
                                                );
                                            }
                                        }


                                        onMonthChange={
                                            (month) => {

                                                if (
                                                    appointment.clinicId
                                                ) {

                                                    loadFullyBookedDates(
                                                        appointment.clinicId,
                                                        month
                                                    );
                                                }
                                            }
                                        }


                                        disabled={[

                                            {
                                                dayOfWeek: [
                                                    0,
                                                    6
                                                ]
                                            },

                                            {
                                                before:
                                                    new Date()
                                            },

                                            (date) =>
                                                fullyBookedDates.includes(
                                                    formatLocalDate(
                                                        date
                                                    )
                                                )
                                        ]}


                                        modifiers={{

                                            fullyBooked:
                                                (date) =>
                                                    fullyBookedDates.includes(
                                                        formatLocalDate(
                                                            date
                                                        )
                                                    )
                                        }}


                                        modifiersClassNames={{

                                            fullyBooked:
                                                "fully-booked-date"
                                        }}


                                        footer={

                                            loadingBookedDates

                                                ? "Checking availability..."

                                                : appointment.appointmentDate

                                                    ? `Selected: ${appointment.appointmentDate}`

                                                    : "Select an available weekday."
                                        }

                                    />

                                </div>

                            </div>


                            {/* =================================================
                                REASON
                            ================================================= */}

                            <div
                                className="appointment-field reason-field"
                            >

                                <label>
                                    Reason for Visit
                                </label>


                                <select
                                    name="reason"
                                    value={
                                        appointment.reason
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={
                                        inputStyle
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Reason for Visit
                                    </option>


                                    {appointmentReasons.map(
                                        (reason) => (

                                            <option
                                                key={
                                                    reason
                                                }
                                                value={
                                                    reason
                                                }
                                            >

                                                {reason}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>


                        {/* =================================================
                            TIME SECTION
                        ================================================= */}

                        {
                            appointment.appointmentDate &&
                            appointment.clinicId && (

                                <div
                                    className="appointment-time-section"
                                >

                                    <label>
                                        Select Appointment Time
                                    </label>


                                    {loadingTimes ? (

                                        <p
                                            className="loading-message"
                                        >
                                            Checking available times...
                                        </p>

                                    ) : (

                                        <div
                                            className="appointment-times-grid"
                                        >

                                            {appointmentTimes.map(
                                                (time) => {

                                                    const isBooked =
                                                        bookedTimes.includes(
                                                            time
                                                        );


                                                    const isSelected =
                                                        appointment.appointmentTime ===
                                                        time;


                                                    return (

                                                        <button
                                                            key={
                                                                time
                                                            }
                                                            type="button"
                                                            disabled={
                                                                isBooked
                                                            }
                                                            onClick={() =>
                                                                handleTimeSelect(
                                                                    time
                                                                )
                                                            }
                                                            className={`
appointment-time-button
${isSelected ? "selected" : ""}
${isBooked ? "booked" : ""}
`}
                                                        >

                                                            {time}


                                                            {isBooked && (

                                                                <span>
                                                                    Booked
                                                                </span>

                                                            )}

                                                        </button>

                                                    );
                                                }
                                            )}

                                        </div>

                                    )}

                                </div>

                            )
                        }


                        {/* =================================================
                            BOOK BUTTON
                        ================================================= */}

                        <div
                            className="appointment-submit-section"
                        >

                            <button
                                className="btn-primary appointment-submit-button"
                                type="submit"
                                disabled={
                                    !appointment.appointmentDate ||
                                    !appointment.appointmentTime ||
                                    !appointment.reason ||
                                    !appointment.clinicId
                                }
                            >

                                📅 Book Appointment

                            </button>

                        </div>


                    </form>


                    {/* =================================================
                        INFORMATION
                    ================================================= */}

                    <div
                        className="appointment-info"
                    >

                        ℹ️ Appointments are available
                        Monday–Friday, between 08:00
                        and 16:30.

                        <br />

                        Your appointment is automatically
                        confirmed when the selected
                        time slot is available.

                    </div>

                </div>


                {/* =================================================
                    MY CONFIRMED APPOINTMENTS
                ================================================= */}

                <div
                    className="my-appointments-section"
                >

                    <div
                        className="my-appointments-heading"
                    >

                        <div>

                            <h2>
                                📋 My Upcoming Appointments
                            </h2>

                            <p>
                                Your confirmed clinic bookings.
                            </p>

                        </div>


                        <span
                            className="appointment-count"
                        >
                            {confirmedAppointments.length}
                        </span>

                    </div>


                    {loadingAppointments ? (

                        <div
                            className="appointments-loading"
                        >

                            Loading your appointments...

                        </div>

                    ) : confirmedAppointments.length === 0 ? (

                        <div
                            className="no-appointments"
                        >

                            <div className="no-appointments-icon">
                                📅
                            </div>

                            <h3>
                                No upcoming appointments
                            </h3>

                            <p>
                                You don't have any
                                confirmed appointments yet.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="appointments-list"
                        >

                            {confirmedAppointments.map(
                                (item) => (

                                    <div
                                        className="appointment-booking-card"
                                        key={
                                            item.id
                                        }
                                        style={{

                                            backgroundColor:
                                                darkMode
                                                    ? "#252525"
                                                    : "#f8fbff",

                                            borderColor:
                                                darkMode
                                                    ? "#444"
                                                    : "#dce6ef"
                                        }}
                                    >


                                        {/* HEADER */}

                                        <div
                                            className="booking-card-header"
                                        >

                                            <div>

                                                <h3>
                                                    🏥 {
                                                        item.clinicName
                                                    }
                                                </h3>

                                                <span
                                                    className="booking-status confirmed"
                                                >
                                                    ✓ CONFIRMED
                                                </span>

                                            </div>


                                            <div
                                                className="booking-date-time"
                                            >

                                                <strong>
                                                    {formatDisplayDate(
                                                        item.appointmentDate
                                                    )}
                                                </strong>

                                                <span>
                                                    🕐 {
                                                        formatTime(
                                                            item.appointmentTime
                                                        )
                                                    }
                                                </span>

                                            </div>

                                        </div>


                                        {/* DETAILS */}

                                        <div
                                            className="booking-card-details"
                                        >

                                            <div>

                                                <span>
                                                    Reason
                                                </span>

                                                <strong>
                                                    {
                                                        item.reason
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Date
                                                </span>

                                                <strong>
                                                    {formatDisplayDate(
                                                        item.appointmentDate
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Time
                                                </span>

                                                <strong>
                                                    {
                                                        formatTime(
                                                            item.appointmentTime
                                                        )
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* CANCEL */}

                                        <div
                                            className="booking-card-actions"
                                        >

                                            <button
                                                type="button"
                                                className="cancel-appointment-button"
                                                disabled={
                                                    cancellingAppointmentId ===
                                                    item.id
                                                }
                                                onClick={() =>
                                                    handleCancelAppointment(
                                                        item.id
                                                    )
                                                }
                                            >

                                                {
                                                    cancellingAppointmentId ===
                                                    item.id

                                                        ? "Cancelling..."

                                                        : "✕ Cancel Appointment"
                                                }

                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>


                {/* =================================================
                    CANCELLED BOOKINGS
                ================================================= */}

                <div
                    className="cancelled-appointments-section"
                >

                    <div
                        className="cancelled-appointments-heading"
                    >

                        <div>

                            <h2>
                                🗂️ Cancelled Bookings
                            </h2>

                            <p>
                                Your previous cancelled appointments.
                            </p>

                        </div>


                        <span
                            className="appointment-count cancelled-count"
                        >
                            {
                                cancelledAppointments.length
                            }
                        </span>

                    </div>


                    {cancelledAppointments.length === 0 ? (

                        <div
                            className="no-cancelled-appointments"
                        >

                            <p>
                                No cancelled bookings.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="appointments-list"
                        >

                            {cancelledAppointments.map(
                                (item) => (

                                    <div
                                        className="appointment-booking-card cancelled"
                                        key={
                                            item.id
                                        }
                                        style={{

                                            backgroundColor:
                                                darkMode
                                                    ? "#242424"
                                                    : "#fafafa",

                                            borderColor:
                                                darkMode
                                                    ? "#444"
                                                    : "#dddddd"
                                        }}
                                    >


                                        {/* HEADER */}

                                        <div
                                            className="booking-card-header"
                                        >

                                            <div>

                                                <h3>
                                                    🏥 {
                                                        item.clinicName
                                                    }
                                                </h3>

                                                <span
                                                    className="booking-status cancelled-status"
                                                >
                                                    CANCELLED
                                                </span>

                                            </div>


                                            <div
                                                className="booking-date-time"
                                            >

                                                <strong>
                                                    {formatDisplayDate(
                                                        item.appointmentDate
                                                    )}
                                                </strong>

                                                <span>
                                                    🕐 {
                                                        formatTime(
                                                            item.appointmentTime
                                                        )
                                                    }
                                                </span>

                                            </div>

                                        </div>


                                        {/* DETAILS */}

                                        <div
                                            className="booking-card-details"
                                        >

                                            <div>

                                                <span>
                                                    Reason
                                                </span>

                                                <strong>
                                                    {
                                                        item.reason
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Date
                                                </span>

                                                <strong>
                                                    {formatDisplayDate(
                                                        item.appointmentDate
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Time
                                                </span>

                                                <strong>
                                                    {
                                                        formatTime(
                                                            item.appointmentTime
                                                        )
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        <div
                                            className="cancelled-booking-message"
                                        >

                                            This appointment was
                                            cancelled and the time
                                            slot is available for
                                            booking again.

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>


            </div>

        </div>
    );
}
