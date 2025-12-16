// src/components/PhotoCard.jsx
export default function PhotoCard({ src, title, onClick }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#fff"
      }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "0.5rem" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
    </div>
  );
}
