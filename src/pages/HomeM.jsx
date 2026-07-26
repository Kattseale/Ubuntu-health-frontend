import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";

export default function HomeM() {
    return (
        <div>

            {/* TOP BAR */}

            <div
                className="page"
                style={{
                    background: "#084298",
                    color: "#fff",
                    padding: "10px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
            >
                <div
                    className="page"
                    style={{
                        display: "flex",
                        gap: "25px",
                        fontSize: "14px",
                        alignItems: "center"
                    }}
                >
                    <span>
                        <FaPhoneAlt /> +27 12 345 6789
                    </span>

                    <span>
                        <FaEnvelope /> info@ubuntuhealth.co.za
                    </span>
                </div>

                <div
                    className="page"
                    style={{
                        display: "flex",
                        gap: "18px"
                    }}
                >
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        style={socialIcon}
                    >
                        <FaFacebookF />
                    </a>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        style={socialIcon}
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        style={socialIcon}
                    >
                        <FaTwitter />
                    </a>
                </div>
            </div>

            {/* NAVBAR */}

            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 50px",
                    background: "#ffffff",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                }}
            >
                <h2
                    style={{
                        color: "#0d6efd",
                        margin: 0
                    }}
                >
                    Ubuntu Health
                </h2>

                <div
                    className="page"
                    style={{
                        display: "flex",
                        gap: "30px",
                        alignItems: "center"
                    }}
                >
                    <a href="#features" style={navLink}>
                        Features
                    </a>

                    <a href="#about" style={navLink}>
                        About
                    </a>

                    <Link
                        to="/login"
                        style={buttonPrimary}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        style={buttonSecondary}
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* HERO */}

            <section
                style={{
                    background: "#0d6efd",
                    color: "#fff",
                    padding: "90px 30px",
                    textAlign: "center"
                }}
            >
                <h1
                    style={{
                        fontSize: "52px",
                        marginBottom: "20px"
                    }}
                >
                    Ubuntu Health Management System
                </h1>

                <p
                    style={{
                        fontSize: "20px",
                        maxWidth: "750px",
                        margin: "auto",
                        lineHeight: "1.8"
                    }}
                >
                    A modern healthcare management platform designed to
                    improve patient care, appointments, medication tracking,
                    clinic management and communication between healthcare
                    professionals and patients.
                </p>

                <div
                    className="page"
                    style={{
                        marginTop: "40px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px"
                    }}
                >
                    <Link
                        to="/login"
                        style={buttonPrimary}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        style={buttonSecondary}
                    >
                        Register
                    </Link>
                </div>
            </section>

            {/* FEATURES */}

            <section
                id="features"
                style={{
                    padding: "70px 50px"
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "50px"
                    }}
                >
                    What Ubuntu Health Offers
                </h2>

                <div
                    className="page"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(260px,1fr))",
                        gap: "25px"
                    }}
                >
                    <FeatureCard
                        icon="🏥"
                        title="Clinic Management"
                        description="Manage clinics, departments and healthcare facilities."
                    />

                    <FeatureCard
                        icon="👨‍⚕️"
                        title="Patient Records"
                        description="Securely manage patient information and medical history."
                    />

                    <FeatureCard
                        icon="📅"
                        title="Appointments"
                        description="Book, manage and track appointments online."
                    />

                    <FeatureCard
                        icon="💊"
                        title="Medication"
                        description="Track medication availability and prescriptions."
                    />

                    <FeatureCard
                        icon="📢"
                        title="Announcements"
                        description="Receive clinic news and important health updates."
                    />

                    <FeatureCard
                        icon="❤️"
                        title="Healthcare"
                        description="Improve communication between patients and healthcare workers."
                    />
                </div>
            </section>

            {/* ABOUT */}

            <section
                id="about"
                style={{
                    background: "#f5f5f5",
                    padding: "70px 50px"
                }}
            >
                <h2>About Ubuntu Health</h2>

                <p
                    style={{
                        marginTop: "20px",
                        lineHeight: "1.8",
                        fontSize: "18px"
                    }}
                >
                    Ubuntu Health is a healthcare management platform built to
                    simplify healthcare services by providing a single system
                    for patients, doctors, nurses, receptionists and
                    administrators.
                </p>
            </section>

            {/* FOOTER */}

            <footer
                style={{
                    background: "#222",
                    color: "#fff",
                    padding: "30px",
                    textAlign: "center"
                }}
            >
                © {new Date().getFullYear()} Ubuntu Health Management System
            </footer>

        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div
            className="page"
            style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 5px 15px rgba(0,0,0,.1)"
            }}
        >
            <h1>{icon}</h1>

            <h3>{title}</h3>

            <p>{description}</p>
        </div>
    );
}

const navLink = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "600"
};

const socialIcon = {
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none"
};

const buttonPrimary = {
    background: "#fff",
    color: "#0d6efd",
    padding: "15px 35px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold"
};

const buttonSecondary = {
    background: "transparent",
    color: "#fff",
    border: "2px solid white",
    padding: "15px 35px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold"
};