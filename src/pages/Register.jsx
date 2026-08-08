import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";


export function Register() {


    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

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
    const password = formData.password;

    const passwordRequirements = {
        length: password.length >= 8 && password.length <= 50,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
    };

    const passwordsMatch =
        password !== "" &&
        password === confirmPassword;

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!passwordsMatch) {
            alert("Passwords do not match.");
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
                className="register-card"
                style={{
                    background: "#fff",
                    width: "500px",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 15px 40px rgba(0,0,0,.2)",
                    boxSizing: "border-box"
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

                <Link
                    to="/"
                    style={{
                        display: "block",
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "#0d6efd",
                        fontWeight: "bold",
                        textDecoration: "none"
                    }}
                >
                    ← Back to Welcome
                </Link>

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

                    {/* PASSWORD */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            marginBottom: "18px"
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
                                flex: 1,
                                marginBottom: 0
                            }}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                background: "#0d6efd",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "12px 14px",
                                height: "48px",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "600"
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* PASSWORD REQUIREMENTS */}

                    <div
                        style={{
                            fontSize: "13px",
                            marginTop: "-8px",
                            marginBottom: "18px",
                            lineHeight: "1.7"
                        }}
                    >
                        <div
                            style={{
                                color: passwordRequirements.length ? "#198754" : "#666"
                            }}
                        >
                            {passwordRequirements.length ? "✓" : "○"} 8–50 characters
                        </div>

                        <div
                            style={{
                                color: passwordRequirements.uppercase ? "#198754" : "#666"
                            }}
                        >
                            {passwordRequirements.uppercase ? "✓" : "○"} At least one uppercase letter (A–Z)
                        </div>

                        <div
                            style={{
                                color: passwordRequirements.lowercase ? "#198754" : "#666"
                            }}
                        >
                            {passwordRequirements.lowercase ? "✓" : "○"} At least one lowercase letter (a–z)
                        </div>

                        <div
                            style={{
                                color: passwordRequirements.number ? "#198754" : "#666"
                            }}
                        >
                            {passwordRequirements.number ? "✓" : "○"} At least one number (0–9)
                        </div>

                        <div
                            style={{
                                color: passwordRequirements.special ? "#198754" : "#666"
                            }}
                        >
                            {passwordRequirements.special ? "✓" : "○"} At least one special character (@ $ ! % * ? &)
                        </div>
                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            marginBottom: "18px"
                        }}
                    >
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                ...inputStyle,
                                flex: 1,
                                marginBottom: 0,
                                border:
                                    confirmPassword === ""
                                        ? "1px solid #ccc"
                                        : passwordsMatch
                                            ? "2px solid #198754"
                                            : "2px solid #dc3545"
                            }}
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={{
                                background: "#0d6efd",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "12px 14px",
                                height: "48px",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "600"
                            }}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* MATCH MESSAGE */}

                    {confirmPassword !== "" && (
                        <p
                            style={{
                                marginTop: "-10px",
                                marginBottom: "18px",
                                fontSize: "13px",
                                color: passwordsMatch ? "#198754" : "#dc3545"
                            }}
                        >
                            {passwordsMatch
                                ? "✓ Passwords match"
                                : "✗ Passwords do not match"}
                        </p>
                    )}

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
                        type="submit"
                        disabled={loading}
                        style={buttonStyle}
                    >
                        {loading ? "Registering..." : "Register"}
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