import { getRole } from "../services/authService";

export default function AnnouncementCard({
                                             announcement,
                                             darkMode,
                                             onEdit,
                                             onDelete
                                         }) {
    const role = getRole();
    const isAdmin = role === "ADMIN";

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "HIGH":
                return "#dc3545";
            case "MEDIUM":
                return "#fd7e14";
            case "LOW":
                return "#198754";
            default:
                return "#6c757d";
        }
    };

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case "HIGH":
                return "🚨 Urgent";
            case "MEDIUM":
                return "📢 Important";
            case "LOW":
                return "ℹ️ Information";
            default:
                return priority;
        }
    };

    return (
        <div
            className="card"
            style={{
                backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                color: darkMode ? "#ffffff" : "#000000",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "15px"
                }}
            >
                <div>
                    <h3 style={{ margin: 0 }}>
                        {announcement.title}
                    </h3>

                    <span
                        style={{
                            display: "inline-block",
                            marginTop: "8px",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            backgroundColor: getPriorityColor(
                                announcement.priority
                            ),
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: "bold"
                        }}
                    >
                        {getPriorityLabel(announcement.priority)}
                    </span>
                </div>

                {isAdmin && (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        <button
                            className="btn-primary"
                            onClick={() => onEdit(announcement)}
                        >
                            ✏️ Edit
                        </button>

                        <button
                            className="btn-danger"
                            onClick={() => onDelete(announcement.id)}
                        >
                            🗑 Delete
                        </button>
                    </div>
                )}
            </div>

            <p
                style={{
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap"
                }}
            >
                {announcement.description}
            </p>

            {announcement.createdAt && (
                <p
                    style={{
                        marginTop: "20px",
                        fontSize: "13px",
                        color: darkMode ? "#bbbbbb" : "#666666"
                    }}
                >
                    Posted:
                    {" "}
                    {new Date(
                        announcement.createdAt
                    ).toLocaleString()}
                </p>
            )}
        </div>
    );
}