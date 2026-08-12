import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/login.css";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ============================================================
    // HANDLE INPUT
    // ============================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };


    // ============================================================
    // LOGIN
    // ============================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.email.trim()) {

            setError("Please enter your email address.");
            return;
        }

        if (!formData.password) {

            setError("Please enter your password.");
            return;
        }

        try {

            setLoading(true);

            const response = await login(formData);

            console.log("Login successful:", response);

            // ====================================================
            // ROLE
            // ====================================================

            const role =
                response?.role ||
                response?.data?.role;

            console.log("LOGIN ROLE:", role);

            // ====================================================
            // DASHBOARD
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

                navigate("/dashboard");

            }

        } catch (err) {

            console.error("Login error:", err);

            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
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
                    ERROR
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