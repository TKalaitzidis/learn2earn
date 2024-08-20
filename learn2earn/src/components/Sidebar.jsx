import React, { useState } from "react";

function Sidebar({ categories, onCategoryChange, onTypeChange }) {

  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const [isTypeDropDownActive, setIsTypeDropDownActive] = useState(false);

  const toggleDropdown = () => {
    setIsDropDownActive(!isDropDownActive);
  };

  const toggleTypeDropdown = () => {
    setIsTypeDropDownActive(!isTypeDropDownActive);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-white z-20 shadow-lg pt-16">
      <div className="p-5">
        <div
          className="flex items-center justify-between p-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <h2 className="font-bold">Categories</h2>
          <span>{isDropDownActive ? "▲" : "▼"}</span>
        </div>
        <ul
          className={`list-none pl-5 pr-2 py-1 transition-[max-height] duration-700 ease-in-out origin-top overflow-auto ${
            isDropDownActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            maxHeight: isDropDownActive ? '24rem' : '0',
            paddingBottom: isDropDownActive ? '0.25rem' : '0',
            marginBottom: isDropDownActive ? '1rem' : '0',
            overflowY: 'auto',
          }}
        >
          {categories.map((category) => (
            <li
              className="px-2 py-1 cursor-pointer hover:bg-gray-200"
              key={category}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between p-2 cursor-pointer"
        onClick={toggleTypeDropdown}>
          <h2 className="font-bold">Type</h2>
          <span>{isTypeDropDownActive ? "▲" : "▼"}</span>
        </div>
        <ul
          className={`list-none pl-5 pr-2 py-1 transition-[max-height] duration-700 ease-in-out origin-top overflow-hidden`}
          style={{
            maxHeight: isTypeDropDownActive ? '24rem' : '0',
            paddingBottom: isTypeDropDownActive ? '0.25rem' : '0',
            marginBottom: isTypeDropDownActive ? '1rem' : '0',
            
          }}
        >
          <li
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => onTypeChange("Physical")}
          >
            Physical
          </li>
          <li
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => onTypeChange("PDF")}
          >
            PDF
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
