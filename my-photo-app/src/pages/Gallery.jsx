import { useState } from "react";
import PhotoCard from "../components/PhotoCard.jsx";
import Modal from "react-modal";
import photosData from "../data/photos.json"; // import JSON

Modal.setAppElement("#root");

export default function Gallery() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [selectedTag, setSelectedTag] = useState("all");
  const allTags = ["all", ...new Set(photosData.flatMap(p => p.tags ))];

  const openModal = (photo) => {
    setCurrentPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentPhoto(null);
  };

  const filteredPhotos = selectedTag === "all"
    ? photosData
    : photosData.filter(p => p.tags.includes(selectedTag));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Photo Gallery</h1>
      <div style={{marginBottom: "1.5rem" }}>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{
              marginRight: "0.5rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: selectedTag === tag ? "2px solid black" : "1px solid #ccc",
              background: selectedTag === tag ? "#eee" : "white",
              cursor: "pointer"
            }}
            >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem",
        marginTop: "2rem"
      }}>
        {filteredPhotos.map((p, i) => (
          <PhotoCard key={i} src={p.src} title={p.title} onClick={() => openModal(p)} />
        ))}
      </div>

      {currentPhoto && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Photo Modal"
          style={{
            content: {
              maxWidth: "800px",
              maxHeight: "90vh",
              margin: "auto",
              height: "auto",
              inset: "50% auto auto 50%",
              transform: "translate(-50%, -50%)"
            },
            overlay: { backgroundColor: "rgba(0,0,0,0.7)" }
          }}
        >
          <button onClick={closeModal} style={{ float: "right", fontSize: "1.2rem" }}>✖</button>
          <img src={currentPhoto.src} alt={currentPhoto.title} style={{ width: "100%", height: "auto", marginTop: "1rem" }} />
          <h2>{currentPhoto.title}</h2>
        </Modal>
      )}
    </div>
  );
}
