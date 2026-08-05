import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";


export function Register() {


    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "PATIENT"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            console.log("Sending registration data:", formData);

            await register(formData);

            navigate("/login");


        } catch (error) {

            console.error("Registration error:", error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration failed.";

            alert(message);

        } finally {

            setLoading(false);

        }

    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg,#198754,#0d6efd)"
            }}
        >
            <div
                style={{
                    background: "#fff",
                    width: "500px",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 15px 40px rgba(0,0,0,.2)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        color: "#198754"
                    }}
                >
                    Create Account
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "30px"
                    }}
                >
                    Join Ubuntu Health today.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="PATIENT">Patient</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    {/* Keep ALL your existing inputs here */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            background: "#0d6efd",
                            color: "white",
                            border: "none",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            height: "48px",
                            minWidth: "70px"
                        }}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        style={buttonStyle}
                    >
                        {loading ? "Signing In..." : "register"}
                    </button>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "20px"
                        }}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: "#0d6efd",
                                fontWeight: "bold"
                            }}
                        >
                            Login
                        </Link>
                    </p>

                </form>

            </div>
        </div>
    );
}
const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box"
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "#198754",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
};