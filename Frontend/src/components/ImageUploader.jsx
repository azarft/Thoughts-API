import React, { useState } from "react";

export default function ImageUploader({ entryId, token, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload.");
    if (!token) return alert("Authorization token is missing!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `http://46.101.231.121:8080/api/v1/images/entry/${entryId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Image uploaded successfully!");
        setSelectedFile(null);
        onUploadSuccess();
      } else {
        const error = await response.text();
        alert(`Failed to upload image: ${error}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-start gap-2">
      <label className="btn btn-outline-primary btn-sm">
        Choose File
        <input
          type="file"
          className="d-none"
          onChange={handleFileChange}
        />
      </label>
      <span className="text-muted small">
        {selectedFile ? selectedFile.name : "No file chosen"}
      </span>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload Image
      </button>
    </div>
  );
}
