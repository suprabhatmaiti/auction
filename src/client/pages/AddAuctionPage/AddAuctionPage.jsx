import { useState, useReducer } from 'react';
import Input from '../../components/Input/Input.jsx';
import { RiImageAddLine } from 'react-icons/ri';

import { initialState, useAuctionPageReducer } from './reducer/useAuctionPageReducer.js';
import api from '../../utils/api.js';
import Dropdown from '../../components/Dropdown/Dropdown.jsx';

function AddAuctionPage() {
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [state, dispatch] = useReducer(useAuctionPageReducer, initialState);

  const handleSetPreview = (event) => {
    const file = event.target.files[0];
    console.log(URL.createObjectURL(file));
    if (file) {
      dispatch({ type: 'SET_IMAGE', file: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, startingBid, imageFile, auctionEndTime, category, description } = state;
    if (
      !title.trim() ||
      !startingBid.trim() ||
      !imageFile ||
      !auctionEndTime.trim() ||
      !category.trim()
    ) {
      alert('Please fill all required fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('start_price', startingBid);
    formData.append('end_time', auctionEndTime);
    formData.append('image', imageFile);

    try {
      setSubmitting(true);
      const { data } = await api.post('/api/auction/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert(data.message);
      console.log('Auction created:', data.auction);
      dispatch({ type: 'RESET_FORM' });
      setPreview(null);
    } catch (error) {
      console.error('Error submitting auction:', error);
      alert('Failed to submit auction. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };
  const handleDropdownChange = (value, name) => {
    dispatch({ type: 'UPDATE_FIELD', field: name, value: value });
  };

  const categories = [
    { value: 'antiques', label: 'Antiques' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'art', label: 'Art' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'collectibles', label: 'Collectibles' },
  ];

  return (
    <form
      className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <div className="bg-white shadow-md rounded-2xl w-full max-w-3xl p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Submit Item for Auction</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Fill out the form below to list your item
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <Input
            label="Item Name"
            name="title"
            type="text"
            placeholder="e.g., Vintage Leather Jacket"
            value={state.title}
            onChange={handleInputChange}
          />

          <Input
            mode="desc"
            label="Description"
            name="description"
            type="text"
            placeholder="Describe your item in detail including condition, age, and unique features."
            className="h-24"
            value={state.description}
            onChange={handleInputChange}
          />

          <Dropdown
            options={categories}
            label="Category"
            name="category"
            placeholder="Select Category"
            onSelect={(value) => handleDropdownChange(value.label, 'category')}
            selection={state.category}
          />

          {/* Responsive Row for Price & Duration */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <Input
                label="Starting Bid"
                type="text"
                name="startingBid"
                placeholder="e.g., 50.00"
                value={state.startingBid}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <Input
                label="Auction End Time"
                type="datetime-local"
                name="auctionEndTime"
                placeholder="Select end time"
                value={state.auctionEndTime}
                onChange={handleInputChange}
              />
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
            type="submit"
          >
            {submitting ? 'Submitting...' : 'Submit for Auction '}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddAuctionPage;
