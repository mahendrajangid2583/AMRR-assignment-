import { Link, useMatch } from "react-router-dom";

const Navbar = () => {
  const isViewItemsActive = useMatch("/");
  const isAddItemActive = useMatch("/add-item");

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Store</h1>
        <div className="space-x-6 flex">
          <Link
            to="/"
            className={`transition duration-200 hover:text-blue-200 ${
              isViewItemsActive ? "text-yellow-300 font-semibold underline" : ""
            }`}
          >
            View Items
          </Link>
          <Link
            to="/add-item"
            className={`transition duration-200 hover:text-blue-200 ${
              isAddItemActive ? "text-yellow-300 font-semibold underline" : ""
            }`}
          >
            Add Item
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;