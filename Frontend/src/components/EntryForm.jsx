import React, { useState } from "react";

export default function EntryForm({ onSubmit }) {
  const [entry, setEntry] = useState({ name: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(entry);
    setEntry({ name: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={entry.name}
        onChange={(e) => setEntry({ ...entry, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        value={entry.content}
        onChange={(e) => setEntry({ ...entry, content: e.target.value })}
        required
      />
      <button type="submit">Create Entry</button>
    </form>
  );
}
