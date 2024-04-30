import React, { useState } from 'react';

function Sidebar({ categories, onCategoryChange, isSidebarVisible, toggleSidebar }) {
    const [isCatVisible, setIsCatVisible] = useState(false);
    const [isLocVisible, setIsLocVisible] = useState(false);

    // Function to toggle visibility of categories and locations
    const toggleCatVisibility = () => {
        setIsCatVisible(!isCatVisible);
    };

    const toggleLocVisibility = () => {
        setIsLocVisible(!isLocVisible);
    };

    return (
        <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out" style={{ transform: isSidebarVisible ? 'translateX(0%)' : 'translateX(-100%)' }}>
            {/* Close button now positioned on the left side */}
            <button onClick={toggleSidebar} className="text-black p-4 absolute top-0 left-0">X</button>
            <div className="pt-12"> {/* Padding top to avoid overlap with the close button */}
                <h2 className='p-2 cursor-pointer' onClick={toggleCatVisibility}>
                    Categories
                </h2>
                <ul className={`list-none pl-5 pr-2 py-1 transition-opacity duration-700 ease-in-out origin-top ${isCatVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                    {categories.map(category => (
                        <li className="px-2 py-1" key={category} onClick={() => onCategoryChange(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
                <h2 className='p-2 cursor-pointer' onClick={toggleLocVisibility}>
                    Location
                </h2>
                <ul className={`list-none pl-5 pr-2 py-1 transition-opacity duration-700 ease-in-out origin-top ${isLocVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                    <li className="px-2 py-1">blabla</li>
                    <li className="px-2 py-1">blabla</li>
                    <li className="px-2 py-1">blabla</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
