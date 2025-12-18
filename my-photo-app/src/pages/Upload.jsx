import { useNavigate } from "react-router-dom";
import PhotoDropzone from "../components/PhotoDropzone.jsx";
import { usePhotoStore } from "../hooks/usePhotoStore.jsx";
import "../styles/upload.css";

export default function Upload() {
  const navigate = useNavigate();
  const { stagedPhotos, addStagedPhotos } = usePhotoStore();

  return (
    <div className="upload-page">
      <h1>Upload Photos</h1>
      <p>Add one or more photos. You can review them before saving.</p>

      <PhotoDropzone onFilesAdded={addStagedPhotos} />

      {stagedPhotos.length > 0 && (
        <>
          <div className="preview-grid">
            {stagedPhotos.map((photo) => (
              <img
                key={photo.id}
                src={photo.previewUrl}
                alt="Preview"
                className="preview-thumb"
              />
            ))}
          </div>

          <button
            className="review-button"
            onClick={() => navigate("/review")}
          >
            Review photos ({stagedPhotos.length})
          </button>
        </>
      )}
    </div>
  );
}
