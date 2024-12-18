import React, { useState } from "react";

export default function EntryForm({ onSubmit }) {
  const [entry, setEntry] = useState({ name: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.name && entry.content) {
      onSubmit(entry);
    } else {
      alert("Title and content cannot be empty.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={entry.name}
        onChange={(e) => setEntry({ ...entry, name: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={entry.content}
        onChange={(e) => setEntry({ ...entry, content: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}
