import React, { useEffect, useState } from "react";
import { fetchEntries, createEntry } from "../api/entries";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";

export default function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadEntries = async () => {
      const res = await fetchEntries(token);
      setEntries(res.data);
    };
    loadEntries();
  }, []);

  const handleCreateEntry = async (entry) => {
    await createEntry(entry, token);
    alert("Entry added!");
  };

  return (
    <div>
      <h2>Your Diary</h2>
      <EntryForm onSubmit={handleCreateEntry} />
      <EntryList entries={entries} />
    </div>
  );
}
