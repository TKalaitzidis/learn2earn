import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ItemList from "../components/ItemList";
import Sidebar from "../components/Sidebar.jsx";

function Profile(props) {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    author: `Author ${i + 1}`,
    title: `Title ${i + 1}`,
    area: "Athens",
    user: i % 5 === 0 ? "Chris" : "John",
    category: i % 5 === 0 ? "sci-fi" : "fantasy", // Example with two categories
  }));
  const [currentUser, setCurrentUser] = useState("Chris"); // State for current category
  const filteredItems =
    currentUser === "Chris"
      ? items
      : items.filter((item) => item.user === currentUser);
  const [currentCategory, setCurrentCategory] = useState("All"); // State for current category
  const categories = ["All", "sci-fi", "fantasy"]; // Define categories
  const user = {
    name: 'Chris',
    location: 'Athens',
    points: 120,
    booksOffering: 50,
    email: 'chrisiscool@gmail.com'
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="pt-20"></div>
      <div className="container mx-auto max-w-3xl p-4 bg-white rounded-lg shadow-md flex items-center">
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/50"
            alt="User Icon"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="ml-4 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-lg font-medium m-2 pr-20 md:mb-0">{user.name}</h2>
            <div className="flex flex-col md:flex-row justify-between w-full md:ml-4">
              <div className="flex flex-col mb-2 md:mb-0 md:mr-4">
                <p className="text-gray-600">Location: {user.location}</p>
                <p className="text-gray-600">Points: {user.points}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600">Books Offering: {user.booksOffering}</p>
                <p className="text-gray-600">E-mail: {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <ItemList filteredItems={filteredItems} isMain={false} />
        <Sidebar
          categories={categories}
          onCategoryChange={setCurrentCategory}
        />
      </div>
    </div>
  );
}

export default Profile;
