import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { validateRegisterForm } from "../utils/validation";


export function Register() {


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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        const validationErrors = validateRegisterForm({
            ...formData,
            [name]: value
        });

        setErrors(validationErrors);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateRegisterForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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
                    width: "520px",
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

                <form onSubmit={handleSubmit} noValidate>

                    {/* FIRST NAME */}

                    {/* FIRST NAME */}

<input
    type="text"
    name="firstName"
    placeholder="First Name"
    value={formData.firstName}
    onChange={handleChange}
    style={inputStyle}
/>

<div
    style={{
        background: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "15px",
        fontSize: "13px"
    }}
>

    <strong>First Name Requirements</strong>

    <ul
        style={{
            marginTop: "8px",
            paddingLeft: "18px",
            lineHeight: "22px"
        }}
    >

        <li
            style={{
                color: /^[A-Za-z ]*$/.test(formData.firstName)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ Only letters and spaces
        </li>

        <li
            style={{
                color:
                    formData.firstName.length >= 2 &&
                    formData.firstName.length <= 50
                        ? "green"
                        : "#555"
            }}
        >
            ✔ Between 2 and 50 characters
        </li>

    </ul>

</div>

{errors.firstName && (
    <small style={errorStyle}>
        {errors.firstName}
    </small>
)}
                    {/* LAST NAME */}

<input
    type="text"
    name="lastName"
    placeholder="Last Name"
    value={formData.lastName}
    onChange={handleChange}
    style={inputStyle}
/>

<div
    style={{
        background: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "15px",
        fontSize: "13px"
    }}
>

    <strong>Last Name Requirements</strong>

    <ul
        style={{
            marginTop: "8px",
            paddingLeft: "18px",
            lineHeight: "22px"
        }}
    >

        <li
            style={{
                color: /^[A-Za-z ]*$/.test(formData.lastName)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ Only letters and spaces
        </li>

        <li
            style={{
                color:
                    formData.lastName.length >= 2 &&
                    formData.lastName.length <= 50
                        ? "green"
                        : "#555"
            }}
        >
            ✔ Between 2 and 50 characters
        </li>

    </ul>

</div>

{errors.lastName && (
    <small style={errorStyle}>
        {errors.lastName}
    </small>
)}

                    {/* EMAIL */}

<input
    type="email"
    name="email"
    placeholder="Email Address"
    value={formData.email}
    onChange={handleChange}
    style={inputStyle}
/>

<div
    style={{
        background: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "15px",
        fontSize: "13px"
    }}
>

    <strong>Email Requirements</strong>

    <ul
        style={{
            marginTop: "8px",
            paddingLeft: "18px",
            lineHeight: "22px"
        }}
    >

        <li
            style={{
                color:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? "green"
                        : "#555"
            }}
        >
            ✔ Must be a valid email address
        </li>

        <li
            style={{
                color:
                    formData.email.length <= 100
                        ? "green"
                        : "#555"
            }}
        >
            ✔ Maximum 100 characters
        </li>

        <li style={{ color: "#555" }}>
            ✔ Example: john@gmail.com
        </li>

    </ul>

</div>

{errors.email && (
    <small style={errorStyle}>
        {errors.email}
    </small>
)}

                    {/* PHONE */}

<input
    type="text"
    name="phoneNumber"
    placeholder="Phone Number"
    value={formData.phoneNumber}
    onChange={handleChange}
    style={inputStyle}
/>

<div
    style={{
        background: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "15px",
        fontSize: "13px"
    }}
>

    <strong>Phone Number Requirements</strong>

    <ul
        style={{
            marginTop: "8px",
            paddingLeft: "18px",
            lineHeight: "22px"
        }}
    >

        <li
            style={{
                color: /^\+?[0-9]*$/.test(formData.phoneNumber)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ Only digits (optional + at the beginning)
        </li>

        <li
            style={{
                color:
                    formData.phoneNumber.length >= 10 &&
                    formData.phoneNumber.length <= 15
                        ? "green"
                        : "#555"
            }}
        >
            ✔ Between 10 and 15 digits
        </li>

        <li style={{ color: "#555" }}>
            ✔ Example: 0712345678
        </li>

    </ul>

</div>

{errors.phoneNumber && (
    <small style={errorStyle}>
        {errors.phoneNumber}
    </small>
)}

                    {/* PASSWORD */}

                    <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    style={inputStyle}
/>

<div
    style={{
        background: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "15px",
        fontSize: "13px"
    }}
>
    <strong>Password Requirements</strong>

    <ul
        style={{
            marginTop: "8px",
            paddingLeft: "18px",
            lineHeight: "22px"
        }}
    >
        <li
            style={{
                color: /[A-Z]/.test(formData.password)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ At least one uppercase letter
        </li>

        <li
            style={{
                color: /[a-z]/.test(formData.password)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ At least one lowercase letter
        </li>

        <li
            style={{
                color: /\d/.test(formData.password)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ At least one number
        </li>

        <li
            style={{
                color: /[@$!%*?&]/.test(formData.password)
                    ? "green"
                    : "#555"
            }}
        >
            ✔ At least one special character (@$!%*?&)
        </li>

        <li
            style={{
                color:
                    formData.password.length >= 8 &&
                    formData.password.length <= 50
                        ? "green"
                        : "#555"
            }}
        >
            ✔ 8–50 characters
        </li>
    </ul>
</div>

{errors.password && (
    <small style={errorStyle}>
        {errors.password}
    </small>
)}

                    {/* ROLE */}

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="PATIENT">Patient</option>
                        <option value="DOCTOR">Doctor</option>
                        <option value="ADMIN">Administrator</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
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
                                fontWeight: "bold",
                                textDecoration: "none"
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
    marginBottom: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box"
};

const hintStyle = {
    display: "block",
    color: "#6c757d",
    marginBottom: "15px",
    fontSize: "13px"
};

const errorStyle = {
    display: "block",
    color: "#dc3545",
    marginBottom: "15px",
    fontSize: "13px",
    fontWeight: "600"
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold"
};