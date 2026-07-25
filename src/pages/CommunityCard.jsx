import "./community.css";

export default function CommunityCard({
    post,
    onEdit,
    onDelete,
    currentUserId
}) {

    const canEdit = currentUserId === post.patientId;

    return (
        <div className="community-card">

            <div className="community-header">
                <h4>{post.patientName || "Patient"}</h4>

                <small>
                    {new Date(post.createdAt).toLocaleString()}
                </small>
            </div>

            <div className="community-body">
                <p>{post.message}</p>
            </div>

            {canEdit && (
                <div className="community-actions">

                    <button
                        className="edit-btn"
                        onClick={() => onEdit(post)}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(post.id)}
                    >
                        Delete
                    </button>

                </div>
            )}

        </div>
    );
}