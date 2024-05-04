import React, { useState } from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";


function Sidebar({ categories, onCategoryChange, onUserFilterChange, isSidebarVisible, toggleSidebar }) {
    const [isCatVisible, setIsCatVisible] = useState(false);
    const [isLocVisible, setIsLocVisible] = useState(false);
    const [isUserVisible, setIsUserVisible] = useState(false);
    const [userFilter, setUserFilter] = useState('');

    // Function to toggle visibility of categories and locations
    const toggleCatVisibility = () => {
        setIsCatVisible(!isCatVisible);
    };

    const toggleLocVisibility = () => {
        setIsLocVisible(!isLocVisible);
    };
    const toggleUserVisibility = () => setIsUserVisible(!isUserVisible);

    // Handle user filter input change
    const handleUserInputChange = (event) => {
        setUserFilter(event.target.value);
    };

    // Function to filter users
    const filterUsers = () => {
        onUserFilterChange(userFilter);
    };


    return (
        <>
            {isSidebarVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div> // Overlay shadow
            )}
            <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out"
                 style={{ transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)' }}>
                
                <button onClick={toggleSidebar} className="text-black p-4 absolute top-0 left-0"><IoCloseSharp/></button>
                <div className="pt-12"> 
                    <div className="flex items-center justify-between p-2 cursor-pointer" onClick={toggleCatVisibility}>
                        <h2>Categories</h2>
                        <MdOutlineArrowDropDown className={`transition-transform duration-300 ${isCatVisible ? 'transform rotate-180' : ''}`} />
                    </div>
                    <ul className={`list-none pl-5 pr-2 py-1 transition-opacity duration-700 ease-in-out origin-top ${isCatVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                        {categories.map(category => (
                            <li className="px-2 py-1" key={category} onClick={() => onCategoryChange(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-between p-2 cursor-pointer" onClick={toggleLocVisibility}>
                        <h2>Location</h2>
                        <MdOutlineArrowDropDown className={`transition-transform duration-300 ${isLocVisible ? 'transform rotate-180' : ''}`} />
                    </div>
                    <ul className={`list-none pl-5 pr-2 py-1 transition-opacity duration-700 ease-in-out origin-top ${isLocVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                        <li className="px-2 py-1">blabla</li>
                        <li className="px-2 py-1">blabla</li>
                        <li className="px-2 py-1">blabla</li>
                    </ul>
                    <div className="flex items-center justify-between p-2 cursor-pointer" onClick={toggleUserVisibility}>
                        <h2>Users</h2>
                        <MdOutlineArrowDropDown className={`transition-transform duration-300 ${isUserVisible ? 'transform rotate-180' : ''}`} />
                    </div>
                    <ul className={`list-none pl-5 pr-2 py-1 transition-opacity duration-700 ease-in-out origin-top ${isUserVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                        <li>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={userFilter}
                                onChange={handleUserInputChange}
                                onKeyPress={event => event.key === 'Enter' && filterUsers()}
                                className="p-2 w-full border border-gray-300 rounded-md"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
