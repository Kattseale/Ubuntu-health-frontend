import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import "../styles/reset-password.css";

export default function ResetPassword() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ============================================================
    // PASSWORD VALIDATION
    // ============================================================

    const validatePassword = (password) => {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;

        return passwordRegex.test(password);
    };


    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        // ========================================================
        // CHECK TOKEN
        // ========================================================

        if (!token) {

            setError(
                "This password reset link is invalid or missing."
            );

            return;
        }


        // ========================================================
        // CHECK PASSWORD
        // ========================================================

        if (!validatePassword(newPassword)) {

            setError(
                "Password must be 8-50 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
            );

            return;
        }


        // ========================================================
        // CHECK CONFIRM PASSWORD
        // ========================================================

        if (newPassword !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        // ========================================================
        // SUBMIT
        // ========================================================

        try {

            setLoading(true);

            await resetPassword(
                token,
                newPassword
            );


            // ====================================================
            // SUCCESS
            // ====================================================

            setSuccess(
                "Your password has been reset successfully. You can now log in with your new password."
            );

            setNewPassword("");
            setConfirmPassword("");


            // ====================================================
            // REDIRECT AFTER 3 SECONDS
            // ====================================================

            setTimeout(() => {

                navigate("/login");

            }, 3000);


        } catch (err) {

            console.error(
                "Reset password error:",
                err
            );


            // ====================================================
            // BACKEND ERROR
            // ====================================================

            const backendMessage =
                err?.response?.data?.message;


            setError(
                backendMessage ||
                "Unable to reset your password. The reset link may have expired or is invalid."
            );

        } finally {

            setLoading(false);
        }
    };


    // ============================================================
    // NO TOKEN
    // ============================================================

    if (!token) {

        return (
            <div className="reset-password-page">

                <div className="reset-password-card">

                    <div className="reset-password-icon">
                        🔒
                    </div>

                    <h1>
                        Invalid Reset Link
                    </h1>

                    <p className="reset-password-description">
                        This password reset link is missing or invalid.
                        Please request a new password reset link.
                    </p>

                    <button
                        type="button"
                        className="reset-password-button"
                        onClick={() =>
                            navigate("/forgot-password")
                        }
                    >
                        Request New Link
                    </button>

                </div>

            </div>
        );
    }


    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="reset-password-page">

            <div className="reset-password-card">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="reset-password-icon">
                    🔐
                </div>

                <h1>
                    Reset Your Password
                </h1>

                <p className="reset-password-description">
                    Create a new password for your Ubuntu Health account.
                </p>


                {/* ==================================================
                    ERROR
                ================================================== */}

                {error && (

                    <div className="reset-password-message error">
                        {error}
                    </div>

                )}


                {/* ==================================================
                    SUCCESS
                ================================================== */}

                {success && (

                    <div className="reset-password-message success">
                        {success}
                    </div>

                )}


                {/* ==================================================
                    FORM
                ================================================== */}

                {!success && (

                    <form
                        onSubmit={handleSubmit}
                        className="reset-password-form"
                    >

                        {/* ==================================================
                            NEW PASSWORD
                        ================================================== */}

                        <div className="reset-password-field">

                            <label htmlFor="newPassword">
                                New Password
                            </label>

                            <div className="password-input-wrapper">

                                <input
                                    id="newPassword"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your new password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>

                        </div>


                        {/* ==================================================
                            PASSWORD REQUIREMENTS
                        ================================================== */}

                        <div className="password-requirements">

                            <strong>
                                Password must contain:
                            </strong>

                            <ul>

                                <li>
                                    8-50 characters
                                </li>

                                <li>
                                    At least one uppercase letter
                                </li>

                                <li>
                                    At least one lowercase letter
                                </li>

                                <li>
                                    At least one number
                                </li>

                                <li>
                                    At least one special character
                                    (@ $ ! % * ? &)
                                </li>

                            </ul>

                        </div>


                        {/* ==================================================
                            CONFIRM PASSWORD
                        ================================================== */}

                        <div className="reset-password-field">

                            <label htmlFor="confirmPassword">
                                Confirm New Password
                            </label>

                            <div className="password-input-wrapper">

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Confirm your new password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>

                        </div>


                        {/* ==================================================
                            SUBMIT
                        ================================================== */}

                        <button
                            type="submit"
                            className="reset-password-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Resetting Password..."
                                : "Reset Password"}

                        </button>


                        {/* ==================================================
                            BACK TO LOGIN
                        ================================================== */}

                        <button
                            type="button"
                            className="back-to-login-button"
                            onClick={() =>
                                navigate("/login")
                            }
                            disabled={loading}
                        >
                            Back to Login
                        </button>

                    </form>

                )}

            </div>

        </div>
    );
}