export default function CommunityCard({
                                          post,
                                          onEdit,
                                          onDelete
                                      }) {

    const formattedDate = new Date(post.createdAt).toLocaleString("en-ZA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (

        <div
            className="card"
            style={{
                marginBottom: "20px",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <h3 style={{ margin: 0 }}>
                        👤 {post.patientName}
                    </h3>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "5px"
                        }}
                    >
                        🏥 {post.clinicName}
                    </p>

                </div>

                <small
                    style={{
                        color: "#888"
                    }}
                >
                    {formattedDate}
                </small>

            </div>

            <hr />

            <p
                style={{
                    fontSize: "16px",
                    lineHeight: "1.7"
                }}
            >
                {post.message}
            </p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "20px"
                }}
            >

                <button
                    className="btn-primary"
                    onClick={() => onEdit(post)}
                >
                    ✏ Edit
                </button>

                <button
                    className="btn-danger"
                    onClick={() => onDelete(post.id)}
                >
                    🗑 Delete
                </button>

            </div>

        </div>

    );
}