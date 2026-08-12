import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { login, saveUser } from "../services/authService";
import { validateLogin } from "../utils/validation";

import "../styles/login.css";

export default function Login() {

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    // ============================================================
    // FORM DATA
    // ============================================================

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ============================================================
    // STATE
    // ============================================================

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    // ============================================================
    // HANDLE INPUT CHANGE
    // ============================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        const updatedForm = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedForm);

        // Validate while typing
        const validationErrors =
            validateLogin(updatedForm);

        setErrors(validationErrors);

        // Clear general error
        setError("");
    };

    // ============================================================
    // LOGIN
    // ============================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // ========================================================
        // VALIDATE FORM
        // ========================================================

        const validationErrors =
            validateLogin(formData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // ========================================================
        // ADDITIONAL CHECKS
        // ========================================================

        if (!formData.email.trim()) {

            setError(
                "Please enter your email address."
            );

            return;
        }

        if (!formData.password) {

            setError(
                "Please enter your password."
            );

            return;
        }

        // ========================================================
        // START LOADING
        // ========================================================

        try {

            setLoading(true);

            // ====================================================
            // CALL BACKEND LOGIN API
            // ====================================================

            const response =
                await login(formData);

            console.log(
                "Login response:",
                response
            );

            // ====================================================
            // SAVE USER
            // ====================================================

            saveUser(response);

            // ====================================================
            // UPDATE AUTH CONTEXT
            // ====================================================

            loginUser(response);

            // ====================================================
            // GET ROLE
            // ====================================================

            const role =
                response?.role ||
                response?.data?.role;

            console.log(
                "LOGIN ROLE:",
                role
            );

            // ====================================================
            // NAVIGATE TO DASHBOARD
            // ====================================================

            if (
                role === "ADMIN" ||
                role === "PATIENT" ||
                role === "DOCTOR" ||
                role === "NURSE" ||
                role === "RECEPTIONIST"
            ) {

                navigate("/dashboard");

            } else {

                // Fallback
                navigate("/dashboard");
            }

        } catch (err) {

            // ====================================================
            // LOGIN ERROR
            // ====================================================

            console.error(
                "Login error:",
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Unable to login. Please check your email and password.";

            setError(message);

        } finally {

            setLoading(false);
        }
    };

    // ============================================================
    // PAGE
    // ============================================================

    return (

        <div className="login-page">

            <div className="login-card">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="login-header">

                    <h1>
                        Ubuntu Health
                    </h1>

                    <p>
                        Welcome Back
                    </p>

                </div>

                {/* ==================================================
                    BACK TO WELCOME
                ================================================== */}

                <Link
                    to="/"
                    className="back-to-welcome"
                >
                    ← Back to Welcome
                </Link>

                {/* ==================================================
                    ERROR MESSAGE
                ================================================== */}

                {error && (

                    <div className="login-error">
                        {error}
                    </div>

                )}

                {/* ==================================================
                    LOGIN FORM
                ================================================== */}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    {/* ==================================================
                        EMAIL
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            autoComplete="email"
                            required
                        />

                        <small
                            className={
                                errors.email
                                    ? "field-error"
                                    : "field-hint"
                            }
                        >
                            {errors.email ||
                                "Enter a valid email address (example@gmail.com)."}
                        </small>

                    </div>

                    {/* ==================================================
                        PASSWORD
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword
                                    ? "Hide"
                                    : "Show"}

                            </button>

                        </div>

                        <small
                            className={
                                errors.password
                                    ? "field-error"
                                    : "field-hint"
                            }
                        >
                            {errors.password ||
                                "Password must be at least 8 characters."}
                        </small>

                    </div>

                    {/* ==================================================
                        FORGOT PASSWORD
                    ================================================== */}

                    <div className="forgot-password-container">

                        <Link
                            to="/forgot-password"
                            className="forgot-password-link"
                        >
                            Forgot password?
                        </Link>

                    </div>

                    {/* ==================================================
                        LOGIN BUTTON
                    ================================================== */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div className="login-footer">

                    <p>

                        Don't have an account?{" "}

                        <Link to="/register">
                            Register
                        </Link>

                    </p>

                    {/* ==================================================
                        RESEND VERIFICATION
                    ================================================== */}

                    <p className="verification-text">

                        Didn't receive your verification email?{" "}

                        <Link to="/resend-verification">
                            Resend verification email
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}