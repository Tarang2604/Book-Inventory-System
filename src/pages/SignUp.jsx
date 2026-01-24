import { useState } from "react";
import { addUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      alert("All fields are required");
      return;
    }

    if (!user.email.includes("@")) {
      alert("Invalid email format");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await addUser(user);
    alert("Account created successfully!");
    navigate("/signin");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          className="border p-2 w-full rounded"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full rounded"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}
