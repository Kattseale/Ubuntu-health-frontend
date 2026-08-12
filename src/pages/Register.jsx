import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authService";
import { validateRegisterForm } from "../utils/validation";
import "../styles/register.css";

export function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");

    const [registered, setRegistered] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");

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
    const [error, setError] = useState("");

    // ============================================================
    // HANDLE INPUT
    // ============================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedForm = {
            ...formData,
            [name]: value
        };

        setFormData(updatedForm);

        // Validate while typing
        const validationErrors =
            validateRegisterForm(updatedForm);

        setErrors(validationErrors);

        // Clear general backend error
        setError("");
    };

    // ============================================================
    // PASSWORD VALIDATION
    // ============================================================

    const password = formData.password;

    const passwordRequirements = {
        length:
            password.length >= 8 &&
            password.length <= 50,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /\d/.test(password),

        special:
            /[@$!%*?&]/.test(password)
    };

    const passwordsMatch =
        password !== "" &&
        password === confirmPassword;

    const passwordValid =
        passwordRequirements.length &&
        passwordRequirements.uppercase &&
        passwordRequirements.lowercase &&
        passwordRequirements.number &&
        passwordRequirements.special;

    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // ========================================================
        // FRONTEND VALIDATION
        // ========================================================

        const validationErrors =
            validateRegisterForm(formData);

        // Confirm password validation
        if (!confirmPassword) {
            validationErrors.confirmPassword =
                "Please confirm your password.";
        } else if (!passwordsMatch) {
            validationErrors.confirmPassword =
                "Passwords do not match.";
        }

        // Password validation
        if (!passwordValid) {
            validationErrors.password =
                validationErrors.password ||
                "Please make sure your password meets all the requirements.";
        }

        // Stop submission if validation failed
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            // ====================================================
            // REGISTER USER
            // ====================================================

            await register(formData);

            // ====================================================
            // REGISTRATION SUCCESS
            // ====================================================

            setRegisteredEmail(formData.email);

            setRegistered(true);

        } catch (error) {

            console.error(
                "FULL REGISTRATION ERROR:",
                error
            );

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "RESPONSE DATA:",
                error.response?.data
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.response?.data?.errors ||
                "Registration failed. Please try again.";

            setError(
                typeof message === "string"
                    ? message
                    : JSON.stringify(message)
            );

        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // REGISTRATION SUCCESS / EMAIL VERIFICATION
    // ============================================================

    if (registered) {
        return (
            <div className="register-page">

                <div className="verification-card">

                    <div className="verification-icon">
                        📧
                    </div>

                    <h1>
                        Check Your Email
                    </h1>

                    <p>
                        Your Ubuntu Health account has
                        been created successfully.
                    </p>

                    <p>
                        We've sent a verification link to:
                    </p>

                    <strong className="registered-email">
                        {registeredEmail}
                    </strong>

                    <p className="verification-instruction">
                        Please open the email and click the
                        verification link to activate your account.
                    </p>

                    <p className="spam-message">
                        Don't see the email? Check your spam
                        or junk folder.
                    </p>

                    <Link
                        to="/login"
                        className="verification-login-button"
                    >
                        Go to Login
                    </Link>

                </div>

            </div>
        );
    }

    // ============================================================
    // REGISTER PAGE
    // ============================================================

    return (
        <div className="register-page">

            <div className="register-card">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="register-header">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Join Ubuntu Health today.
                    </p>

                </div>

                {/* ==================================================
                    BACK TO WELCOME
                ================================================== */}

                <Link
                    to="/"
                    className="back-to-welcome"
                >
                    ← Back to Welcome
                </Link>

                {/* ==================================================
                    GENERAL ERROR
                ================================================== */}

                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}

                {/* ==================================================
                    REGISTRATION FORM
                ================================================== */}

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    {/* ==================================================
                        FIRST NAME
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="firstName">
                            First Name
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoComplete="given-name"
                            required
                        />

                        {errors.firstName && (
                            <small className="field-error">
                                {errors.firstName}
                            </small>
                        )}

                    </div>

                    {/* ==================================================
                        LAST NAME
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="lastName">
                            Last Name
                        </label>

                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            autoComplete="family-name"
                            required
                        />

                        {errors.lastName && (
                            <small className="field-error">
                                {errors.lastName}
                            </small>
                        )}

                    </div>

                    {/* ==================================================
                        EMAIL
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                        {errors.email && (
                            <small className="field-error">
                                {errors.email}
                            </small>
                        )}

                    </div>

                    {/* ==================================================
                        PHONE
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="phoneNumber">
                            Phone Number
                        </label>

                        <input
                            id="phoneNumber"
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            autoComplete="tel"
                            required
                        />

                        {errors.phoneNumber && (
                            <small className="field-error">
                                {errors.phoneNumber}
                            </small>
                        )}

                    </div>

                    {/* ==================================================
                        ROLE
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="role">
                            Account Type
                        </label>

                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="PATIENT">
                                Patient
                            </option>

                            <option value="ADMIN">
                                Administrator
                            </option>
                        </select>

                        {errors.role && (
                            <small className="field-error">
                                {errors.role}
                            </small>
                        )}

                    </div>

                    {/* ==================================================
                        PASSWORD
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>

                    {/* ==================================================
                        PASSWORD REQUIREMENTS
                    ================================================== */}

                    {password && (
                        <div className="password-requirements">

                            <div
                                className={
                                    passwordRequirements.length
                                        ? "requirement valid"
                                        : "requirement invalid"
                                }
                            >
                                {passwordRequirements.length
                                    ? "✓"
                                    : "○"}{" "}
                                8–50 characters
                            </div>

                            <div
                                className={
                                    passwordRequirements.uppercase
                                        ? "requirement valid"
                                        : "requirement invalid"
                                }
                            >
                                {passwordRequirements.uppercase
                                    ? "✓"
                                    : "○"}{" "}
                                One uppercase letter
                            </div>

                            <div
                                className={
                                    passwordRequirements.lowercase
                                        ? "requirement valid"
                                        : "requirement invalid"
                                }
                            >
                                {passwordRequirements.lowercase
                                    ? "✓"
                                    : "○"}{" "}
                                One lowercase letter
                            </div>

                            <div
                                className={
                                    passwordRequirements.number
                                        ? "requirement valid"
                                        : "requirement invalid"
                                }
                            >
                                {passwordRequirements.number
                                    ? "✓"
                                    : "○"}{" "}
                                One number
                            </div>

                            <div
                                className={
                                    passwordRequirements.special
                                        ? "requirement valid"
                                        : "requirement invalid"
                                }
                            >
                                {passwordRequirements.special
                                    ? "✓"
                                    : "○"}{" "}
                                One special character
                            </div>

                        </div>
                    )}

                    {errors.password && (
                        <small className="field-error">
                            {errors.password}
                        </small>
                    )}

                    {/* ==================================================
                        CONFIRM PASSWORD
                    ================================================== */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(
                                        e.target.value
                                    );
                                    setError("");
                                }}
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showConfirmPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>

                    {/* ==================================================
                        PASSWORD MATCH
                    ================================================== */}

                    {confirmPassword && (
                        <p
                            className={
                                passwordsMatch
                                    ? "password-match valid"
                                    : "password-match invalid"
                            }
                        >
                            {passwordsMatch
                                ? "✓ Passwords match"
                                : "✗ Passwords do not match"}
                        </p>
                    )}

                    {errors.confirmPassword && (
                        <small className="field-error">
                            {errors.confirmPassword}
                        </small>
                    )}

                    {/* ==================================================
                        CREATE ACCOUNT
                    ================================================== */}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                {/* ==================================================
                    LOGIN
                ================================================== */}

                <div className="register-footer">

                    <p>
                        Already have an account?{" "}

                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}