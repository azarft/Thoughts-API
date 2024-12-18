import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await login(form);
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.accessToken);
      alert("Login successful!");
      navigate("/diary");
    } catch (error) {
      const errorMessage = error.response?.data || "Login failed. Please try again.";
      console.error("Login error:", errorMessage);
    
      if (errorMessage.includes("Email not verified")) {
        alert("Please verify your email before logging in.");
      } else {
        alert(errorMessage);
      }
    }    
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
