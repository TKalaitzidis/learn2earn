import React, { useState } from "react";

function Sidebar({
  categories,
  onCategoryChange,
  onTypeChange,
  currentCategory,
  currentType,
  type,
  cities,
  onUserCityChange,
  onUserBanChange,
  currentCity,
  currentBan,
}) {
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
      {type == "books" && (
        <div className="p-5">
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <h2 className="font-bold">Genre</h2>
            <span>{isDropDownActive ? "▲" : "▼"}</span>
          </div>
          <ul
            className={`list-none pl-5 pr-2 py-1 transition-[max-height] duration-700 ease-in-out origin-top overflow-auto ${
              isDropDownActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{
              maxHeight: isDropDownActive ? "24rem" : "0",
              paddingBottom: isDropDownActive ? "0.25rem" : "0",
              marginBottom: isDropDownActive ? "1rem" : "0",
              overflowY: "auto",
            }}
          >
            {categories.map((category) => (
              <li
                className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                  currentCategory === category ? "italic font-semibold" : ""
                }`}
                key={category}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={toggleTypeDropdown}
          >
            <h2 className="font-bold">Type</h2>
            <span>{isTypeDropDownActive ? "▲" : "▼"}</span>
          </div>
          <ul
            className={`list-none pl-5 pr-2 py-1 transition-[max-height] duration-700 ease-in-out origin-top overflow-hidden`}
            style={{
              maxHeight: isTypeDropDownActive ? "24rem" : "0",
              paddingBottom: isTypeDropDownActive ? "0.25rem" : "0",
              marginBottom: isTypeDropDownActive ? "1rem" : "0",
            }}
          >
            <li
              className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                currentType === "All Types" ? "italic font-semibold" : ""
              }`}
              onClick={() => onTypeChange("All Types")}
            >
              All Types
            </li>
            <li
              className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                currentType === "Physical" ? "italic font-semibold" : ""
              }`}
              onClick={() => onTypeChange("Physical")}
            >
              Physical
            </li>
            <li
              className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                currentType === "PDF" ? "italic font-semibold" : ""
              }`}
              onClick={() => onTypeChange("PDF")}
            >
              PDF
            </li>
          </ul>
        </div>
      )}
      {type == "users" && (
        <div className="p-5">
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <h2 className="font-bold">Area</h2>
            <span>{isDropDownActive ? "▲" : "▼"}</span>
          </div>
          <ul
            className={`list-none pl-5 pr-2 py-1 transition-[max-height] duration-700 ease-in-out origin-top overflow-auto ${
              isDropDownActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{
              maxHeight: isDropDownActive ? "24rem" : "0",
              paddingBottom: isDropDownActive ? "0.25rem" : "0",
              marginBottom: isDropDownActive ? "1rem" : "0",
              overflowY: "auto",
            }}
          >
            {cities.map((city) => (
              <li
                className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                  currentCity === city ? "italic font-semibold" : ""
                }`}
                key={city}
                onClick={() => onUserCityChange(city)}
              >
                {city}
              </li>
            ))}
          </ul>
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={toggleTypeDropdown}
          >
            <h2 className="font-bold">Banning Filter</h2>
            <span>{isTypeDropDownActive ? "▲" : "▼"}</span>
          </div>
          <ul
            className={`list-none pl-5 pr-2 py-1 transition-[max-height] duration-700 ease-in-out origin-top overflow-hidden`}
            style={{
              maxHeight: isTypeDropDownActive ? "24rem" : "0",
              paddingBottom: isTypeDropDownActive ? "0.25rem" : "0",
              marginBottom: isTypeDropDownActive ? "1rem" : "0",
            }}
          >
            <li
              className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                currentBan === "All Users" ? "italic font-semibold" : ""
              }`}
              onClick={() => onUserBanChange("All Users")}
            >
              All Users
            </li>
            <li
              className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                currentBan === "Banned Users" ? "italic font-semibold" : ""
              }`}
              onClick={() => onUserBanChange("Banned Users")}
            >
              Banned Users
            </li>
            <li
              className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${
                currentBan === "Not Banned Users" ? "italic font-semibold" : ""
              }`}
              onClick={() => onUserBanChange("Not Banned Users")}
            >
              Not Banned Users
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
