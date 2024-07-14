import React, { useState } from 'react';
import Bookimg from '../assets/bookimg.jpg';

function Item(props) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPickConfirmation, setShowPickConfirmation] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const handleOverlayClick = (event) => {
        event.stopPropagation(); // Prevent click from bubbling to the window
    };

    const handlePickBook = () => {
        setShowPickConfirmation(true);
    };

    const closeConfirmation = () => {
        setShowPickConfirmation(false);
    };

    return (
        <>
            <div className="text-center bg-white p-16 m-5 border-solid lg:flex-basis-20 lg:max-w-full md:flex-basis-25 md:max-w-25 sm:flex-basis-1/3 sm:max-w-1/3 xs:flex-basis-1/2 xs:max-w-1/2 xxs:flex-basis-full xxs:max-w-full block border border-gray-400 rounded-lg hover:shadow-lg transition-shadow duration-300 relative"
                onMouseEnter={() => setShowOverlay(true)}
                onMouseLeave={() => setShowOverlay(false)}
                onClick={toggleOverlay}>
                <img src={Bookimg} alt="Book" style={{ width: '160px', height: '180px', objectFit: 'fill' }} className="rounded-t-lg" />
                <div className="pt-2">
                    <p className="text-sm font-semibold">{props.author}</p>
                    <p className="text-md font-bold">{props.title}</p>
                    <p className="text-xs text-gray-600">{props.area}</p>
                    <p className="text-xs">{props.user}, {props.category}</p>
                </div>
                {showOverlay && !props.isMain && (
                    <button onClick={handlePickBook} className="absolute inset-x-0 bottom-0 w-full bg-black text-white py-2 opacity-75 hover:opacity-100 rounded-b-lg transition-opacity">Pick this Book</button>
                )}
            </div>

            {showPickConfirmation && !props.isMain &&(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative" onClick={handleOverlayClick}>
                        <h2 className="text-lg font-semibold mb-4 text-center">Confirm Your Selection</h2>
                        <p className="mb-6 text-center">Are you sure you want to pick this book?</p>
                        <div className="flex justify-center space-x-4">
                            
                            <a href="/dashboard"><button
                                onClick={() => console.log("Book picked")}
                                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                            >
                                Confirm
                            </button></a>
                            
                            <button
                                onClick={closeConfirmation}
                                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                        <button
                            onClick={closeConfirmation}
                            className="absolute top-2 right-2 text-black text-2xl font-bold"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}

export default Item;
