import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ItemModal = ({ item, onClose }) => {
  const [mainImage, setMainImage] = React.useState(item.coverImage);
  const images = [item.coverImage, ...item.images];

  // Ref for modal content
  const modalRef = useRef();

  // Detect click outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const sendEmail = () => {
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with actual values
        "YOUR_TEMPLATE_ID",
        {},
        "YOUR_PUBLIC_KEY"
      )
      .then(() => alert("Enquiry sent successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-5xl max-h-screen overflow-y-auto relative"
      >
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div>
            <img
              src={mainImage}
              alt={item.name}
              className="w-full h-96 object-contain mb-4 border rounded"
            />
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                    mainImage === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-600 mt-1">Type: {item.type}</p>

            <hr className="my-4" />

            {/* Description */}
            <h3 className="font-semibold text-gray-700">Description</h3>
            <p className="mt-2 text-gray-700">{item.description}</p>

            <hr className="my-4" />

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col space-y-3">
              <button
                onClick={sendEmail}
                className="py-3 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition-colors"
              >
                Enquire About This Item
              </button>
              <button
                onClick={onClose}
                className="py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;