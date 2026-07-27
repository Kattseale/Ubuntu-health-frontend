export default function AnnouncementCard({
    announcement,
    onEdit,
    onDelete
}) {

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,.1)"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                }}
            >
                <div>

                    <h3
                        style={{
                            marginBottom: "8px",
                            color: "#0d6efd"
                        }}
                    >
                        📢 {announcement.title}
                    </h3>
                    <span
                        style={{
                            display: "inline-block",
                            padding: "5px 12px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                            background:
                                announcement.priority === "HIGH"
                                    ? "#dc3545"
                                    : announcement.priority === "MEDIUM"
                                        ? "#ffc107"
                                        : "#0d6efd",
                            color:
                                announcement.priority === "MEDIUM"
                                    ? "#000"
                                    : "#fff"
                        }}
                    >
    {
        announcement.priority === "HIGH"
            ? "🚨 Urgent"
            :
            announcement.priority === "MEDIUM"
                ? "📢 Important"
                :
                "ℹ️ Information"
    }
</span>
                    <p
                        style={{
                            color: "#555",
                            lineHeight: "1.7"
                        }}
                    >
                        {announcement.description}
                    </p>

                </div>

                {onEdit && (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        {onEdit && (
                        <button
                            onClick={() => onEdit(announcement)}
                            style={{
                                background: "#ffc107",
                                border: "none",
                                color: "#000",
                                padding: "8px 14px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Edit
                        </button>
                            )}
                        {onDelete && (
                        <button
                            onClick={() => onDelete(announcement.id)}
                            style={{
                                background: "#dc3545",
                                border: "none",
                                color: "#fff",
                                padding: "8px 14px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Delete
                        </button>
                            )}
                    </div>
                )}
            </div>

            <hr
                style={{
                    margin: "18px 0"
                }}
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#777",
                    fontSize: "14px"
                }}
            >
                <span>
                    👤 {announcement.createdBy}
                </span>

                <span>
                    📅 {
                    new Date(
                        announcement.createdAt
                    ).toLocaleString()
                }
                </span>
            </div>
        </div>
    );
}