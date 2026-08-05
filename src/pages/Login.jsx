import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { login, saveUser } from "../services/authService";
import { useState } from "react";
export default function Login() {

    const navigate = useNavigate();

    const { loginUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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


            const response = await login(formData);


            console.log("Login response:", response);


            saveUser(response);


            loginUser(response);


            navigate("/home");


        } catch(error) {


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
                        marginBottom: "35px"
                    }}
                >
                    Welcome Back
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "18px"
                        }}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                ...inputStyle,
                                marginBottom: 0,
                                flex: 1
                            }}
                        />

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
                    </div>

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
                                fontWeight: "bold"
                            }}
                        >
                            Register
                        </Link>
                    </p>
                    <button
                        type="submit"
                        disabled={loading}
                        style={buttonStyle}
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

            </div>
        </div>
    );}
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
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
};