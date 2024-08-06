import ItemList from "../components/ItemList.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";

function Main({isAuth, name}) {

    const [items, setItems] = useState([]);
    async function getBooks() {
        try {
          const response = await fetch("http://localhost:8000/books/itemlist", {
            method: "GET",
          });
    
          const parseRes = await response.json();
    
          setItems(parseRes);
        } catch (error) {
          console.error(error.message);
        }
      }

      useEffect(() => {
        getBooks();
    }, []);

    const [currentCategory, setCurrentCategory] = useState('All'); // State for current category
    const filteredItems = items
    const categories = ['All', 'sci-fi', 'fantasy'];  // Define categories
    
    console.log(items);
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar categories={categories} setCurrentCategory={setCurrentCategory} isAuth={isAuth} name={name}/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchBar onSearch={(searchTerm) => console.log("Searching for:", searchTerm)} /> 
                <Sidebar categories={categories} onCategoryChange={setCurrentCategory} />
                <ItemList filteredItems={filteredItems} isMain={true}/>
            </div>
        </div>
    );
}

export default Main;
