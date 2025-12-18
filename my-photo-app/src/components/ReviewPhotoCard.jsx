import { useState } from "react";

export default function ReviewPhotoCard({
  photo,
  onUpdate,
  onConfirm,
  onRemove
}) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (!tagInput.trim()) return;
    onUpdate(photo.id, {
      tags: [...photo.tags, tagInput.trim()]
    });
    setTagInput("");
  };

  return (
    <div className="review-card">
      <img src={photo.previewUrl} alt="Preview" />

      <input
        type="text"
        placeholder="Title"
        value={photo.title}
        onChange={(e) =>
          onUpdate(photo.id, { title: e.target.value })
        }
      />

      <div className="tags">
        {photo.tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="tag-input">
        <input
          type="text"
          placeholder="Add tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
        />
        <button onClick={addTag}>Add</button>
      </div>

      <div className="actions">
        <button onClick={() => onConfirm(photo.id)}>
          Confirm
        </button>
        <button
          className="danger"
          onClick={() => onRemove(photo.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
