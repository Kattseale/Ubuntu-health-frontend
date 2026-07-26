import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

export default function HomeM() {
    return (
        <div>

            {/* NAVBAR */}

            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "30px 60px",
                    background: "#fff",
                    borderBottom: "1px solid #e5e7eb",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background: "hotpink",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "24px"
                        }}
                    >
                        <FaHeartbeat />
                    </div>

                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "#0d6efd",
                                fontWeight: "700"
                            }}
                        >
                            Ubuntu-Health Clinic System
                        </h2>

                        <small
                            style={{
                                color: "#666",
                                fontWeight: "500"
                            }}
                        >
                            Healthcare made simple
                        </small>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "30px"
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
                        style={{
                            ...navLink,
                            color: "#0d6efd",
                            fontWeight: "600"
                        }}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        style={{
                            background: "#0d6efd",
                            color: "#fff",
                            padding: "12px 25px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* HERO */}

            {/* CALL TO ACTION */}

            <section
                style={{
                    background: "#0d6efd",
                    color: "#fff",
                    textAlign: "center",
                    padding: "80px 30px"
                }}
            >
                <h1
                    style={{
                        fontSize: "58px",
                        margin: "20px 0",
                        lineHeight: "1.2",
                        color: "#1f2937"
                    }}
                >
                    Skip the Queue.
                    <br />
                    Get Better Healthcare.
                </h1>

                <p
                    style={{
                        maxWidth: "700px",
                        margin: "0 auto",
                        fontSize: "20px",
                        lineHeight: "1.8"
                    }}
                >
                    Ubuntu Health System helps patients avoid long clinic queues by
                    making it easy to book appointments online, receive clinic updates,
                    manage medications and access healthcare services—all from one
                    secure platform.
                </p>

                <div
                    style={{
                        marginTop: "40px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        flexWrap: "wrap"
                    }}
                >
                    <Link
                        to="/register"
                        style={{
                            background: "#fff",
                            color: "#0d6efd",
                            padding: "15px 35px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Register Now
                    </Link>

                    <Link
                        to="/login"
                        style={{
                            border: "2px solid white",
                            color: "#fff",
                            padding: "15px 35px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </Link>
                </div>
            </section>

            <section
                style={{
                    background: "#987704",
                    color: "white",
                    textAlign: "center",
                    padding: "18px"
                }}
            >
                <strong>
                    Book First. Queue Less. Receive Better Healthcare.
                </strong>
            </section>

            {/* STATISTICS */}

            <section
                style={{
                    padding: "70px 40px",
                    background: "#ffffff"
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "25px",
                        maxWidth: "1200px",
                        margin: "0 auto"
                    }}
                >

                    <StatCard
                        icon="🏥"
                        number="35+"
                        title="Clinics"
                    />

                    <StatCard
                        icon="👨‍⚕️"
                        number="120+"
                        title="Healthcare Staff"
                    />

                    <StatCard
                        icon="👥"
                        number="15 000+"
                        title="Patients"
                    />

                    <StatCard
                        icon="📅"
                        number="50 000+"
                        title="Appointments"
                    />

                </div>
            </section>

            {/* FEATURES */}

            <section
                id="features"
                style={{
                    background: "#f8fbff",
                    padding: "80px 40px"
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        fontSize: "38px",
                        marginBottom: "15px",
                        color: "#0d6efd"
                    }}
                >
                    Caring for you
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        maxWidth: "700px",
                        margin: "0 auto 60px"
                    }}
                >
                    Ubuntu-Health Clinic System brings patients and healthcare providers
                    together through one secure and easy-to-use platform.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                        gap: "30px",
                        maxWidth: "1200px",
                        margin: "0 auto"
                    }}
                >
                    <FeatureCard
                        icon="📅"
                        title="Book Appointments"
                        description="Schedule and manage appointments with your preferred clinic."
                    />

                    <FeatureCard
                        icon="💊"
                        title="Medication Management"
                        description="Access prescriptions and medication information securely."
                    />

                    <FeatureCard
                        icon="📢"
                        title="Clinic Announcements"
                        description="Receive important updates and healthcare notifications instantly."
                    />

                    <FeatureCard
                        icon="👥"
                        title="Community Support"
                        description="Connect with other patients and share healthcare experiences."
                    />
                </div>
            </section>

            {/* ABOUT */}

            <section
                id="about"
                style={{
                    padding: "90px 60px",
                    background: "#ffffff"
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        gap: "70px",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}
                >
                    {/* LEFT */}

                    <div
                        style={{
                            flex: 1,
                            minWidth: "320px"
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=700"
                            alt="Doctor"
                            style={{
                                width: "100%",
                                borderRadius: "20px",
                                boxShadow: "0 20px 50px rgba(0,0,0,.12)"
                            }}
                        />
                    </div>

                    {/* RIGHT */}

                    <div
                        style={{
                            flex: 1,
                            minWidth: "320px"
                        }}
                    >
            <span
                style={{
                    color: "#0d6efd",
                    fontWeight: "bold"
                }}
            >
                ABOUT US
            </span>

                        <h2
                            style={{
                                fontSize: "42px",
                                margin: "15px 0"
                            }}
                        >
                            Caring for patients through technology.
                        </h2>

                        <p
                            style={{
                                color: "#666",
                                lineHeight: "1.9",
                                fontSize: "18px"
                            }}
                        >
                            Ubuntu-Health Clinic System is a digital healthcare platform
                            designed to improve the delivery of healthcare services.
                            Patients can book appointments, receive clinic updates,
                            access medication information and stay connected with
                            healthcare providers through one secure system.
                        </p>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "20px",
                                marginTop: "35px"
                            }}
                        >
                            <div>✅ Secure Patient Records</div>
                            <div>✅ Easy Appointment Booking</div>
                            <div>✅ Community Support</div>
                            <div>✅ Medication Tracking</div>
                            <div>✅ Clinic Management</div>
                            <div>✅ Healthcare Announcements</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}

            <footer
                style={{
                    background: "#111827",
                    color: "#d1d5db",
                    padding: "50px 30px",
                    textAlign: "center"
                }}
            >
                <h3
                    style={{
                        color: "#fff",
                        marginBottom: "10px"
                    }}
                >
                    Ubuntu-Health Clinic System
                </h3>

                <p
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto 30px",
                        lineHeight: "1.8"
                    }}
                >
                    Improving healthcare through secure digital technology,
                    smarter appointments and better communication between
                    patients and healthcare providers.
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        flexWrap: "wrap",
                        marginBottom: "30px"
                    }}
                >
                    <a href="#features" style={{ color: "#d1d5db", textDecoration: "none" }}>
                        Features
                    </a>

                    <a href="#about" style={{ color: "#d1d5db", textDecoration: "none" }}>
                        About
                    </a>

                    <Link
                        to="/login"
                        style={{
                            color: "#d1d5db",
                            textDecoration: "none"
                        }}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        style={{
                            color: "#d1d5db",
                            textDecoration: "none"
                        }}
                    >
                        Register
                    </Link>
                </div>

                <hr
                    style={{
                        border: "none",
                        borderTop: "1px solid #374151",
                        marginBottom: "20px"
                    }}
                />

                <small>
                    © {new Date().getFullYear()} Ubuntu Health System. All rights reserved.
                </small>
            </footer>

        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div
            style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 6px 20px rgba(0,0,0,.06)",
                transition: "0.3s"
            }}
        >
            <div
                style={{
                    fontSize: "42px",
                    marginBottom: "20px"
                }}
            >
                {icon}
            </div>

            <h3
                style={{
                    marginBottom: "15px",
                    color: "#0d6efd"
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    color: "#666",
                    lineHeight: "1.7"
                }}
            >
                {description}
            </p>
        </div>
    );
}

function StatCard({ icon, number, title }) {
    return (
        <div
            style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "16px",
                textAlign: "center",
                border: "1px solid #e5e7eb",
                boxShadow: "0 6px 20px rgba(0,0,0,.05)"
            }}
        >
            <div style={{ fontSize: "40px" }}>
                {icon}
            </div>

            <h2
                style={{
                    color: "#0d6efd",
                    margin: "15px 0 5px"
                }}
            >
                {number}
            </h2>

            <p
                style={{
                    color: "#666"
                }}
            >
                {title}
            </p>
        </div>
    );
}

const navLink = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "600"
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