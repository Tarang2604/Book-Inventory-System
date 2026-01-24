

// import BookDetails from "../components/BookDetails";

// const ViewBook = () => {
//   return <BookDetails />;
// };

// export default ViewBook;


import { useEffect, useState } from "react";
import { getBook } from "../services/api";
import { useParams } from "react-router-dom";

export default function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        console.error("Failed to load book", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (!id) return <p className="text-center mt-10">Invalid Book ID</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return <p className="text-center mt-10">Book not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl border">
      <h2 className="text-3xl font-bold text-indigo-600">{book.title}</h2>
      <p className="mt-2 text-gray-600">✍ Author: {book.author}</p>
      <p className="mt-2 font-semibold">💰 Price: ₹{book.price}</p>

      <div className="mt-4 p-4 bg-gray-100 rounded border">
        <h3 className="font-semibold mb-2">📖 Description</h3>
        <p className="text-gray-700">
          {book.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
