import { useEffect, useState } from "react";

export default function AddAnnouncementModal({
                                                 open,
                                                 onClose,
                                                 onSave,
                                                 announcement
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

                description:
                    announcement.description || "",

                priority:
                    announcement.priority || "MEDIUM"

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
                inset: 0,
                background: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
        >

            <div
                style={{
                    background:
                        window.localStorage.getItem("theme") === "dark"
                            ?
                            "#1e1e1e"
                            :
                            "#fff",
                    padding: "30px",
                    width: "500px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,.2)"
                }}
            >

                <h2 style={{ marginBottom: "20px" }}>
                    {announcement ? "Edit Announcement" : "New Announcement"}
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
                            style={inputStyle}
                        />

                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ marginBottom:"15px" }}>

                            <label>Priority</label>

                            <select
                                value={form.priority}
                                onChange={(e)=>
                                    setForm({
                                        ...form,
                                        priority:e.target.value
                                    })
                                }
                                style={inputStyle}
                            >

                                <option value="LOW">
                                    ℹ️ Information
                                </option>

                                <option value="MEDIUM">
                                    📢 Important
                                </option>

                                <option value="HIGH">
                                    🚨 Urgent
                                </option>

                            </select>

                        </div>
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
                                ...inputStyle,
                                resize: "vertical"
                            }}
                        />

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px"
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

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxSizing: "border-box"
};

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