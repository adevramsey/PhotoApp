import { useCallback, useState } from "react";

export default function PhotoDropzone({ onFilesAdded }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length) {
        onFilesAdded(files);
      }
    },
    [onFilesAdded]
  );

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length) {
      onFilesAdded(files);
    }
  };

  return (
    <div
      className={`dropzone ${isDragging ? "dragging" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        id="file-input"
        hidden
        onChange={handleFileInput}
      />

      <label htmlFor="file-input" className="dropzone-content">
        <p><strong>Drag & drop photos here</strong></p>
        <p>or click to select files</p>
      </label>
    </div>
  );
}
