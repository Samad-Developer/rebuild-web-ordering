import React from 'react';
import { useSelector, useDispatch } from "react-redux";
const baseURL = import.meta.env.VITE_BASE_URL;

// CategoryCard Component
const CategoryCard = ({ category, designLayout, activeSection, handleLinkClick }) => {
  const { logo } = useSelector((state) => state.theme);
  // Helper function to render different layouts
  const renderCategoryItem = (categoryObject) => {
    switch (designLayout) {
      case 'topImage':
        return (
          <div
            className={`flex flex-col items-center px-3 py-2 text-[12px] sm:text-[15px] whitespace-nowrap hover:bg-white hover:text-red-500 rounded-lg 
              ${activeSection === categoryObject.CategoryId ? 'bg-blue-500 text-white' : 'text-white'}`}
          >
            <img
              src={baseURL + categoryObject.CategoryImage}
              alt={categoryObject.CategoryName}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="mt-1">{categoryObject.CategoryName}</span>
          </div>
        );
      case 'leftImage':
        return (
          <div
            className={`flex items-center text-[12px] sm:text-[15px] min-w-max whitespace-nowrap hover:bg-white hover:text-red-500  pl-1 pr-2 sm:pl-1 sm:pr-2 py-1 sm:py-1 rounded-full 
              ${activeSection === categoryObject.CategoryId ? 'bg-blue-500 text-white' : 'text-white'}`}
          >
            <img
              src={categoryObject.CategoryImage ? baseURL + categoryObject.CategoryImage : logo}
              alt={categoryObject.CategoryName}
              className="w-8 sm:w-10 h-8 sm:h-10 object-cover rounded-full mr-1 sm:mr-2"
            />
            <span>{categoryObject.CategoryName}</span>
          </div>
        );
      default:
        return (
          <div
            className={`text-[12px] sm:text-[15px] py-[10px] px-4 rounded-md font-semibold whitespace-nowrap hover:bg-white hover:text-black
            ${activeSection === categoryObject.CategoryId ? 'bg-blue-500 text-white' : 'text-white'}`}
            >
            {categoryObject.CategoryName.toUpperCase()}
          </div>
        );
    }
  };

  return (
    <a
      key={category.CategoryId}
      href={`#${category.CategoryId}`}
      onClick={(e) => {
        e.preventDefault();
        handleLinkClick(category.CategoryId); // Call the parent function
      }}
    >
      {renderCategoryItem(category)}
    </a>
  );
};

export default CategoryCard;
