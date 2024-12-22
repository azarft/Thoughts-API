import React, { useState, useEffect } from "react";

export default function EntryForm({ entry, onSubmit }) {
  const [form, setForm] = useState({ name: "", content: "" });

  useEffect(() => {
    if (entry) {
      setForm({ name: entry.name, content: entry.content });
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        className="form-control mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        className="form-control mb-3"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
      />
      <button type="submit" className="btn btn-primary">
        {entry ? "Save" : "Create Entry"}
      </button>
    </form>
  );
}
