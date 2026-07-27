export const validateRegisterForm = (formData) => {

    const errors = {};

    // First Name
    if (!formData.firstName.trim()) {
        errors.firstName = "First name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
        errors.firstName = "First name can only contain letters.";
    }

    // Last Name
    if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.lastName)) {
        errors.lastName = "Last name can only contain letters.";
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email address.";
    }

    // Phone
    if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Phone number must contain 10–15 digits.";
    }

    // Password
    if (!formData.password) {

        errors.password = "Password is required.";

    } else if (formData.password.length < 8) {

        errors.password = "Password must be at least 8 characters.";

    } else {

        if (!/[A-Z]/.test(formData.password))
            errors.password =
                "Password must contain at least one uppercase letter.";

        else if (!/[a-z]/.test(formData.password))
            errors.password =
                "Password must contain at least one lowercase letter.";

        else if (!/[0-9]/.test(formData.password))
            errors.password =
                "Password must contain at least one number.";

        else if (!/[@$!%*?&]/.test(formData.password))
            errors.password =
                "Password must contain at least one special character (@$!%*?&).";
    }

    return errors;
};


// ============================
// LOGIN VALIDATION
// ============================

export const validateLogin = (formData) => {

    const errors = {};

    // Email
    if (!formData.email.trim()) {

        errors.email = "Email is required.";

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {

        errors.email = "Enter a valid email address.";

    }

    // Password
    if (!formData.password) {

        errors.password = "Password is required.";

    } else {

        if (formData.password.length < 8) {

            errors.password =
                "Password must be at least 8 characters.";

        } else if (!/[A-Z]/.test(formData.password)) {

            errors.password =
                "Password must contain an uppercase letter.";

        } else if (!/[a-z]/.test(formData.password)) {

            errors.password =
                "Password must contain a lowercase letter.";

        } else if (!/[0-9]/.test(formData.password)) {

            errors.password =
                "Password must contain a number.";

        } else if (!/[@$!%*?&]/.test(formData.password)) {

            errors.password =
                "Password must contain a special character (@$!%*?&).";

        }

    }

    return errors;
};