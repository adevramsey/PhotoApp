import { createContext, useContext, useState } from "react";

const PhotoStoreContext = createContext(null);

export function PhotoStoreProvider({ children }) {
  const [photos, setPhotos] = useState([]);

  // Add newly uploaded photos (staged)
  const addStagedPhotos = (files) => {
    const newPhotos = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      title: "",
      tags: [],
      status: "staged", // staged | confirmed
      createdAt: new Date()
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const updatePhoto = (id, updates) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, ...updates } : photo
      )
    );
  };

  const confirmPhoto = (id) => {
    updatePhoto(id, { status: "confirmed" });
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <PhotoStoreContext.Provider
      value={{
        photos,
        stagedPhotos: photos.filter((p) => p.status === "staged"),
        confirmedPhotos: photos.filter((p) => p.status === "confirmed"),
        addStagedPhotos,
        updatePhoto,
        confirmPhoto,
        removePhoto
      }}
    >
      {children}
    </PhotoStoreContext.Provider>
  );
}

export function usePhotoStore() {
  const context = useContext(PhotoStoreContext);
  if (!context) {
    throw new Error("usePhotoStore must be used within a PhotoStoreProvider");
  }
  return context;
}
