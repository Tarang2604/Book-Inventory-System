import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold tracking-wide">
          📚 Book Buddy Inventory 
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>

          {user && (
            <Link to="/add" className="text-white hover:underline">
              Add Book
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/signin"
                className="bg-white text-indigo-600 px-4 py-1 rounded-full hover:bg-indigo-100 transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="border border-white text-white px-4 py-1 rounded-full hover:bg-white hover:text-indigo-600 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-white font-medium">
                👋 {user.name || user.email}
              </span>

              <button
                onClick={() => setDark(!dark)}
                className="bg-white/20 text-white px-3 py-1 rounded-full"
              >
                {dark ? "☀️" : "🌙"}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
