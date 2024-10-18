import React from 'react';
const baseURL = import.meta.env.VITE_BASE_URL;

// CategoryCard Component
const CategoryCard = ({ category, designLayout, activeSection, handleLinkClick }) => {
  // Helper function to render different layouts
  const renderCategoryItem = (categoryObject) => {
    switch (designLayout) {
      case 'topImage':
        return (
          <div
            className={`flex flex-col items-center px-4 py-2 text-[15px] hover:bg-red-500 hover:text-white rounded-lg 
              ${activeSection === categoryObject.CategoryId ? 'bg-blue-500 text-white' : 'text-black'}`}
          >
            <img
              src={baseURL + categoryObject.CategoryImage}
              alt={categoryObject.CategoryName}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="mt-2">{categoryObject.CategoryName}</span>
          </div>
        );
      case 'leftImage':
        return (
          <div
            className={`flex items-center text-[15px] hover:bg-red-500 hover:text-white font-semibold px-2 py-3 rounded-t-2xl 
              ${activeSection === categoryObject.CategoryId ? 'bg-blue-500 text-white' : 'text-black'}`}
          >
            <img
              src={baseURL + categoryObject.CategoryImage}
              alt={categoryObject.CategoryName}
              className="w-8 sm:w-10 h-8 sm:h-10 object-cover rounded-full mr-2"
            />
            <span>{categoryObject.CategoryName}</span>
          </div>
        );
      default:
        // Default design like the Food Fanda category bar
        return (
          <div
            className={`text-[15px]  py-2 px-4   rounded-full  font-semibold hover:text-red-500
              ${activeSection === categoryObject.CategoryId ? 'bg-blue-500 text-white' : 'text-black'}`}
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
