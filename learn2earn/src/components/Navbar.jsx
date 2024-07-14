import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png';
import Sidebar from "./Sidebar.jsx";

function Navbar(props) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/home';

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full flex items-center justify-between px-5 py-2 border-b border-gray-400 bg-white z-50">
                <div className="flex items-center"> 
                    {isHomePage && (
                        <div className="mr-4 cursor-pointer" onClick={toggleSidebar}>
                            <div className={`m-2 h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isSidebarVisible ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                        </div>
                    )}
                    <a href="/home" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain', width: 50, height: 50 }} className="bg-no-repeat"> {/* Logo */}
                        <img src={logo} alt="Logo" className="opacity-0" />
                    </a>
                </div>
                <nav className="navbar">
                    <ul className="flex space-x-4">
                        <li><Link to="/login" className="text-black hover:text-gray-500 transition duration-300 ease-in-out">Login/Sign-Up</Link></li>
                        <li><Link to="/about" className="text-black hover:text-gray-500 transition duration-300 ease-in-out">About</Link></li>
                        <li><Link to="/contact" className="text-black hover:text-gray-500 transition duration-300 ease-in-out">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            {isHomePage && isSidebarVisible && <Sidebar isSidebarVisible={isSidebarVisible} categories={props.categories} onCategoryChange={props.setCurrentCategory} toggleSidebar={toggleSidebar} />}
        </>
    );
}

export default Navbar;
