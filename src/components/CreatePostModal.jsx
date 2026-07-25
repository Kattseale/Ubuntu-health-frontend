import { useState } from "react";

function CreatePostModal({
                             show,
                             clinics,
                             onClose,
                             onCreate
                         }) {

    const [formData, setFormData] = useState({
        clinicId: "",
        message: ""
    });

    if (!show) {
        return null;
    }

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onCreate(formData);

        setFormData({
            clinicId: "",
            message: ""
        });

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Create Community Post</h2>

                <form onSubmit={handleSubmit}>

                    <select
                        name="clinicId"
                        value={formData.clinicId}
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

                    <textarea
                        name="message"
                        placeholder="Share your experience..."
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                    />

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Post
                        </button>

                        <button
                            type="button"
                            className="btn-danger"
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

export default CreatePostModal;