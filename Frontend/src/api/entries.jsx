
import axios from "axios";

const API_URL = "http://46.101.231.121:8080/api/v1/entries";

export const createEntry = async (entry, token) =>
  axios.post(API_URL, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchEntries = async (token) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const deleteEntry = async (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const updateEntry = async (entryId, updatedEntry, token) =>
  axios.put(`http://46.101.231.121:8080/api/v1/entries/${entryId}`, updatedEntry, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
