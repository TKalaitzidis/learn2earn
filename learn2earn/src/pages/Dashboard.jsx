import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Pagination from '../components/Pagination.jsx';

function Dashboard() {
    const initialRequests = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        text: `Request ${i + 1}`,
        category: 'Sci-fi'
    }));

    const initialOffers = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        offer: `Offer ${i + 1}`,
        details: 'Detailed information about Offer'
    }));

    const [requests, setRequests] = useState(initialRequests);
    const [offers, setOffers] = useState(initialOffers);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('offers');  // Default to 'offers'
    const requestsPerPage = 20;

    const indexOfLastItem = currentPage * requestsPerPage;
    const indexOfFirstItem = indexOfLastItem - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
    const currentOffers = offers.slice(indexOfFirstItem, indexOfLastItem);

    const handleRemoveRequest = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };
    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const handleOverlayClick = (event) => {
        event.stopPropagation(); // Prevent click from bubbling to the window
    };
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-xl font-bold text-center mb-4">Welcome Chris!</h1>
                
                <div className="flex justify-between mb-4">
                <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                        onClick={toggleOverlay}
                    >
                        Add New Request
                    </button>
                    <div className="flex">
                        <button
                            className={`px-4 mx-2 py-2 ${activeTab === 'offers' ? 'bg-gray-300' : 'bg-white'} rounded-md hover:bg-gray-100`}
                            onClick={() => setActiveTab('offers')}
                        >
                            Manage Offers
                        </button>
                        <button
                            className={`px-4 mx-2 py-2 hover:bg-gray-100 ${activeTab === 'requests' ? 'bg-gray-300' : 'bg-white'} rounded-md`}
                            onClick={() => setActiveTab('requests')}
                        >
                            Manage Requests
                        </button>
                    </div>
                
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                        User Settings
                    </button>
                    
                </div>

                {showOverlay && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500"
                         onClick={() => setShowOverlay(false)}>
                        <div className="bg-white p-4 rounded-lg relative transform transition-all duration-500 ease-out scale-95 opacity-0"
                             style={{ animation: 'fadeInScale 0.5s forwards' }}
                             onClick={handleOverlayClick}>
                            <button className="absolute top-2 right-2 text-black text-xl" onClick={() => setShowOverlay(false)}>&times;</button>
                            <p>This is the overlay content.</p>
                        </div>
                    </div>
                )}

                {/* Conditionally render content based on the active tab */}
                {activeTab === 'offers' && (
                    <div className="bg-white shadow-md rounded-lg">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Offer
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOffers.map(offer => (
                                    <tr key={offer.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{offer.offer}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{offer.details}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            pagesNo={Math.ceil(offers.length / requestsPerPage)}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="bg-white shadow-md rounded-lg">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Request
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map(request => (
                                    <tr key={request.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{request.text}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                onClick={() => handleRemoveRequest(request.id)}
                                                className="mr-2 text-white font-bold py-2 px-4 rounded inline-flex items-center bg-black hover:bg-gray-900"
                                            >
                                                Edit Request
                                            </button>
                                            <button
                                                onClick={() => handleRemoveRequest(request.id)}
                                                className="text-white font-bold py-2 px-4 rounded inline-flex items-center bg-black hover:bg-gray-900"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{request.category}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            pagesNo={Math.ceil(requests.length / requestsPerPage)}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;
