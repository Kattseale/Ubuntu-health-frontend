import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await forgotPassword({
                email: email.trim(),
            });

            setMessage(
                response?.message ||
                "Password reset instructions have been sent."
            );

            setEmail("");

        } catch (err) {
            console.error("Forgot password error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to process your request. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* HEADER */}
                <div className="auth-header">

                    <h1>Ubuntu Health</h1>

                    <h2>Forgot Password</h2>

                    <p>
                        Reset your Ubuntu Health account password.
                    </p>

                </div>


                {/* BACK TO LOGIN */}
                <div className="auth-back">

                    <Link to="/login">
                        ← Back to Login
                    </Link>

                </div>


                {/* DESCRIPTION */}
                <div className="forgot-description">

                    <p>
                        Enter the email address associated with your
                        Ubuntu Health account and we'll help you reset
                        your password.
                    </p>

                </div>


                {/* SUCCESS MESSAGE */}
                {message && (
                    <div className="auth-success">
                        {message}
                    </div>
                )}


                {/* ERROR MESSAGE */}
                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {/* FORM */}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* EMAIL */}
                    <div className="form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            autoComplete="email"
                            required
                        />

                    </div>


                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Instructions"
                        }
                    </button>

                </form>


                {/* FOOTER */}
                <div className="auth-footer">

                    <p>
                        Remember your password?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}