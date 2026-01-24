import { useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate, Navigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ If already logged in, redirect to Home
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  if (loggedUser) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields required");
      return;
    }

    const users = await getUsers();
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    alert("Login successful");

    navigate("/"); // ✅ Redirect properly
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Sign In
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          placeholder="Email"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
