import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

export default function HomeM() {
    return (
        <div>

            {/* NAVBAR */}

            <nav className="home-navbar"
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
                    <div className="home-brand"
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

                <div className="home-nav-links"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "30px"
                    }}
                >
                    <a href="#features" style={navLink}>
                        Features
                    </a>

                    <a
                        href="#about"
                        style={navLink}
                    >
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

            <section className="home-hero"
                style={{
                    background: "#0d6efd",
                    color: "#fff",
                    textAlign: "center",
                    padding: "80px 30px"
                }}
            >
                <h1 className="home-hero-title"
                    style={{
                        fontSize: "58px",
                        margin: "20px 0",
                        lineHeight: "1.2",
                        color: "darkorange"
                    }}
                >
                    Skip the Queue.
                    <br />
                    Get Better Healthcare.
                </h1>

                <p className="home-hero-text"
                    style={{
                        maxWidth: "750px",
                        margin: "0 auto",
                        fontSize: "20px",
                        lineHeight: "1.8",
                        color: "#fff"
                    }}
                >
                    Spend less time waiting and more time receiving care. Ubuntu-Health Clinic
                    allows patients to book clinic appointments in advance, helping
                    reduce long queues and making healthcare easier, faster and more
                    convenient.
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
                    background: "#198754",
                    color: "#fff",
                    textAlign: "center",
                    padding: "18px"
                }}
            >
                <strong>
                    Book First. Queue Less. Receive Better Healthcare.
                </strong>
            </section>

            {/* STATISTICS */}

            <section className="home-stats"
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
                        number="Multiple"
                        title="Clinics Connected"
                    />

                    <StatCard
                        icon="👨‍⚕️"
                        number="Healthcare"
                        title="Staff Management"
                    />

                    <StatCard
                        icon="👥"
                        number="Patient"
                        title="Access & Support"
                    />

                    <StatCard
                        icon="📅"
                        number="Online"
                        title="Appointment Booking"
                    />

                </div>
            </section>

            {/* FEATURES */}

            <section id="features" className="home-features"
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
                    Healthcare Made Easier
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        maxWidth: "700px",
                        margin: "0 auto 60px"
                    }}
                >
                    Ubuntu-Health connects patients with healthcare services through
                    convenient digital tools designed to make accessing care simpler
                    and more efficient.
                </p>

                <div className="home-feature-grid"
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
                        description="Book your clinic appointment in advance and spend less time waiting in long queues."
                    />

                    <FeatureCard
                        icon="💊"
                        title="Medication Management"
                        description="Keep track of your medication and access important prescription information in one place."
                    />

                    <FeatureCard
                        icon="📢"
                        title="Clinic Announcements"
                        description="Stay informed about clinic updates, important notices and healthcare information."
                    />

                    <FeatureCard
                        icon="👥"
                        title="Community Support"
                        description="Connect with other patients, share experiences and support one another on your healthcare journey."
                    />
                </div>
            </section>

            {/* ABOUT */}

            <section
                id="about"
                style={{
                    padding: "90px 60px",
                    background: "#ffffff",
                    scrollMarginTop: "100px"
                }}
            >
                <div className="home-about-container"
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

                    <div className="home-about-image"
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

                    <div className="home-about-text"
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
                                margin: "15px 0",
                                color: "#1f2937"
                            }}
                        >
                            Making healthcare easier, one appointment at a time.
                        </h2>

                        <p
                            style={{
                                color: "#666",
                                lineHeight: "1.9",
                                fontSize: "18px"
                            }}
                        >
                            Ubuntu-Health Clinic System is designed to make healthcare more
                            accessible and convenient for patients. Instead of spending hours
                            waiting in clinic queues, patients can book appointments in advance,
                            stay informed about clinic updates and manage their healthcare
                            information through one secure platform.
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
                            <div>✅ Stay updated with clinic announcements</div>
                            <div>✅ Clinic Management</div>
                            <div>✅ Secure patient information</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}

            <footer
                className="home-footer"
                style={{
                    background: "#111827",
                    color: "#d1d5db",
                    padding: "45px 50px 20px"
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "50px",
                        flexWrap: "wrap"
                    }}
                >

                    {/* COMPANY INFO */}

                    <div
                        style={{
                            flex: "1 1 400px"
                        }}
                    >
                        <h3
                            style={{
                                color: "#fff",
                                margin: "0 0 10px",
                                fontSize: "22px"
                            }}
                        >
                            Ubuntu-Health Clinic System
                        </h3>

                        <p
                            style={{
                                margin: 0,
                                maxWidth: "550px",
                                lineHeight: "1.7"
                            }}
                        >
                            Improving healthcare through secure digital technology,
                            smarter appointments and better communication between
                            patients and healthcare providers.
                        </p>
                    </div>


                    {/* CONTACT INFORMATION */}

                    <div
                        style={{
                            flex: "0 1 350px"
                        }}
                    >
                        <h4
                            style={{
                                color: "#fff",
                                margin: "0 0 15px",
                                fontSize: "17px"
                            }}
                        >
                            Contact Us
                        </h4>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}
                        >
                            <span>📞 +27 73 334 2525</span>

                            <span>✉️ support@ubuntuhealth.co.za</span>

                            <span>📍 Johannesburg, South Africa</span>
                        </div>
                    </div>

                </div>


                {/* COPYRIGHT */}

                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "30px auto 0",
                        paddingTop: "18px",
                        borderTop: "1px solid #374151",
                        textAlign: "center"
                    }}
                >
                    <small>
                        © {new Date().getFullYear()} Ubuntu Health System. All rights reserved.
                    </small>
                </div>

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
                    margin: "15px 0 5px",
                    fontSize: "26px"
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
