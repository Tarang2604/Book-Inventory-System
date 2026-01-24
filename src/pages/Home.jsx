import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")); // ✅ Logged user check

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data || []);
    } catch (err) {
      toast.error("❌ Failed to load books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return toast.error("Invalid book ID");

    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        toast.success("🗑️ Book deleted successfully!");
        fetchBooks();
      } catch {
        toast.error("❌ Failed to delete book");
      }
    }
  };

  const filteredBooks = books
    .filter((b) =>
      b?.title?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "asc"
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price)
    );

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading books...</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-indigo-100">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-indigo-700">
            📚 Book Vault
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by title..."
              className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border px-4 py-2 rounded-lg shadow-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="asc">Price ↑</option>
              <option value="desc">Price ↓</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-lg border border-indigo-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    📭 No books found. Add some!
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => {
                  if (!book?.id) return null;

                  return (
                    <tr
                      key={book.id}
                      className="border-b hover:bg-indigo-50 transition"
                    >
                      <td className="p-3 font-medium">{book.title}</td>
                      <td className="p-3">{book.author}</td>
                      <td className="p-3 font-semibold text-indigo-600">
                        ₹{book.price}
                      </td>
                      <td className="p-3 text-center space-x-3">
                        <Link
                          to={`/view/${book.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View
                        </Link>

                        {/* ✅ Only show Edit/Delete if logged in */}
                        {user && (
                          <>
                            <Link
                              to={`/edit/${book.id}`}
                              className="text-green-600 hover:underline font-medium"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="text-red-600 hover:underline font-medium"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

