import React, { useState } from "react";
import { uploadImageToEntry } from "../api/images";

export default function ImageUploader({ entryId, token, onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      if (file) {
        await uploadImageToEntry(entryId, file, token);
        alert("Image uploaded successfully!");
        onUploadSuccess();
      } else {
        alert("Please select a file first.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}
