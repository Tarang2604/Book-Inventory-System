import { useState } from "react";
import { addBook } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

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

    await addBook({
      ...book,
      price: Number(book.price),
    });

    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">➕ Add Book</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" name="title" placeholder="Title" onChange={handleChange} />
        <input className="border p-2 w-full" name="author" placeholder="Author" onChange={handleChange} />
        <input className="border p-2 w-full" name="price" type="number" placeholder="Price" onChange={handleChange} />
        <textarea className="border p-2 w-full" name="description" placeholder="Description" onChange={handleChange} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddBook;


