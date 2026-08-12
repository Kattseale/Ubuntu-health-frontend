import { useEffect, useState } from "react";

export default function AddAnnouncementModal({
                                                 open,
                                                 onClose,
                                                 onSave,
                                                 announcement,
                                                 darkMode
                                             }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "MEDIUM"
    });

    useEffect(() => {
        if (announcement) {
            setForm({
                title: announcement.title || "",
                description: announcement.description || "",
                priority: announcement.priority || "MEDIUM"
            });
        } else {
            setForm({
                title: "",
                description: "",
                priority: "MEDIUM"
            });
        }
    }, [announcement]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <div
                style={{
                    background: darkMode ? "#1e1e1e" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                    width: "500px",
                    maxWidth: "90%",
                    borderRadius: "12px",
                    padding: "25px",
                    boxShadow: "0 8px 20px rgba(0,0,0,.3)"
                }}
            >
                <h2 style={{ marginBottom: "20px" }}>
                    {announcement ? "✏️ Edit Announcement" : "📢 New Announcement"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label>Title</label>

                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    title: e.target.value
                                })
                            }
                            style={inputStyle(darkMode)}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Priority</label>

                        <select
                            value={form.priority}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    priority: e.target.value
                                })
                            }
                            style={inputStyle(darkMode)}
                        >
                            <option value="LOW">ℹ️ Information</option>
                            <option value="MEDIUM">📢 Important</option>
                            <option value="HIGH">🚨 Urgent</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label>Message</label>

                        <textarea
                            rows="6"
                            required
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value
                                })
                            }
                            style={{
                                ...inputStyle(darkMode),
                                resize: "vertical"
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px"
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            style={cancelButton}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            style={saveButton}
                        >
                            {announcement ? "Update" : "Publish"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const inputStyle = (darkMode) => ({
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#2b2b2b" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    fontSize: "15px",
    boxSizing: "border-box"
});

const saveButton = {
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
};

const cancelButton = {
    background: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
};