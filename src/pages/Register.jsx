import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {

    const navigate = useNavigate();

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

            const response = await register(formData);

            alert(response.message);

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-container">

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <h2>Create Ubuntu Health Account</h2>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
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

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="NURSE">Nurse</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                    <option value="ADMIN">Administrator</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p style={{ marginTop: "20px" }}>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>

    );

}