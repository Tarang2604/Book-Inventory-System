import { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", price: "" });

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book.price <= 0) {
      alert("Price must be positive!");
      return;
    }
    await updateBook(id, { ...book, price: Number(book.price) });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={book.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="author" value={book.author} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="price" type="number" min="1" value={book.price} onChange={handleChange} className="w-full border p-2 rounded" />
        <button className="bg-green-600 text-white w-full py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditBook;


