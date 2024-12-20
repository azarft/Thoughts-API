import React, { useEffect, useState } from "react";
import { fetchEntries, createEntry } from "../api/entries";
import { fetchEntryImages, deleteImage } from "../api/images";
import EntryForm from "../components/EntryForm";
import ImageUploader from "../components/ImageUploader";
import Thumbnail from "../components/Thumbnail";

export default function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const token = localStorage.getItem("token");

  const loadEntries = async () => {
    const res = await fetchEntries(token);
    setEntries(res.data);
  };

  const loadImages = async (entryId) => {
    const res = await fetchEntryImages(entryId, token);
    setImages(res.data);
    setSelectedEntry(entryId);
  };

  const handleCreateEntry = async (entry) => {
    await createEntry(entry, token);
    loadEntries();
  };

  const handleDeleteImage = async (imageId) => {
    await deleteImage(imageId, token);
    loadImages(selectedEntry);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div>
      <h1>My Diary</h1>
      <EntryForm onSubmit={handleCreateEntry} />

      <h2>Your Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.entryId}>
            {entry.name}
            <button onClick={() => loadImages(entry.entryId)}>
              View Images
            </button>
          </li>
        ))}
      </ul>

      {selectedEntry && (
        <>
          <h3>Images for Entry ID: {selectedEntry}</h3>
          <ImageUploader
            entryId={selectedEntry}
            token={token}
            onUploadSuccess={() => loadImages(selectedEntry)}
          />
          <div>
            {images.map((image) => (
              <Thumbnail
                key={image.imageId} // Pass a unique key
                image={image}
                onDelete={handleDeleteImage}
                token={token}
              />
            ))}
          </div>

        </>
      )}
    </div>
  );
}
