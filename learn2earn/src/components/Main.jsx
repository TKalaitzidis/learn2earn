import ItemList from "./ItemList.jsx"
import Navbar from "./Navbar.jsx";
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
        <div>
            <Navbar categories={categories} setCurrentCategory={setCurrentCategory}/>
            <ItemList filteredItems={filteredItems}/>
        </div>
    )
}

export default Main;