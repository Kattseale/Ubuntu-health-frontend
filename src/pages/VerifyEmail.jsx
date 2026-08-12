import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/authService";

export default function VerifyEmail() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("");

    useEffect(() => {

        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            setMessage("Verification token is missing.");
            return;
        }

        const verify = async () => {

            try {

                const response = await verifyEmail(token);

                setStatus("success");
                setMessage(
                    response?.message ||
                    "Your email has been verified successfully."
                );

            } catch (error) {

                console.error("Email verification error:", error);

                setStatus("error");

                setMessage(
                    error.response?.data?.message ||
                    "Email verification failed. The link may be invalid or expired."
                );
            }
        };

        verify();

    }, [searchParams]);

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    textAlign: "center",
                    padding: "40px",
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)"
                }}
            >

                {status === "verifying" && (
                    <>
                        <h1>📧</h1>
                        <h2>Verifying your email...</h2>

                        <p>
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1>✅</h1>

                        <h2>
                            Email Verified!
                        </h2>

                        <p>
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                marginTop: "20px",
                                padding: "12px 25px",
                                border: "none",
                                borderRadius: "8px",
                                backgroundColor: "#0d6efd",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Go to Login
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h1>❌</h1>

                        <h2>
                            Verification Failed
                        </h2>

                        <p>
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/register")}
                            style={{
                                marginTop: "20px",
                                padding: "12px 25px",
                                border: "none",
                                borderRadius: "8px",
                                backgroundColor: "#0d6efd",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Back to Registration
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}