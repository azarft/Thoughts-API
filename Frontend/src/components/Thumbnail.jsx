import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Thumbnail({ image, onDelete, token }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/images/${image.imageId}`, // Use image.imageId from your backend DTO
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob", // Fetch as a binary blob
          }
        );
        const url = URL.createObjectURL(response.data); // Convert blob to object URL
        setImageSrc(url);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    fetchImage();
  }, [image.imageId, token]); // Use image.imageId in dependency array

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Thumbnail" width="100" height="100" />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => onDelete(image.imageId)}>Delete</button>
    </div>
  );
}
