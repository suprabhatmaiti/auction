import { useState } from "react";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useAuctionListContext } from "../context/useAuctionListContext";

function Categories({ selectedCategories, setSelectedCategories }) {
  const { state, dispatch } = useAuctionListContext();

  const categories = [
    { value: "antiques", label: "Antiques" },
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "art", label: "Art" },
    { value: "jewelry", label: "Jewelry" },
    { value: "collectibles", label: "Collectibles" },
  ];

  const toggleCategories = (value) => {
    dispatch({
      type: "SET_CATEGORIES",
      categories: value,
    });
  };

  const renderedCategories = categories.map((category) => {
    return (
      <div
        onClick={() => toggleCategories(category.value)}
        key={category.value}
        className="flex gap-2 items-center cursor-pointer hover:shadow-sm rounded-lg  text-violet-700"
      >
        {state.categories[category.value] ? (
          <MdCheckBox />
        ) : (
          <MdOutlineCheckBoxOutlineBlank />
        )}
        <h2 className="text-violet-500">{category.label}</h2>
      </div>
    );
  });

  return (
    <div className="border-b border-gray-200 pb-2">
      <h2 className="font-bold text-xl mb-8">Filter & Sort</h2>
      <div>
        <h2 className="font-semibold ">Categories</h2>
        <div className="mt-4">{renderedCategories}</div>
      </div>
    </div>
  );
}

export default Categories;
