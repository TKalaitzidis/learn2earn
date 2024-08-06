import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png';
import Sidebar from "./Sidebar.jsx";

function Navbar({isAuth, name}) {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';

    return (
        <>
            <div className="fixed top-0 left-0 w-full flex items-center justify-between px-5 py-2 border-b border-gray-400 bg-white z-30">
                <div className="flex items-center"> 
                    <a href="/home" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain', width: 50, height: 50 }} className="bg-no-repeat"> 
                        <img src={logo} alt="Logo" className="opacity-0" />
                    </a>
                </div>
                <nav className="navbar">
                    <ul className="flex space-x-4">
                        <li>{isAuth ? <h2><a href="/dashboard">{name}</a></h2>:<Link to="/login" className="text-black hover:text-gray-500 transition duration-300 ease-in-out">Login/Sign-Up</Link> }</li>
                        <li><Link to="/about" className="text-black hover:text-gray-500 transition duration-300 ease-in-out">About</Link></li>
                        <li><Link to="/contact" className="text-black hover:text-gray-500 transition duration-300 ease-in-out">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
