import { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        console.error("Failed to fetch book", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.price) {
      alert("All fields required");
      return;
    }

    if (Number(book.price) <= 0) {
      alert("Price must be positive");
      return;
    }

    await updateBook(id, { ...book, price: Number(book.price) });
    navigate("/");
  };

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">✏️ Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" name="title" value={book.title} onChange={handleChange} />
        <input className="border p-2 w-full" name="author" value={book.author} onChange={handleChange} />
        <input className="border p-2 w-full" name="price" type="number" value={book.price} onChange={handleChange} />
        <textarea className="border p-2 w-full" name="description" value={book.description || ""} onChange={handleChange} />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBook;
