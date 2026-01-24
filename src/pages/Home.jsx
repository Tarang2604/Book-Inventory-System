import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await deleteBook(id);
      fetchBooks();
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Book
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id} className="text-center">
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">₹{book.price}</td>
              <td className="border p-2 space-x-2">
                <Link to={`/view/${book.id}`} className="text-blue-600">View</Link>
                <Link to={`/edit/${book.id}`} className="text-yellow-600">Edit</Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

