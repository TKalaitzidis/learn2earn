// Sidebar.jsx
import React, { useState } from "react";

function Sidebar({ categories, onCategoryChange }) {

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-white z-20 shadow-lg pt-16">
      <div className="p-5">
        <div
          className="flex items-center justify-between p-2 cursor-pointer"

        >
          <h2>Categories</h2>
        </div>
        <ul
          className={`list-none pl-5 pr-2 py-1 transition-opacity duration-700 ease-in-out origin-top  overflow-hidden`}
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
      </div>
    </div>
  );
}

export default Sidebar;
