import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa"; 

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault(); 
        onSearch(searchTerm); 
    };

    return (
        <div className="flex justify-center items-center w-full pt-24 pb-14 ml-24"> 
            <form onSubmit={handleSearch} className="flex w-full max-w-4xl"> 
                <input
                    type="text"
                    placeholder="Search Authors or Book Titles"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 bg-white h-10 px-5 rounded-l-lg flex-grow focus:outline-none" 
                />
                <button type="submit" className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-r-lg">
                    <FaSearch /> 
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
