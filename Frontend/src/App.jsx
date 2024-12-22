import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DiaryPage from "./pages/DiaryPage";
import Header from "./components/Header";
import { getUserDetails } from "./api/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const res = await getUserDetails(token);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to load user details:", error);
      }
    };

    if (token) {
      loadUserDetails();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/diary" element={<DiaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
