import { getRole } from "../services/authService";

export default function AnnouncementCard({
    announcement,
    onEdit,
    onDelete
}) {

    const role = getRole();

    const canManage =
        role === "ADMIN";

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

                    <p
                        style={{
                            color: "#555",
                            lineHeight: "1.7"
                        }}
                    >
                        {announcement.message}
                    </p>

                </div>

                {canManage && (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
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
                    📅 {announcement.createdAt}
                </span>
            </div>
        </div>
    );
}