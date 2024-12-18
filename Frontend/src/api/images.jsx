import axios from "axios";

// const API_URL = "http://46.101.231.121:8080/api/v1/images";
const API_URL = "http://localhost:8080/api/v1/images";

export const uploadImage = async (file, entryId, token) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/entry/${entryId}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
