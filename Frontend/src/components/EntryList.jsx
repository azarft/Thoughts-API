import React from "react";

export default function EntryList({ entries }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.entryId}>{entry.name}</li>
      ))}
    </ul>
  );
}
