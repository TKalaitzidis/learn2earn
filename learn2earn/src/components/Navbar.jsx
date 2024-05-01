import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import Sidebar from "./Sidebar.jsx";

function Navbar(props) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to control sidebar visibility

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible); // Toggle the visibility
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 pb-2 border-b border-gray-400 bg-white">
                {isSidebarVisible && <Sidebar isSidebarVisible={isSidebarVisible} categories={props.categories} onCategoryChange={props.setCurrentCategory} toggleSidebar={toggleSidebar} />}
                <div className="space-y-1 w-8 h-6 flex flex-col justify-between items-center cursor-pointer" onClick={toggleSidebar}>
                    <div className={`h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${isSidebarVisible ? 'rotate-45 translate-y-2.5 translate-x-2' : ''}`}></div>
                    <div className={`h-0.5 w-full bg-black transition-opacity duration-300 ease-in-out ${isSidebarVisible ? 'opacity-0' : 'opacity-100'}`}></div>
                    <div className={`h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${isSidebarVisible ? '-rotate-45 -translate-y-2.5 translate-x-2' : ''}`}></div>
                </div>
                <a href="/home" className="bg-no-repeat pt-2" style={{ width: '5%', height: '10%' }}>
                    <img src={logo} alt="Logo"/>
                </a>
                <nav className="navbar">
                    <ul className="list-none m-0 p-0">
                        <li className="inline-block px-5"><a href="/login" className="text-black no-underline hover:text-gray-500 transition duration-300 ease-in-out">Login/Sign-Up</a></li>
                        <li className="inline-block px-5"><a href="/about" className="text-black no-underline hover:text-gray-500 transition duration-300 ease-in-out">About</a></li>  
                        <li className="inline-block px-5"><a href="/contact" className="text-black no-underline hover:text-gray-500 transition duration-300 ease-in-out">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
