import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Pagination from '../components/Pagination.jsx';
import { Link } from 'react-router-dom';

function Dashboard({isAuth, name}) {
    const initialRequests = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        author: `Author ${i + 1}`,
        title: `Title ${i + 1}`,
        user: 'Nick'
    }));

    const initialOffers = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        author: `Author ${i + 1}`,
        title: `Book ${i + 1}`,
        details: 'Detailed information about Offer'
    }));



    const [requests, setRequests] = useState(initialRequests);
    const [offers, setOffers] = useState(initialOffers);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('offers');  // Default to 'offers'
    const requestsPerPage = 20;
    const [currentOffer, setCurrentOffer] = useState(null);

    const indexOfLastItem = currentPage * requestsPerPage;
    const indexOfFirstItem = indexOfLastItem - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
    const currentOffers = offers.slice(indexOfFirstItem, indexOfLastItem);

    const editOffer = (offer) => {
        setCurrentOffer(offer);
        setShowOverlay(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const author = event.target.author.value;
        const title = event.target.title.value;
        const description = event.target.description.value;
        
        if (currentOffer) {
            // Update existing offer logic
            const updatedOffers = offers.map(offer => 
                offer.id === currentOffer.id ? { ...offer, author, title, description } : offer
            );
            setOffers(updatedOffers);
        } else {
            // Add new offer logic
            const newOffer = {
                id: offers.length + 1,
                author,
                title,
                details: description,
            };
            setOffers([...offers, newOffer]);
        }
        setShowOverlay(false);
        setCurrentOffer(null); // Reset current offer after submit
    };
    
    const handleRemoveRequest = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };

    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            setShowOverlay(false);
            setCurrentOffer(null); // Reset current offer when closing overlay
        }
    };


    return (
        <>
            <Navbar isAuth={isAuth} name={name}/>
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-xl font-bold text-center mb-4">Welcome {name}!</h1>
                
                <div className="flex justify-between mb-4">
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800" onClick={toggleOverlay}>
                        Add New Offer
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

                    <Link to="/settings"> 
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                        User Settings
                    </button>
                    </Link>
                    
                    
                </div>
                {/* New Offer Overlay */}
                {showOverlay && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden w-96 relative">
                                            <button className="absolute top-2 right-2 text-black text-xl" onClick={() => setShowOverlay(false)}>&times;</button>
                                            <form onSubmit={handleSubmit} className="p-6">
                                                <h2 className="text-lg font-semibold mb-4">{currentOffer ? 'Edit Offer' : 'New Offer'}</h2>
                                                <div className="mb-4">
                                                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                                                    <input type="text" id="author" name="author" defaultValue={currentOffer ? currentOffer.author : ''} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                                    <input type="text" id="title" name="title" defaultValue={currentOffer ? currentOffer.title : ''} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea id="description" name="description" rows="4" defaultValue={currentOffer ? currentOffer.details : ''} className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">{currentOffer ? 'Update' : 'Submit'}</button>
                                                </div>
                                            </form>
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
                                        Title
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOffers.map(offer => (
                                    <tr key={offer.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{offer.title}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{offer.author}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                onClick={() => editOffer(offer.id)}
                                                className="mr-2 text-white font-bold py-2 px-4 rounded inline-flex items-center bg-black hover:bg-gray-900"
                                            >
                                                Edit Offer
                                            </button>
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
                                        Title
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        User
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map(request => (
                                    <tr key={request.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{request.title}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{request.author}</p>
                                        </td>
                                       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <a href="/userchoice">
                                            <button
                                                className="mr-2 text-white font-bold py-2 px-4 rounded inline-flex items-center bg-black hover:bg-gray-900"
                                            >
                                                See offers
                                            </button>
                                            </a>
                                           
                                            <button
                                                onClick={() => handleRemoveRequest(request.id)}
                                                className="text-white font-bold py-2 px-4 rounded inline-flex items-center bg-black hover:bg-gray-900"
                                            >
                                                Decline
                                            </button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{request.user}</p>
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
