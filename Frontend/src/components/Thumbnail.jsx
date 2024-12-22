import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Thumbnail({ image, onDelete, token }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!token) {
        console.error("JWT token is missing!");
        return;
      }

      try {
        const response = await axios.get(
          `http://46.101.231.121:8080/api/v1/images/${image.imageId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure token is passed correctly
            },
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(response.data);
        setImageSrc(url);
      } catch (error) {
        console.error("Error loading image:", error.response || error.message);
      }
    };

    fetchImage();
  }, [image.imageId, token]);

  const handleDelete = () => {
    if (token) {
      onDelete(image.imageId);
    } else {
      console.error("Cannot delete without a valid token.");
    }
    setShowModal(false);
  };

  return (
    <div className="card m-2 shadow-sm" style={{ width: "12rem" }}>
      <div className="card-body text-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Thumbnail"
            className="card-img-top mb-3"
            style={{ height: "100px", objectFit: "cover", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          />
        ) : (
          <p className="text-muted">Loading...</p>
        )}
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Image Options</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Thumbnail"
                    className="img-fluid mb-3"
                    style={{ maxHeight: "200px" }}
                  />
                )}
                <div>
                  <button
                    className="btn btn-danger me-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
