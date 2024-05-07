import ItemList from "../components/ItemList.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import React, { useState } from "react";

function Main() {
    const items = Array.from({ length: 1000 }, (_, i) => ({
        author: `Author ${i + 1}`,
        title: `Title ${i + 1}`,
        area: "Athens",
        user: "Chris",
        category: i % 5 === 0 ? "sci-fi" : "fantasy"  // Example with two categories
    }));
    const [currentCategory, setCurrentCategory] = useState('All'); // State for current category
    const filteredItems = currentCategory === 'All' ? items : items.filter(item => item.category === currentCategory);
    const categories = ['All', 'sci-fi', 'fantasy'];  // Define categories

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar categories={categories} setCurrentCategory={setCurrentCategory} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchBar onSearch={(searchTerm) => console.log("Searching for:", searchTerm)} />    
                <ItemList filteredItems={filteredItems} isMain={true}/>
            </div>
        </div>
    );
}

export default Main;
