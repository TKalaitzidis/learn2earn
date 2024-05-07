import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx"
import ItemList from "../components/ItemList.jsx";

function UserChoice(){
    const items = Array.from({ length: 1000 }, (_, i) => ({
        author: `Author ${i + 1}`,
        title: `Title ${i + 1}`,
        area: "Athens",
        user: i % 5 === 0 ? "Chris" : "John",
        category: i % 5 === 0 ? "sci-fi" : "fantasy"  // Example with two categories
    }));
    const [currentUser, setCurrentUser] = useState('Chris'); // State for current category
    const filteredItems = currentUser === 'Chris' ? items : items.filter(item => item.user === currentUser);
    return(
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <ItemList filteredItems={filteredItems} isMain={false}/>
            </div>
        </div>
    );
}

export default UserChoice;