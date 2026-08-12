import { useState } from "react";
import { Link } from "react-router-dom";
import { resendVerificationEmail } from "../services/authService";

export default function ResendVerification() {

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


            const response =
                await resendVerificationEmail(email);


            setMessage(
                response.message ||
                "A new verification email has been sent."
            );


            setEmail("");


        } catch (err) {

            console.error(
                "Resend verification error:",
                err
            );


            const backendMessage =
                err.response?.data?.message;


            setError(
                backendMessage ||
                "Unable to resend verification email. Please try again."
            );


        } finally {

            setLoading(false);
        }
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    padding: "30px",
                    borderRadius: "16px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.12)"
                }}
            >

                <h1>
                    Verify Your Email
                </h1>


                <p>
                    Didn't receive your verification email?
                    Enter your email address below and
                    we'll send you a new verification link.
                </p>


                {message && (
                    <div
                        style={{
                            padding: "12px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            background: "#d1fae5",
                            color: "#065f46"
                        }}
                    >
                        {message}
                    </div>
                )}


                {error && (
                    <div
                        style={{
                            padding: "12px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            background: "#fee2e2",
                            color: "#991b1b"
                        }}
                    >
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginTop: "8px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                boxSizing: "border-box"
                            }}
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "13px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: loading
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >
                        {loading
                            ? "Sending..."
                            : "Resend Verification Email"}
                    </button>

                </form>


                <div
                    style={{
                        marginTop: "20px",
                        textAlign: "center"
                    }}
                >

                    <Link to="/login">
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}