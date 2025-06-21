import React, { useState, useEffect } from "react";
import ItemModal from "../components/ItemModal";
import initialItems from "../data/initialItems";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems([...initialItems, ...savedItems]);
  }, []);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Explore Our Collection</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold text-lg">{item.type}</span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                <button
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(item);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && <ItemModal item={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default ViewItems;