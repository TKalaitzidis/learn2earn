import React, { useState } from 'react';
import Bookimg from '../assets/bookimg.jpg';

function Item(props) {
    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const handleOverlayClick = (event) => {
        event.stopPropagation(); // Prevent click from bubbling to the window
    };

    return (
        <>
            <a href="#" className="text-center bg-white p-16 m-5 border-solid lg:flex-basis-20 lg:max-w-full
                md:flex-basis-25 md:max-w-25 sm:flex-basis-1/3 sm:max-w-1/3 xs:flex-basis-1/2 xs:max-w-1/2
                xxs:flex-basis-full xxs:max-w-full block border
                border-gray-400 rounded-lg hover:shadow-lg transition-shadow duration-300"
                onClick={toggleOverlay}>
                <div className="p-4">
                    {/* Non-overlay Image with specific dimensions, adjusted object-fit */}
                    <img src={Bookimg} alt="Image Error" style={{ width: '160px', height: '180px', objectFit: 'fill' }} className="rounded-t-lg" />
                    <div className="pt-2">
                        <p className="text-sm font-semibold">{props.author}</p>
                        <p className="text-md font-bold">{props.title}</p>
                        <p className="text-xs text-gray-600">{props.area}</p>
                        <p className="text-xs">{props.user}, {props.category}</p>
                    </div>
                </div>
            </a>
            {showOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500"
                     onClick={() => setShowOverlay(false)}>
                    <div className="bg-white p-4 rounded-lg relative transform transition-all duration-500 ease-out scale-95 opacity-0"
                         style={{ animation: 'fadeInScale 0.5s forwards' }}
                         onClick={handleOverlayClick}>
                        <button className="absolute top-2 right-2 text-black text-xl" onClick={() => setShowOverlay(false)}>&times;</button>
                        {/* Overlay Image with different dimensions, adjusted object-fit */}
                        <img src={Bookimg} alt="Image Error" style={{ width: '384px', height: '288px', objectFit: 'fill' }} className="rounded-t-lg" />
                        <div className="p-4">
                            <p className="text-md font-bold">{props.title}</p>
                            <p className="text-sm text-gray-600">{props.author}</p>
                            <p>Looking for: {props.lookingFor}</p>
                            <p className="text-xs">{props.user}</p>
                            <p className='font-bold'><a href="#">{props.email}</a></p>
                            <p className="text-xs">Curious about this trade? <a href="#" className='font-bold hover:text-gray-700'>Send an e-mail to the User!</a></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Item;
