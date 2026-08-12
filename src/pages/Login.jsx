import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { login, saveUser } from "../services/authService";
import { validateLogin } from "../utils/validation";

export default function Login() {

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        const updatedForm = {
            ...formData,
            [name]: value
        };

        setFormData(updatedForm);

        const validationErrors = validateLogin(updatedForm);
        setErrors(validationErrors);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateLogin(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            setLoading(true);

            const response = await login(formData);

            console.log("Login response:", response);

            saveUser(response);

            loginUser(response);

            navigate("/home");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Invalid email or password."
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
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg,#0d6efd,#198754)"
            }}
        >

            <div
                style={{
                    background: "#fff",
                    width: "420px",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 15px 40px rgba(0,0,0,.2)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        color: "#0d6efd",
                        marginBottom: "5px"
                    }}
                >
                    Ubuntu Health
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "30px"
                    }}
                >
                    Welcome Back
                </p>

                <form onSubmit={handleSubmit} noValidate>

                    {/* EMAIL */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <small
                        style={{
                            ...hintStyle,
                            color: errors.email ? "#dc3545" : "#666"
                        }}
                    >
                        {errors.email ||
                            "Enter a valid email address (example@gmail.com)."}
                    </small>

                    {/* PASSWORD */}

                    <div
                        style={{
                            position: "relative",
                            marginTop: "10px"
                        }}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                marginTop: 0,
                                paddingRight: "80px"
                            }}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "45%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "transparent",
                                color: "#0d6efd",
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <small
                        style={{
                            ...hintStyle,
                            color: errors.password ? "#dc3545" : "#666"
                        }}
                    >
                        {errors.password ||
                            "Password must be at least 8 characters."}
                    </small>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "25px"
                        }}
                    >
                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            style={{
                                color: "#0d6efd",
                                fontWeight: "bold",
                                textDecoration: "none"
                            }}
                        >
                            Register
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
    marginTop: "10px",
    marginBottom: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box"
};

const hintStyle = {
    display: "block",
    marginBottom: "15px",
    fontSize: "13px",
    fontWeight: "500"
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
};