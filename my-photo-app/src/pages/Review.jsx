import { useNavigate } from "react-router-dom";
import { usePhotoStore } from "../hooks/usePhotoStore.jsx";
import ReviewPhotoCard from "../components/ReviewPhotoCard";
import "../styles/review.css";

export default function Review() {
  const navigate = useNavigate();
  const {
    stagedPhotos,
    updatePhoto,
    confirmPhoto,
    removePhoto
  } = usePhotoStore();

  const confirmAll = () => {
    stagedPhotos.forEach((p) => confirmPhoto(p.id));
    navigate("/gallery");
  };

  if (stagedPhotos.length === 0) {
    return (
      <div className="review-page">
        <h1>No photos to review</h1>
        <button onClick={() => navigate("/upload")}>
          Upload photos
        </button>
      </div>
    );
  }

  return (
    <div className="review-page">
      <h1>Review Photos</h1>
      <p>Review and confirm your uploaded photos.</p>

      <div className="review-grid">
        {stagedPhotos.map((photo) => (
          <ReviewPhotoCard
            key={photo.id}
            photo={photo}
            onUpdate={updatePhoto}
            onConfirm={confirmPhoto}
            onRemove={removePhoto}
          />
        ))}
      </div>

      <div className="review-footer">
        <button onClick={() => navigate("/upload")}>
          Back to Upload
        </button>
        <button onClick={confirmAll}>
          Confirm All
        </button>
      </div>
    </div>
  );
}
