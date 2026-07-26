import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login, saveUser } from "../services/authService";

export default function Login() {

    const navigate = useNavigate();

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

            saveUser(response);

            alert(response.message);

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

        <div className="login-container">

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <h2>Ubuntu Health Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Login"}
                </button>

                <p>

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </form>

        </div>

    );

}