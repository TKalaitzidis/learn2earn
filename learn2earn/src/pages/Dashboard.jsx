import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Pagination from '../components/Pagination.jsx';  // Assuming this component is correctly imported

function Dashboard() {
    // Generate 100 sample requests
    const initialRequests = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        text: `Request ${i + 1}`,
        category: 'Sci-fi'  // Assuming all requests fall into one category for simplicity
    }));

    const [requests, setRequests] = useState(initialRequests);
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 20;

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    const handleRemoveRequest = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };

    const handleLogout = () => {
        // Logic to handle user logout
        console.log("User logged out");
    };

    const handleUserSettings = () => {
        // Logic to handle user settings
        console.log("User settings accessed");
    };

    const handleAddNewRequest = () => {
        // Logic to handle adding a new request
        console.log("Add new request");
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-xl font-bold text-center mb-4">Welcome Chris!</h1>
                <div className="flex justify-between items-center my-8">
                    <button
                        onClick={handleAddNewRequest}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                    >
                        Add New Request
                    </button>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleUserSettings}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                        >
                            User Settings
                        </button>
                    </div>
                </div>
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
                                            className="mr-8 text-white font-bold py-2 px-4 rounded inline-flex items-center bg-black hover:bg-gray-900"
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
                </div>
                <Pagination
                    pagesNo={Math.ceil(requests.length / requestsPerPage)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
}

export default Dashboard;
