import { useState } from "react";
import Input from "../components/Input/Input";
import { RiImageAddLine } from "react-icons/ri";
import axios from "../utils/api.js";

function AddAuctionPage() {
  const [preview, setPreview] = useState(null);

  const handleSetPreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preview) {
      alert("Please upload an image before submitting.");
      return;
    }
    
  }

  return (
    <form className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center" onSubmit={handleSubmit}>
      <div className="bg-white shadow-md rounded-2xl w-full max-w-3xl p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Submit Item for Auction
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Fill out the form below to list your item
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <Input
            label="Item Name"
            type="text"
            placeholder="e.g., Vintage Leather Jacket"
          />

          <Input
            mode="desc"
            label="Description"
            type="text"
            placeholder="Describe your item in detail including condition, age, and unique features."
            className="h-24"
          />

          <Input label="Category" type="text" placeholder="e.g., Antiques" />

          {/* Responsive Row for Price & Duration */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <Input label="Starting Bid" type="text" placeholder="e.g., 50.00" />
            </div>
            <div className="w-full">
              <Input label="Auction End Time" type="time" />
            </div>
          </div>

          {/* Image Upload */}
          <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg h-48 md:h-56 text-center cursor-pointer overflow-hidden hover:border-violet-500 transition-all duration-200">
            {!preview && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <RiImageAddLine className="text-gray-500 text-4xl mb-2" />
                <p className="text-gray-600 text-sm">Click to upload image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleSetPreview}
                />
              </div>
            )}

            {preview && (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="preview"
                  className="object-contain w-full h-full rounded-lg"
                />
                <button
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 px-2 text-xs font-bold shadow-md transition"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
           className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white w-full px-6 py-3 rounded-lg font-semibold transition duration-200"
           
          >
            Submit for Auction
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddAuctionPage;
