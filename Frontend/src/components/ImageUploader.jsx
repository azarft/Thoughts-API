const uploadImage = async (file, entryId) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `http://46.101.231.121:8080/api/v1/images/entry/${entryId}`,
    formData,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return res.data;
};
