import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Chatroom() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [contacts, setContacts] = useState([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
    ]);  // Sample contacts list

    const handleSendMessage = () => {
        if (messageInput.trim() === '') return;
        setMessages([...messages, messageInput]);
        setMessageInput('');
    };

    const handleInput = (event) => {
        setMessageInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex w-full max-w-4xl">
                    
                    <div className="w-1/4 bg-gray-100 p-4">
                        <h3 className="text-lg font-semibold mb-4">Contacts</h3>
                        <ul>
                            {contacts.map(contact => (
                                <li key={contact.id} className="mb-2 p-2 hover:bg-gray-200 rounded cursor-pointer">
                                    {contact.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
                        <div className="mb-4 h-64 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className="bg-black text-white rounded-full px-4 py-2 my-2 block max-w-xs break-words">
                                    {msg}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={handleInput}
                                onKeyPress={handleKeyPress}
                                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                                placeholder="Type your message..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-black hover:bg-gray-700 text-white p-2 rounded-r-lg"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chatroom;
