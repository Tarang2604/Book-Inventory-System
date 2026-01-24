// import { useEffect, useState } from "react";
// import { getBook } from "../services/api";
// import { useParams, Link } from "react-router-dom";

// const ViewBook = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       const data = await getBook(id);
//       setBook(data);
//     };
//     fetchBook();
//   }, [id]);

//   if (!book) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Book Details</h2>
//       <p><b>Title:</b> {book.title}</p>
//       <p><b>Author:</b> {book.author}</p>
//       <p><b>Price:</b> ₹{book.price}</p>

//       <Link to="/" className="block mt-4 text-blue-600">← Back</Link>
//     </div>
//   );
// };

// export default ViewBook;

import BookDetails from "../components/BookDetails";

const ViewBook = () => {
  return <BookDetails />;
};

export default ViewBook;

