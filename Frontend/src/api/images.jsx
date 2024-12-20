// const API_URL = "http://46.101.231.121:8080/api/v1/images";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/images";

export const uploadImageToEntry = async (entryId, file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/entry/${entryId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchEntryImages = async (entryId, token) =>
  axios.get(`${API_URL}/entry/${entryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteImage = async (imageId, token) =>
  axios.delete(`${API_URL}/${imageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
