import { useEffect, useState } from "react";
import { getBook } from "../services/api";
import { useParams, Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Book Details</h2>
      <p><b>Title:</b> {book.title}</p>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Price:</b> ₹{book.price}</p>

      <Link to="/" className="inline-block mt-4 text-indigo-600">← Back</Link>
    </div>
  );
};

export default BookDetails;
