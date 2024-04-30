import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

function Navbar() {
    return (
        <>
        <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 pb-2 border-b border-solid border-gray-400 bg-white">
            <a href="#" className="cursor-pointer bg-transparent bg-no-repeat pt-2" style={{ width: '5.5%', height: '10%' }}>
                <img src={logo} alt="Logo"/>
            </a>
            <nav className="navbar">
                <ul className="list-none m-0 p-0">
                    <li className="inline-block px-5"><a href="#" className="text-black no-underline hover:text-gray-500 transition-all duration-300 ease-in-out">Login/Sign-Up</a></li>
                    <li className="inline-block px-5"><a href="#" className="text-black no-underline hover:text-gray-500 transition-all duration-300 ease-in-out">About</a></li>  
                    <li className="inline-block px-5"><a href="#" className="text-black no-underline hover:text-gray-500 transition-all duration-300 ease-in-out">Contact</a></li>
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Navbar;
