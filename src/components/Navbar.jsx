import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">📚 Book Inventory</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add" className="hover:underline">Add Book</Link>
      </div>
    </nav>
  );
};

export default Navbar;




