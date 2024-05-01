import { useState } from 'react';
import Navbar from "../components/Navbar";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function Register() {
    const cities = ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Rhodes", "Ioannina", "Chania", "Chalcis"]; // Add more cities as required
    const [showComment, setShowComment] = useState(false);  // State to manage comment visibility

    const handleFocus = () => {
        setShowComment(true);  // Show comment when dropdown is focused
    };

    const handleBlur = () => {
        setShowComment(false);  // Hide comment when focus is lost
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-8 bg-white shadow-md rounded-lg">
                    <form className="space-y-4">
                        <h1 className="text-xl font-bold text-center">Register</h1>
                        <div className="input-box flex items-center border border-gray-300 p-2 rounded">
                            <MdEmail className="text-gray-400" />
                            <input type="text" placeholder="E-mail" required className="flex-1 ml-2 outline-none" />
                        </div>
                        <div className="input-box flex items-center border border-gray-300 p-2 rounded">
                            <FaUser className="text-gray-400" />
                            <input type="text" placeholder="Username" required className="flex-1 ml-2 outline-none" />
                        </div>
                        <div className="input-box flex items-center border border-gray-300 p-2 rounded">
                            <RiLockPasswordFill className="text-gray-400" />
                            <input type="password" placeholder="Password" required className="flex-1 ml-2 outline-none" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col border border-gray-300 p-2 rounded">
                                <select 
                                    required 
                                    className="outline-none" 
                                    onFocus={handleFocus} 
                                    onBlur={handleBlur}
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`p-2 rounded bg-black ${showComment ? 'block' : 'hidden'}`}>
                                <span className="text-sm text-white">
                                    Please choose the location closest to where you live
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                        <div className="register-link text-center text-sm">
                            <p>Already have an account? <a href="/login" className="text-black font-bold hover:text-gray-700">Login!</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
