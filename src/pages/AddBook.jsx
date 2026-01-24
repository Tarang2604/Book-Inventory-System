import { useState } from "react";
import { addBook } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", price: "" });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author || book.price <= 0) {
      alert("All fields required & price must be positive!");
      return;
    }

    await addBook({ ...book, price: Number(book.price) });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="author" placeholder="Author" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="price" type="number" placeholder="Price" min="1" onChange={handleChange} className="w-full border p-2 rounded" />
        <button className="bg-indigo-600 text-white w-full py-2 rounded">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;


