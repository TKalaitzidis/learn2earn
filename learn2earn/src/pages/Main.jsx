import ItemList from "../components/ItemList.jsx";
import Navbar from "../components/Navbar.jsx";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { FaSearch } from "react-icons/fa";

function Main({ isAuth, name, categories }) {
  const [items, setItems] = useState([]);
  const [allBooks, setAllBooks] = useState([]); // Original list of books
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState("All"); 
  const [currentType, setCurrentType] = useState("All Types");

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/search/?term=${searchTerm}`);
      
      const parseRes = await response.json();

      const booksList = parseRes.map((book) => ({
        author: book.book_author,
        name: book.book_name,
        genre: book.book_genre,
        points: book.book_points,
        type: book.book_type,
      }));

      setItems(booksList);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCurrentCategory(selectedCategory);
    if (selectedCategory === "All") {
      setItems(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) => book.genre === selectedCategory);
      setItems(filteredBooks);
    }
  }

  const handleTypeChange = (selectedType) => {
    setCurrentType(selectedType);
    if (selectedType === "All Types") {
      setItems(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) => book.type === selectedType);
      setItems(filteredBooks);
    }
  }


  async function getBooks() {
    try {
      const response = await fetch("http://localhost:8000/books/itemlist", {
        method: "GET",
      });

      const parseRes = await response.json();

      const booksList = parseRes.map((book) => ({
        author: book.book_author,
        name: book.book_name,
        genre: book.book_genre,
        points: book.book_points,
        type: book.book_type,
      }));

      setAllBooks(booksList); // Save original list
      setItems(booksList);     // Initialize display list
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        categories={categories}
        isAuth={isAuth}
        name={name}
      />

      {/* SEARCH BAR */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center w-full pt-24 pb-14 ml-24">
          <form onSubmit={onSearch} className="flex w-full max-w-4xl">
            <input
              type="text"
              placeholder="Search Authors or Book Titles"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border-2 border-gray-300 bg-white h-10 px-5 rounded-l-lg flex-grow focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-r-lg"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        {/* SEARCH BAR */}

        <Sidebar
          categories={categories}
          onCategoryChange={handleCategoryChange} 
          onTypeChange={handleTypeChange}
          currentCategory={currentCategory}
          currentType={currentType}
        />
        <ItemList items={items} isMain={true} setItems={setItems} />
      </div>
    </div>
  );
}

export default Main;
