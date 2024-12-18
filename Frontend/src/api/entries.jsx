import axios from "axios";

// const API_URL = "http://46.101.231.121:8080/api/v1/entries";
const API_URL = "http://localhost:8080/api/v1/entries";


export const fetchEntries = async (token) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const createEntry = async (entry, token) =>
  axios.post(API_URL, entry, { headers: { Authorization: `Bearer ${token}` } });
