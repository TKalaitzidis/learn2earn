import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa"; // Ensure this is correctly imported

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        onSearch(searchTerm); // Pass the searchTerm to the parent component or handle the search logic here
    };

    return (
        <div className="flex justify-center items-center w-full pt-24 pb-14 ml-24"> {/* Centering and width adjustment */}
            <form onSubmit={handleSearch} className="flex w-full max-w-4xl"> {/* Max width and full width */}
                <input
                    type="text"
                    placeholder="Search Authors, Book Titles, Users"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 bg-white h-10 px-5 rounded-l-lg flex-grow focus:outline-none" // Full width for input
                />
                <button type="submit" className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-r-lg">
                    <FaSearch /> {/* Icon inside the button */}
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
