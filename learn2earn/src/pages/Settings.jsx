import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';

function Settings() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmOverlayVisible, setConfirmOverlayVisible] = useState(false);
    const [tempAction, setTempAction] = useState(null);
    const [confirmPasswordForAction, setConfirmPasswordForAction] = useState('');

    // Handlers for form submissions
    const showConfirmation = (action) => {
        setTempAction(() => action);
        setConfirmOverlayVisible(true);
    };

    const handleConfirmPassword = (event) => {
        event.preventDefault();
        console.log('Confirming Action:', tempAction, confirmPasswordForAction);  // Placeholder for validation logic
        setConfirmOverlayVisible(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-xl font-bold mb-4 text-center">Settings</h1>
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                    {/* Change Username */}
                    <div className="mb-6">
                        <form onSubmit={(e) => { e.preventDefault(); showConfirmation('username'); }}>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Change Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            <button type="submit" className="mt-3 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Change Username</button>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="mb-6">
                        <form onSubmit={(e) => { e.preventDefault(); showConfirmation('password'); }}>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Change Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mt-3">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            <button type="submit" className="mt-3 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Change Password</button>
                        </form>
                    </div>

                    {/* Change Email */}
                    <div className="mb-6">
                        <form onSubmit={(e) => { e.preventDefault(); showConfirmation('email'); }}>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Change Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                            />
                            <button type="submit" className="mt-3 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Change Email</button>
                        </form>
                    </div>

                    {/* Action Buttons */}
                    <button onClick={() => console.log('Logout')} className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Log Out</button>
                    <div className="mt-4">
                        <button onClick={() => showConfirmation('delete')} className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Delete Account</button>
                        <p className="text-gray-600 italic mt-2">Warning: This action is permanent.</p>
                    </div>
                </div>

                {/* Confirmation Overlay */}
                {confirmOverlayVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Confirm Your Password</h2>
                            <form onSubmit={handleConfirmPassword}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={confirmPasswordForAction}
                                    onChange={(e) => setConfirmPasswordForAction(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md w-full mb-4"
                                />
                                <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Confirm</button>
                                <button onClick={() => setConfirmOverlayVisible(false)} className="w-full mt-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;
