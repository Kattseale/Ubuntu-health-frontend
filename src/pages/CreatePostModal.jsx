import { useState } from "react";

export default function CreatePostModal({
    show,
    onClose,
    onCreate,
    clinics
}) {

    const [post, setPost] = useState({
        clinicId: "",
        message: ""
    });

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onCreate(post);

        setPost({
            clinicId: "",
            message: ""
        });
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-content">

                <h2>Create Community Post</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Clinic</label>

                        <select
                            name="clinicId"
                            value={post.clinicId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Clinic
                            </option>

                            {clinics.map((clinic) => (

                                <option
                                    key={clinic.id}
                                    value={clinic.id}
                                >
                                    {clinic.clinicName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Message</label>

                        <textarea
                            name="message"
                            rows="5"
                            value={post.message}
                            onChange={handleChange}
                            placeholder="Share your experience..."
                            required
                        />

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Post
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}