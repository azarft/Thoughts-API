import React, { useEffect, useState } from "react";
import { fetchEntries, createEntry, updateEntry, deleteEntry } from "../api/entries";
import { fetchEntryImages, deleteImage } from "../api/images";
import ImageUploader from "../components/ImageUploader";
import Thumbnail from "../components/Thumbnail";
import EntryForm from "../components/EntryForm"; // Entry Form for adding entries

export default function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  const loadEntries = async () => {
    const res = await fetchEntries(token);
    setEntries(res.data);
  };

  const loadImages = async (entryId) => {
    const res = await fetchEntryImages(entryId, token);
    setImages(res.data);
    setSelectedEntry(entries.find((entry) => entry.entryId === entryId));
    setShowModal(true);
  };

  const handleAddEntry = async (entry) => {
    await createEntry(entry, token);
    loadEntries();
  };

  const handleDeleteEntry = async () => {
    if (entryToDelete) {
      await deleteEntry(entryToDelete.entryId, token);
      setEntryToDelete(null);
      setShowDeleteDialog(false);
      loadEntries();
      if (selectedEntry?.entryId === entryToDelete.entryId) {
        setSelectedEntry(null);
        setImages([]);
      }
    }
  };

  const handleDeleteImage = async (imageId) => {
    await deleteImage(imageId, token);
    if (selectedEntry) {
      loadImages(selectedEntry.entryId);
    }
  };

  const handleSaveEntry = async (updatedEntry) => {
    await updateEntry(selectedEntry.entryId, updatedEntry, token);
    loadEntries();
    setShowModal(false);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Diary</h1>

      {/* Entry Form for Adding Entries */}
      <div className="mb-4">
        <h3>Add New Entry</h3>
        <EntryForm onSubmit={handleAddEntry} />
      </div>

      {/* Display Entries */}
      <div className="row">
        {entries.map((entry) => (
          <div key={entry.entryId} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {entry.name}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setEntryToDelete(entry);
                      setShowDeleteDialog(true);
                    }}
                  >
                    X
                  </button>
                </h5>
                <p className="card-text text-truncate">{entry.content}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => loadImages(entry.entryId)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Viewing and Editing Entry */}
      {showModal && selectedEntry && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  Entry Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h5>Edit Entry</h5>
                <input
                  type="text"
                  className="form-control my-2"
                  value={selectedEntry.name}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      name: e.target.value,
                    })
                  }
                />
                <textarea
                  className="form-control my-2"
                  rows="5"
                  value={selectedEntry.content}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      content: e.target.value,
                    })
                  }
                ></textarea>
                <button
                  className="btn btn-success"
                  onClick={() => handleSaveEntry(selectedEntry)}
                >
                  Save
                </button>

                <hr />

                <h5>Images</h5>
                <ImageUploader
                  entryId={selectedEntry.entryId}
                  token={token}
                  onUploadSuccess={() => loadImages(selectedEntry.entryId)}
                />
                <div className="row mt-3">
                  {images.map((image) => (
                    <div key={image.imageId} className="col-md-3 col-sm-6">
                      <Thumbnail image={image} token={token} onDelete={handleDeleteImage} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDeleteDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the entry{" "}
                <strong>{entryToDelete?.name}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteEntry}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
