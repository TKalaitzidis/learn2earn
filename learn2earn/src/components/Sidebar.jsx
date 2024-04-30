import React, { useState } from 'react';

function Sidebar({ categories, onCategoryChange }) {
    const [isVisible, setIsVisible] = useState(false);

    // Function to toggle visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className="relative">
            <h2 className='pt-40 cursor-pointer' onClick={toggleVisibility}>
                Categories
            </h2>
            {/* Transition using opacity and max-height for a smoother dropdown effect */}
            <ul className={`list-disc transition-all duration-700 ease-in-out origin-top ${isVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                {categories.map(category => (
                    <li className="block px-5 py-2" key={category} onClick={() => onCategoryChange(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
