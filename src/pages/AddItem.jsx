import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle Cover Image Change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Additional Images
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviews((prev) => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  // Remove an image preview
  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coverImage) {
      alert("Please select a cover image.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      type,
      description,
      coverImage: coverPreview,
      images: [...imagePreviews],
    };

    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    localStorage.setItem("items", JSON.stringify([newItem, ...savedItems]));

    alert("Item successfully added");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Item</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Item Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. Shirt, Shoes"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the item"
              required
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              required
              className="w-full"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="mt-2 w-40 h-40 object-cover rounded-md shadow-sm"
              />
            )}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAdditionalImagesChange}
              className="w-full"
            />

            {/* Image Previews */}
            <div className="flex flex-wrap gap-3 mt-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-md hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-md"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;